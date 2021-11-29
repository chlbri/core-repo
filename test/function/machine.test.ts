import {
  ACTIONS_CRUD,
  ERRORS_STRING,
  STATESF_CRUD,
} from '../../src/constants/strings';
import { createCRUDMachine } from '../../src/functions/machine';
import { generateSyncMachineTest as ttestM } from '@core_chlbri/test-machine';
import { log } from '@core_chlbri/core';

describe('Existence', () => {
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
      }),
    ).toThrow(ERRORS_STRING.object.context_exits);
  });

  (() => {
    it(`Actions contains ${ACTIONS_CRUD.object.__assignRequest} return error`, () => {
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
        }),
      ).toThrow(ERRORS_STRING.object.actions_internal);
    });
  })();

  (() => {
    it(`Actions contains ${ACTIONS_CRUD.object.__increment} return error`, () => {
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
              [ACTIONS_CRUD.object.__increment]: '' as any,
            },
          },
        }),
      ).toThrow(ERRORS_STRING.object.actions_internal);
    });
  })();

  it('it will give the good states', () => {
    const machine = createCRUDMachine({
      config: {
        states: {
          any: {},
        },
      },
      options: {
        actions: {
          act1: '() => {}' as any,
        },
      },
    });

    const received = Object.keys(machine.states);
    const expected = ['idle', 'any', ...STATESF_CRUD.array];
    log('received', received);
    log('expected', expected);

    expect(received).toEqual(expected);
  });

  it('it will give the good actions', () => {
    const machine = createCRUDMachine({
      config: {
        states: {
          any: {},
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
});

const machine = createCRUDMachine({
  config: {
    initial: 'any',
    states: {
      any: {},
    },
  },
  options: {
    actions: {
      act1: '() => {}' as any,
      act2: '() => {}' as any,
    },
  },
});

describe("Machine's work", () => {
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
