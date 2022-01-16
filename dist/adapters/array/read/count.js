"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const immer_1 = require("@xstate/immer");
const machine_1 = require("../../../functions/machine");
const resolver_1 = require("../resolver");
function count(db = []) {
    return (0, machine_1.createCRUDMachine)({
        config: {
            id: 'count',
            states: {
                checking: {
                    entry: '__increment',
                    always: [
                        {
                            cond: () => db.length === 0,
                            target: 'empty_db',
                        },
                        'check_filters',
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
                check_filters: {
                    entry: '__increment',
                    always: [
                        {
                            cond: ({ request }) => {
                                return !!(request === null || request === void 0 ? void 0 : request.filters);
                            },
                            target: 'filters',
                        },
                        {
                            target: 'success',
                            actions: (0, immer_1.assign)(({ response: { payload } }) => {
                                payload = db.length;
                            }),
                        },
                    ],
                },
                filters: {
                    entry: '__increment',
                    always: {
                        target: 'check_options',
                        actions: (0, immer_1.assign)(({ response: { payload }, request }) => {
                            const filters = request === null || request === void 0 ? void 0 : request.filters;
                            if (!filters)
                                return;
                            payload = db.filter((0, resolver_1.inStreamSearchAdapter)(filters)).length;
                        }),
                    },
                },
                check_options: {
                    entry: '__increment',
                    always: [
                        {
                            cond: ({ request }) => {
                                return !!(request === null || request === void 0 ? void 0 : request.options);
                            },
                            target: 'options',
                        },
                        'success',
                    ],
                },
                options: {
                    initial: 'idle',
                    states: {
                        idle: {
                            entry: '__increment',
                            always: [
                                {
                                    cond: ({ request, response: { payload } }) => {
                                        var _a;
                                        const limit = (_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.limit;
                                        return !!limit && !!payload && limit < payload;
                                    },
                                    target: 'limit_reached',
                                },
                                {
                                    target: `#count.information`,
                                    actions: (0, immer_1.assign)(({ response: { messages } }) => {
                                        messages.push('options_limit');
                                    }),
                                },
                            ],
                        },
                        limit_reached: {
                            entry: '__increment',
                            always: {
                                actions: (0, immer_1.assign)(({ response: { payload, messages }, request }) => {
                                    var _a;
                                    messages.push('limit_reached');
                                    const limit = (_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.limit;
                                    if (limit)
                                        payload = limit;
                                }),
                                target: `#count.redirect`,
                            },
                        },
                    },
                },
            },
        },
        options: {},
        status: 17,
    });
}
exports.count = count;
