"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayCRUD_DB = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const immer_1 = require("@xstate/immer");
const immer_2 = require("immer");
const strings_1 = require("../../constants/strings");
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
                    [strings_1.STATES_COMMON_CRUD.object.checking]: {
                        always: [
                            {
                                cond: this.isEmpty,
                                target: strings_1.STATES_COMMON_CRUD.object.empty_db,
                            },
                            strings_1.STATES_COMMON_CRUD.object.check_options_limit,
                        ],
                    },
                    [strings_1.STATES_COMMON_CRUD.object.empty_db]: {
                        entry: strings_1.ACTIONS_CRUD.object.__increment,
                        always: {
                            actions: (0, immer_1.assign)(({ response: { messages } }) => {
                                messages = [strings_1.STATES_COMMON_CRUD.object.empty_db];
                            }),
                            target: strings_1.STATESF_CRUD.object.server,
                        },
                    },
                    [strings_1.STATES_COMMON_CRUD.object.check_options_limit]: {
                        entry: strings_1.ACTIONS_CRUD.object.__increment,
                        always: [
                            {
                                cond: ({ request }) => { var _a; return !!((_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.limit); },
                                target: strings_1.STATES_COMMON_CRUD.object.options_limit,
                            },
                            {
                                target: strings_1.STATESF_CRUD.object.success,
                                actions: (0, immer_1.assign)(({ response: { payload } }) => {
                                    Object.assign(payload, this._db);
                                }),
                            },
                        ],
                    },
                    [strings_1.STATES_COMMON_CRUD.object.options_limit]: {
                        initial: strings_1.STATE_VALUES_CRUD.object.idle,
                        states: {
                            idle: {
                                entry: strings_1.ACTIONS_CRUD.object.__increment,
                                always: [
                                    {
                                        cond: ({ request }) => {
                                            var _a;
                                            const limit = (_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.limit;
                                            return !!limit && limit < this._db.length;
                                        },
                                        target: strings_1.STATES_COMMON_CRUD.object.limit_reached,
                                    },
                                    {
                                        target: `#readAll.${strings_1.STATESF_CRUD.object.information}`,
                                        actions: (0, immer_1.assign)(({ response: { messages, payload } }) => {
                                            messages = [strings_1.STATES_COMMON_CRUD.object.options_limit];
                                            Object.assign(payload, this._db);
                                        }),
                                    },
                                ],
                            },
                            [strings_1.STATES_COMMON_CRUD.object.limit_reached]: {
                                entry: strings_1.ACTIONS_CRUD.object.__increment,
                                always: {
                                    actions: (0, immer_1.assign)(({ response: { payload, messages }, request }) => {
                                        var _a;
                                        messages = [strings_1.STATES_COMMON_CRUD.object.limit_reached];
                                        const limit = (_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.limit;
                                        Object.assign(payload, this._db.slice(0, limit));
                                    }),
                                    target: `#readAll.${strings_1.STATESF_CRUD.object.redirect}`,
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
