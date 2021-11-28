import {
  ACTIONS_CRUD,
  ERRORS_STRING,
  STATESF_CRUD,
} from '../../src/constants/strings';
import { createCRUDMachine } from '../../src/functions/machine';
import {} from '@core_chlbri/test-machine'

it('Undefined states return error', () => {
  // const received = createCRUDMachine({});
  expect(() => createCRUDMachine({ config: {} })).toThrow(
    ERRORS_STRING.object.empty_states,
  );
});

it('Empty states return error', () => {
  // const received = createCRUDMachine({});
  expect(() => createCRUDMachine({ config: { states: {} } })).toThrow(
    ERRORS_STRING.object.no_machine_states,
  );
});

it(`States contains STATESF_CRUD return error`, () => {
  // const received = createCRUDMachine({});
  expect(() =>
    createCRUDMachine({
      config: {
        states: {
          [STATESF_CRUD.object.information]: {},
        },
      },
    }),
  ).toThrow(ERRORS_STRING.object.states_internal);

  expect(() =>
    createCRUDMachine({
      config: {
        states: {
          [STATESF_CRUD.object.success]: {},
        },
      },
    }),
  ).toThrow(ERRORS_STRING.object.states_internal);

  expect(() =>
    createCRUDMachine({
      config: {
        states: {
          [STATESF_CRUD.object.permission]: {},
        },
      },
    }),
  ).toThrow(ERRORS_STRING.object.states_internal);
});

it(`Actions contains ${ACTIONS_CRUD.object.__assignStatus} return error`, () => {
  // const received = createCRUDMachine({});
  expect(() =>
    createCRUDMachine({
      config: {
        states: {
          idle: {},
        },
      },
      options: {
        actions: {
          [ACTIONS_CRUD.object.__assignStatus]: '' as any,
        },
      },
    }),
  ).toThrow(ERRORS_STRING.object.actions_internal);
});

it(`Actions contains ${ACTIONS_CRUD.object.__increment} return error`, () => {
  // const received = createCRUDMachine({});
  expect(() =>
    createCRUDMachine({
      config: {
        states: {
          idle: {},
        },
      },
      options: {
        actions: {
          [ACTIONS_CRUD.object.__increment]: '' as any,
        },
      },
    }),
  ).toThrow(ERRORS_STRING.object.actions_internal);
});

it('it will give the good states', () => {
  const machine = createCRUDMachine({
    config: {
      states: {
        idle: {},
      },
    },
    options: {
      actions: {
        act1: '() => {}' as any,
      },
    },
  });

  const received = Object.keys(machine.states);
  const expected = ['idle', ...STATESF_CRUD.array];
  expect(received).toEqual(expected);
});

it('it will give the good actions', () => {
  const machine = createCRUDMachine({
    config: {
      states: {
        idle: {},
      },
    },
    options: {
      actions: {
        act1: '() => {}' as any,
        act2: '() => {}' as any,
      },
    },
  });

  const received = Object.keys(machine.options.actions);
  const expected = ['act1', 'act2', ...ACTIONS_CRUD.array];
  expect(received).toEqual(expected);
});
