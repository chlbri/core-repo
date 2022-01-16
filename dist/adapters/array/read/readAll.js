"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAll = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const immer_1 = require("@xstate/immer");
const machine_1 = require("../../../functions/machine");
function readAll(db = []) {
    return (0, machine_1.createCRUDMachine)({
        config: {
            id: 'readAll',
            states: {
                checking: {
                    entry: '__increment',
                    always: [
                        {
                            cond: () => db.length === 0,
                            target: 'empty_db',
                            actions: () => {
                                console.log('okkk');
                            },
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
                            target: 'success',
                            actions: (0, immer_1.assign)(({ response: { payload } }) => {
                                Object.assign(payload, db);
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
                                        return !!limit && limit < db.length;
                                    },
                                    target: 'limit_reached',
                                },
                                {
                                    target: `#readAll.information`,
                                    actions: (0, immer_1.assign)(({ response: { messages, payload } }) => {
                                        messages = ['options_limit'];
                                        Object.assign(payload, []);
                                    }),
                                },
                            ],
                        },
                        limit_reached: {
                            entry: '__increment',
                            always: {
                                actions: (0, immer_1.assign)(({ response: { payload, messages }, request }) => {
                                    var _a;
                                    messages = ['limit_reached'];
                                    const limit = (_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.limit;
                                    Object.assign(payload, db.slice(0, limit));
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
}
exports.readAll = readAll;
