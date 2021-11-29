"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-empty-function */
const db_1 = require("./../../../src/adapters/array/db");
const test_machine_1 = require("@core_chlbri/test-machine");
const strings_1 = require("../../../src/constants/strings");
const machine_1 = require("../../../src/functions/machine");
const immer_1 = require("@xstate/immer");
const db = new db_1.ArrayCRUD_DB([], {
    __create: [],
    __read: [],
    __remove: [],
    __write: [],
});
const _db = [];
const machine = (0, machine_1.createCRUDMachine)({
    config: {
        id: 'readAll',
        states: {
            checking: {
                always: [
                    {
                        cond: () => _db.length < 1,
                        target: 'empty_db',
                    },
                    'check_options_limit',
                ],
            },
            empty_db: {
                entry: '__increment',
                always: {
                    actions: (0, immer_1.assign)(({ response: { messages } }) => {
                        messages = ['empty_db'];
                    }),
                    target: 'server',
                },
            },
            check_options_limit: {
                entry: '__increment',
                always: [
                    {
                        cond: ({ request }) => { var _a; return !!((_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.limit); },
                        target: 'options_limit',
                    },
                    {
                        target: strings_1.STATESF_CRUD.object.success,
                        actions: (0, immer_1.assign)(({ response: { payload } }) => {
                            Object.assign(payload, _db);
                        }),
                    },
                ],
            },
            options_limit: {
                initial: 'idle',
                states: {
                    idle: {
                        entry: '__increment',
                        always: [
                            {
                                cond: ({ request }) => {
                                    var _a;
                                    const limit = (_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.limit;
                                    return !!limit && limit < _db.length;
                                },
                                target: 'limit_reached',
                            },
                            {
                                target: `#readAll.information`,
                                actions: (0, immer_1.assign)(({ response: { messages, payload } }) => {
                                    messages = ['options_limit'];
                                    Object.assign(payload, _db);
                                }),
                            },
                        ],
                    },
                    limit_reached: {
                        entry: strings_1.ACTIONS_CRUD.object.__increment,
                        always: {
                            actions: (0, immer_1.assign)(({ response: { payload, messages }, request }) => {
                                var _a;
                                messages = ['limit_reached'];
                                const limit = (_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.limit;
                                Object.assign(payload, _db.slice(0, limit));
                            }),
                            target: `#readAll.redirect`,
                        },
                    },
                },
            },
        },
    },
    options: {},
    status: 15,
});
describe('Create', () => { });
describe('Read', () => {
    (0, test_machine_1.generateSyncMachineTest)({
        invite: 'ReadAll',
        machine,
        events: [
            {
                type: 'SEND',
            },
        ],
        tests: [
            { value: strings_1.STATE_VALUES_CRUD.object.idle },
            { value: strings_1.STATE_VALUES_CRUD.object.idle },
            // { value: STATES_COMMON_CRUD.object.empty_db },
            // { value: STATE_VALUES_CRUD.object.server },
        ],
    });
});
describe('Update', () => { });
describe('Set', () => { });
describe('Delete', () => { });
describe('Retrieve', () => { });
describe('Remove', () => { });
