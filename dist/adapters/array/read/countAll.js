"use strict";
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.countAll = void 0;
const immer_1 = require("@xstate/immer");
const machine_1 = require("../../../functions/machine");
const IDS = {
    guards: {
        dbIsEmpty: 'dbIsEmpty',
        optionsIsDefined: 'optionsIsDefined',
        limitIsDefined: 'limitIsDefined',
    },
    states: {
        checking: 'checking',
        empty_db: 'empty_db',
        check_options: 'check_options',
        options: 'options',
        idle: 'idle',
        limit_reached: 'limit_reached',
        information: '#countAll.information',
        success: '#countAll.success',
        server: '#countAll.server',
        redirect: '#countAll.redirect',
    },
    actions: {
        pushEmptyDB: 'pushEmptyDB',
        pushLimitReached: 'pushLimitReached',
        pushOptionsLimit: 'pushOptionsLimit',
        assignPayloadToDBLength: 'assignPayloadToDBLength',
        assignPayloadToLimit: 'assignPayloadToLimit',
    },
    messsages: {
        empty_db: 'empty_db',
        limit_reached: 'limit_reached',
        options_limit: 'options_limit',
    },
};
function countAll(db = []) {
    return (0, machine_1.createCRUDMachine)({
        config: {
            id: 'countAll',
            states: {
                checking: {
                    entry: '__increment',
                    always: [
                        {
                            cond: 'dbIsEmpty',
                            target: 'empty_db',
                        },
                        'check_options',
                    ],
                },
                empty_db: {
                    entry: '__increment',
                    always: {
                        actions: (0, immer_1.assign)(({ response: { messages } }) => {
                            messages.push('empty_db');
                        }),
                        target: 'server',
                    },
                },
                check_options: {
                    entry: '__increment',
                    always: [
                        {
                            cond: ({ request: options }) => !!options,
                            target: 'options',
                        },
                        {
                            target: 'success',
                            actions: (0, immer_1.assign)(({ response: { payload } }) => {
                                payload = db.length;
                            }),
                        },
                    ],
                },
                options: {
                    initial: 'idle',
                    states: {
                        idle: {
                            entry: '__increment',
                            always: [
                                {
                                    cond: ({ request }) => {
                                        const limit = request === null || request === void 0 ? void 0 : request.limit;
                                        return !!limit && limit < db.length;
                                    },
                                    target: 'limit_reached',
                                },
                                {
                                    target: `#countAll.information`,
                                    actions: (0, immer_1.assign)(({ response: { messages, payload } }) => {
                                        messages.push('options_limit');
                                        payload = db.length;
                                    }),
                                },
                            ],
                        },
                        limit_reached: {
                            entry: '__increment',
                            always: {
                                actions: (0, immer_1.assign)(({ response: { payload, messages }, request }) => {
                                    messages.push('limit_reached');
                                    const limit = request === null || request === void 0 ? void 0 : request.limit;
                                    payload = limit;
                                }),
                                target: `#countAll.redirect`,
                            },
                        },
                    },
                },
            },
        },
        options: {
            guards: {
                [IDS.guards.dbIsEmpty]: () => db.length === 0,
                [IDS.guards.optionsIsDefined]: ({ request: options }) => !!options,
                [IDS.guards.limitIsDefined]: ({ request: options }) => !!(options === null || options === void 0 ? void 0 : options.limit),
            },
            actions: {
                [IDS.actions.pushEmptyDB]: (0, immer_1.assign)(({ response: { messages } }) => {
                    messages.push(IDS.messsages.empty_db);
                }),
                [IDS.actions.pushLimitReached]: (0, immer_1.assign)(({ response: { messages } }) => {
                    messages.push(IDS.messsages.limit_reached);
                }),
                [IDS.actions.pushOptionsLimit]: (0, immer_1.assign)(({ response: { messages } }) => {
                    messages.push(IDS.messsages.options_limit);
                }),
                [IDS.actions.assignPayloadToDBLength]: (0, immer_1.assign)(({ response: { payload } }) => {
                    payload = db.length;
                }),
                [IDS.actions.assignPayloadToLimit]: (0, immer_1.assign)(({ response: { payload }, request }) => {
                    const limit = request === null || request === void 0 ? void 0 : request.limit;
                    payload = limit;
                }),
            },
        },
        status: 15,
    });
}
exports.countAll = countAll;
