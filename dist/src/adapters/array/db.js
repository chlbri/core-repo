"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAll = exports.ArrayCRUD_DB = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const immer_1 = require("@xstate/immer");
const immer_2 = require("immer");
const machine_1 = require("../../functions/machine");
// type Permission<T extends Entity> = {
//   permissionReader: PermissionsReaderOne<T>;
// };
class ArrayCRUD_DB {
    /* , Permission<T> */
    constructor(_db, permissions) {
        this._db = _db;
        this.permissions = permissions;
        this.__update = (payload, update) => {
            const __db = (0, immer_2.produce)([...this._db], draft => {
                payload.forEach(id => {
                    const index = draft.findIndex((data) => data._id === id);
                    if (index !== -1) {
                        draft[index].login = update.login;
                    }
                });
            });
            this.rinitDB();
            this._db.push(...__db);
        };
        // readonly permissionReaderMany: PermissionsReaderMany<T> = dso => {
        //   const datas = this._db.filter(inStreamSearchAdapter(dso));
        //   const out = datas.map(getPermissions);
        //   return out;
        // };
        // readonly permissionReaderOne: PermissionsReaderOne<T> = dso =>
        //   this.permissionReaderMany(dso)[0];
        // #region Create
        this.createMany = (0, machine_1.createCRUDMachine)({
            status: 11,
            config: {},
            options: {},
        });
        // #endregion
        // #region Read
        this.readAll = (0, machine_1.createCRUDMachine)({
            config: {
                id: 'readAll',
                states: {
                    checking: {
                        always: [
                            {
                                cond: () => true,
                                target: 'empty_db',
                            },
                            'empty_db',
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
                                    Object.assign(payload, []);
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
                                            return !!limit && limit < [].length;
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
                                        Object.assign(payload, [].slice(0, limit));
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
    rinitDB() {
        this._db.length = 0;
    }
    get length() {
        return this._db.length;
    }
    isEmpty() {
        return this._db.length === 0;
    }
}
exports.ArrayCRUD_DB = ArrayCRUD_DB;
const db = [];
function readAll() {
    return (0, machine_1.createCRUDMachine)({
        config: {
            id: 'readAll',
            states: {
                checking: {
                    always: [
                        {
                            cond: () => db.length < 0,
                            target: 'empty_db',
                        },
                        'empty_db',
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
