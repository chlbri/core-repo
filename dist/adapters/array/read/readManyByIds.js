"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readManyByIds = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const immer_1 = require("@xstate/immer");
const machine_1 = require("../../../functions/machine");
const resolver_1 = require("../resolver");
function readManyByIds(db = []) {
    return (0, machine_1.createCRUDMachine)({
        config: {
            id: 'readManyByIds',
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
                        'filterIds',
                    ],
                },
                filterIds: {
                    entry: '__increment',
                    always: {
                        actions: (0, immer_1.assign)(({ response: { payload }, request }) => {
                            const ids = request === null || request === void 0 ? void 0 : request.ids;
                            if (!ids)
                                throw 'no_ids';
                            const _payload = db.filter(data => ids.some(id => id === data._id));
                            Object.assign(payload, _payload);
                        }),
                        target: 'check_filters',
                    },
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
                check_filters: {
                    entry: '__increment',
                    always: [
                        {
                            cond: ({ request }) => {
                                return !!(request === null || request === void 0 ? void 0 : request.filters);
                            },
                            target: 'filters',
                        },
                        'check_options',
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
                            if (!payload)
                                return;
                            Object.assign(payload, payload.filter((0, resolver_1.inStreamSearchAdapter)(filters)));
                        }),
                    },
                },
                check_options: {
                    entry: '__increment',
                    always: [
                        {
                            cond: ({ request }) => { var _a; return !!((_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.limit); },
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
                                        return !!limit && !!payload && limit < payload.length;
                                    },
                                    target: 'limit_reached',
                                },
                                {
                                    target: `#readManyByIds.information`,
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
                                    if (!payload)
                                        throw 'payload_not_defined';
                                    Object.assign(payload, payload.slice(0, limit));
                                }),
                                target: `#readManyByIds.redirect`,
                            },
                        },
                    },
                },
            },
        },
        options: {},
        status: 16,
    });
}
exports.readManyByIds = readManyByIds;
