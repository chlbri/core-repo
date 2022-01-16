"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOne = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const immer_1 = require("@xstate/immer");
const machine_1 = require("../../../functions/machine");
const resolver_1 = require("../resolver");
function readOne(db = []) {
    return (0, machine_1.createCRUDMachine)({
        config: {
            id: 'readOne',
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
                        'check_filters',
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
                            Object.assign(payload, db.find((0, resolver_1.inStreamSearchAdapter)(filters)));
                        }),
                    },
                },
                check_options: {
                    entry: '__increment',
                    always: ['success'],
                },
            },
        },
        options: {},
        status: 16,
    });
}
exports.readOne = readOne;
