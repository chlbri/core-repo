import {
  ACTIONS_CRUD,
  ERRORS_STRING,
  STATESF_CRUD,
  STATES_COMMON_CRUD,
  STATE_CHECKING,
} from '../../src/constants/strings';
import { createCRUDMachine } from '../../src/functions/machine';
import { generateSyncMachineTest as ttestM } from '@core_chlbri/test-machine';
import { log } from '@core_chlbri/core';

const status = 10 as const;
describe('Existence', () => {
  it('Undefined states return error', () => {
    // const received = createCRUDMachine({});
    expect(() => createCRUDMachine({ config: {}, status })).toThrowError(
      ERRORS_STRING.object.no_machine_states,
    );
  });

  it('Empty states return error', () => {
    // const received = createCRUDMachine({});
    expect(() =>
      createCRUDMachine({ config: { states: {} }, status }),
    ).toThrowError(ERRORS_STRING.object.empty_states);
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
        status,
      }),
    ).toThrowError(ERRORS_STRING.object.states_internal);

    expect(() =>
      createCRUDMachine({
        config: {
          states: {
            [STATESF_CRUD.object.success]: {},
          },
        },
        status,
      }),
    ).toThrowError(ERRORS_STRING.object.states_internal);

    expect(() =>
      createCRUDMachine({
        config: {
          states: {
            [STATESF_CRUD.object.permission]: {},
          },
        },
        status,
      }),
    ).toThrow(ERRORS_STRING.object.states_internal);
  });

  it(`Config contains initial return error`, () => {
    // const received = createCRUDMachine({});
    expect(() =>
      createCRUDMachine({
        config: {
          initial: 'idle',
          context: { iterator: 0, response: { status: 300 } },
          states: {
            any: {},
          },
        },
        options: {
          actions: {
            [ACTIONS_CRUD.object.__assignRequest]: '' as any,
          },
        },
        status,
      }),
    ).toThrowError(ERRORS_STRING.object.initial);
  });

  it(`Config contains context return error`, () => {
    // const received = createCRUDMachine({});
    expect(() =>
      createCRUDMachine({
        config: {
          context: { iterator: 0, response: { status: 300 } },
          states: {
            any: {},
          },
        },
        options: {
          actions: {
            [ACTIONS_CRUD.object.__assignRequest]: '' as any,
          },
        },
        status,
      }),
    ).toThrowError(ERRORS_STRING.object.context_exits);
  });

  it(`States not contains ${STATES_COMMON_CRUD.object.checking} return error`, () => {
    // const received = createCRUDMachine({});
    expect(() =>
      createCRUDMachine({
        config: {
          states: {
            any: {},
          },
        },
        options: {
          actions: {
            [ACTIONS_CRUD.object.__assignRequest]: '' as any,
          },
        },
        status,
      }),
    ).toThrowError(ERRORS_STRING.object.no_checking);
  });

  it(`Actions contains ${ACTIONS_CRUD.object.__assignRequest} return error`, () => {
    // const received = createCRUDMachine({});
    expect(() =>
      createCRUDMachine({
        config: {
          states: {
            [STATES_COMMON_CRUD.object.checking]: {},
          },
        },
        options: {
          actions: {
            [ACTIONS_CRUD.object.__assignRequest]: '' as any,
          },
        },
        status,
      }),
    ).toThrow(ERRORS_STRING.object.actions_internal);
  });

  it(`Actions contains ${ACTIONS_CRUD.object.__increment} return error`, () => {
    // const received = createCRUDMachine({});
    expect(() =>
      createCRUDMachine({
        config: {
          states: {
            [STATES_COMMON_CRUD.object.checking]: {},
          },
        },
        options: {
          actions: {
            [ACTIONS_CRUD.object.__increment]: '' as any,
          },
        },
        status,
      }),
    ).toThrow(ERRORS_STRING.object.actions_internal);
  });

  it('it will give the good states', () => {
    const machine = createCRUDMachine({
      config: {
        states: {
          [STATES_COMMON_CRUD.object.checking]: {},
        },
      },
      options: {
        actions: {
          act1: '() => {}' as any,
        },
      },
      status,
    });

    const received = Object.keys(machine.states);
    const expected = ['idle', 'checking', ...STATESF_CRUD.array];
    log('received', received);
    log('expected', expected);

    expect(received).toEqual(expected);
  });

  it('it will give the good actions', () => {
    const machine = createCRUDMachine({
      config: {
        states: {
          [STATES_COMMON_CRUD.object.checking]: {},
        },
      },
      options: {
        actions: {
          act1: '() => {}' as any,
          act2: '() => {}' as any,
        },
      },
      status,
    });

    const received = Object.keys(machine.options.actions);
    const expected = ['act1', 'act2', ...ACTIONS_CRUD.array];
    expect(received).toEqual(expected);
  });
});

describe("Machine's work", () => {
  const machine = createCRUDMachine({
    config: {
      states: {
        [STATES_COMMON_CRUD.object.checking]: {},
      },
    },
    options: {
      actions: {
        act1: '() => {}' as any,
        act2: '() => {}' as any,
      },
    },
    status,
  });
  ttestM({
    machine,
    events: ['SEND'],
    invite: 'Test1',
    tests: [{ value: 'idle' }],
  });
  ttestM({
    machine,
    events: [
      'SEND',
      'SEND',
      'SEND',
      'SEND',
      'SEND',
      'SEND',
      'SEND',
      'SEND',
    ],
    invite: 'Test2',
    tests: [{ value: 'idle' }],
  });
});
