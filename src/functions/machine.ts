import { nanoid } from 'nanoid';
import { assign, createMachine, interpret } from 'xstate';
import { ACTIONS_CRUD, STATES_CRUD, STATES_FINAL } from '../constants/strings';
import {
  ServiceCRUD, StateCRUDArgs, StateMachineCRUD
} from '../types/_crud';

export function createCRUDMAchine<C = any, E = any>({
  src,
  id = nanoid(),
  status = 400,
}: StateCRUDArgs<C, E>): StateMachineCRUD<C, E> {
  const machine: StateMachineCRUD<C, E> = createMachine(
    {
      initial: 'idle',
      id,
      context: { status, iterator: 0 },
      states: {
        [STATES_CRUD.object.idle]: {
          on: {
            SEND: STATES_CRUD.object.pending,
          },
        },
        [STATES_CRUD.object.pending]: {
          entry: ACTIONS_CRUD.object.increment,
          invoke: {
            src,
            onDone: {
              target: STATES_CRUD.object.information,
              actions: ACTIONS_CRUD.object.assign,
            },
          },
        },
        ...STATES_FINAL,
      },
    },
    {
      services: {
        src,
      },
      actions: {
        [ACTIONS_CRUD.object.increment]: assign({
          iterator: ({ iterator }) => iterator + 1,
        }),
        [ACTIONS_CRUD.object.assign]: assign((ctx, { data }) => ({
          ...ctx,
          ...data,
        })),
      },
    },
  );

  return machine;
}

// #region Test

type Test<T> = T extends Record<string, unknown> ? 1 : 0;
type Test2 = Test<{ date: string }>;

const src: ServiceCRUD<boolean, number> = (c, e) => {
  return Promise.resolve({ status: 100, payload: true });
};

const machine = createCRUDMAchine({
  src,
});

const service = interpret(machine).start();

service.onTransition(state => {
  state.context; //?
});

service.send('SEND');

// #endregion
