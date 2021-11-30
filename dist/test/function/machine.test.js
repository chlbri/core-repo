"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../src/constants/strings");
const machine_1 = require("../../src/functions/machine");
const test_machine_1 = require("@core_chlbri/test-machine");
const core_1 = require("@core_chlbri/core");
const status = 10;
describe('Existence', () => {
    it('Undefined states return error', () => {
        // const received = createCRUDMachine({});
        expect(() => (0, machine_1.createCRUDMachine)({ config: {}, status })).toThrowError(strings_1.ERRORS_STRING.object.no_machine_states);
    });
    it('Empty states return error', () => {
        // const received = createCRUDMachine({});
        expect(() => (0, machine_1.createCRUDMachine)({ config: { states: {} }, status })).toThrowError(strings_1.ERRORS_STRING.object.empty_states);
    });
    it(`States contains STATESF_CRUD return error`, () => {
        // const received = createCRUDMachine({});
        expect(() => (0, machine_1.createCRUDMachine)({
            config: {
                states: {
                    [strings_1.STATESF_CRUD.object.information]: {},
                },
            },
            status,
        })).toThrowError(strings_1.ERRORS_STRING.object.states_internal);
        expect(() => (0, machine_1.createCRUDMachine)({
            config: {
                states: {
                    [strings_1.STATESF_CRUD.object.success]: {},
                },
            },
            status,
        })).toThrowError(strings_1.ERRORS_STRING.object.states_internal);
        expect(() => (0, machine_1.createCRUDMachine)({
            config: {
                states: {
                    [strings_1.STATESF_CRUD.object.permission]: {},
                },
            },
            status,
        })).toThrow(strings_1.ERRORS_STRING.object.states_internal);
    });
    it(`Config contains initial return error`, () => {
        // const received = createCRUDMachine({});
        expect(() => (0, machine_1.createCRUDMachine)({
            config: {
                initial: 'idledsdd',
                context: { iterator: 0, response: { status: 300 } },
                states: {
                    any: {},
                },
            },
            options: {
                actions: {
                    [strings_1.ACTIONS_CRUD.object.__assignRequest]: '',
                },
            },
            status,
        })).toThrowError(strings_1.ERRORS_STRING.object.initial_exists);
    });
    it(`States not contains checking return error`, () => {
        // const received = createCRUDMachine({});
        expect(() => (0, machine_1.createCRUDMachine)({
            config: {
                states: {
                    any: {},
                },
            },
            options: {
                actions: {
                    [strings_1.ACTIONS_CRUD.object.__assignRequest]: '',
                },
            },
            status,
        })).toThrowError(strings_1.ERRORS_STRING.object.no_checking);
    });
    it(`Actions contains __assignRequest return error`, () => {
        // const received = createCRUDMachine({});
        expect(() => (0, machine_1.createCRUDMachine)({
            config: {
                states: {
                    [strings_1.STATES_COMMON_CRUD.object.checking]: {},
                },
            },
            options: {
                actions: {
                    [strings_1.ACTIONS_CRUD.object.__assignRequest]: '',
                },
            },
            status,
        })).toThrow(strings_1.ERRORS_STRING.object.actions_internal);
    });
    it(`Actions contains __increment return error`, () => {
        // const received = createCRUDMachine({});
        expect(() => (0, machine_1.createCRUDMachine)({
            config: {
                states: {
                    [strings_1.STATES_COMMON_CRUD.object.checking]: {},
                },
            },
            options: {
                actions: {
                    [strings_1.ACTIONS_CRUD.object.__increment]: '',
                },
            },
            status,
        })).toThrow(strings_1.ERRORS_STRING.object.actions_internal);
    });
    it('it will give the good states', () => {
        const machine = (0, machine_1.createCRUDMachine)({
            config: {
                states: {
                    [strings_1.STATES_COMMON_CRUD.object.checking]: {},
                },
            },
            options: {
                actions: {
                    act1: '() => {}',
                },
            },
            status,
        });
        const received = Object.keys(machine.states);
        const expected = ['idle', 'checking', ...strings_1.STATESF_CRUD.array];
        (0, core_1.log)('received', received);
        (0, core_1.log)('expected', expected);
        expect(received).toEqual(expected);
    });
    it('it will give the good actions', () => {
        const machine = (0, machine_1.createCRUDMachine)({
            config: {
                states: {
                    [strings_1.STATES_COMMON_CRUD.object.checking]: {},
                },
            },
            options: {
                actions: {
                    act1: '() => {}',
                    act2: '() => {}',
                },
            },
            status,
        });
        const received = Object.keys(machine.options.actions);
        const expected = ['act1', 'act2', ...strings_1.ACTIONS_CRUD.array];
        expect(received).toEqual(expected);
    });
});
describe("Machine's work", () => {
    const machine = (0, machine_1.createCRUDMachine)({
        config: {
            states: {
                [strings_1.STATES_COMMON_CRUD.object.checking]: {},
            },
        },
        options: {
            actions: {
                act1: '() => {}',
                act2: '() => {}',
            },
        },
        status,
    });
    (0, test_machine_1.generateSyncMachineTest)({
        machine,
        events: ['SEND'],
        invite: 'Test1',
        tests: [{ value: 'idle' }],
    });
    (0, test_machine_1.generateSyncMachineTest)({
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
