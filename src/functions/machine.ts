import { NExclude } from '@core_chlbri/core';
import { nanoid } from 'nanoid';
import { assign, createMachine, interpret } from 'xstate';
import { ACTIONS, STATES } from '../constants/strings';
import { PromiseService, StateCRUD, StateCRUDArgs } from '../types/_crud';

function writeFinalState<S extends string>(str: S) {
  return {
    [str]: {
      entry: ACTIONS.object.increment,
      type: 'final',
    },
  } as const;
}



export function createCRUDMAchine<C = any, E = any, TF = any>({
  src,
  id = nanoid(),
  status = 400,
}: StateCRUDArgs<C, E, TF>): StateCRUD<C, E> {
  const finalStates = STATES.array
    .filter(state => state !== 'idle' && state !== 'pending')
    .map(writeFinalState)
    .reduce((acc, curr) => {
      Object.assign(acc, curr);
      return acc;
    }, {}) as {
    [key in NExclude<typeof STATES.array[number], 'idle' | 'pending'>]: {
      entry: typeof ACTIONS.object.increment;
      type: 'final';
    };
  };
  const machine: StateCRUD<C, E> = createMachine(
    {
      initial: 'idle',
      id,
      context: { status, iterator: 0 },
      states: {
        [STATES.object.idle]: {
          on: {
            SEND: STATES.object.pending,
          },
        },
        [STATES.object.pending]: {
          entry: ACTIONS.object.increment,
          invoke: {
            src,
            onDone: {
              target: STATES.object.information,
              actions: ACTIONS.object.assign,
            },
          },
        },
        ...finalStates,
      },
    },
    {
      services: {
        src,
      },
      actions: {
        [ACTIONS.object.increment]: assign({
          iterator: ({ iterator }) => iterator + 1,
        }),
        [ACTIONS.object.assign]: assign((ctx, { data }) => ({
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

const src: PromiseService<boolean, number, any> = (c, e, f) => {
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


