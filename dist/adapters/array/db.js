"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayCRUD_DB = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const immer_1 = require("immer");
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
            const __db = (0, immer_1.produce)([...this._db], draft => {
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
        // #endregion
        // #region Read
        this.readMany = (0, machine_1.createCRUDMachine)({
            config: {
                id: 'readAll',
                initial: strings_1.STATE_VALUES_CRUD.object.idle,
                states: {
                    [strings_1.STATE_VALUES_CRUD.object.idle]: {
                        on: {
                            SEND: [
                                { actions: [strings_1.ACTIONS_CRUD.object.__assignRequest] },
                                {
                                    cond: this.isEmpty,
                                    target: strings_1.STATES_COMMON_CRUD.object.empty_db,
                                },
                                { target: strings_1.STATES_COMMON_CRUD.object.check_options_limit },
                            ],
                        },
                    },
                    [strings_1.STATES_COMMON_CRUD.object.empty_db]: {
                        entry: strings_1.ACTIONS_CRUD.object.__increment,
                        type: 'final',
                        data: {
                            status: 515,
                            messages: [strings_1.STATES_COMMON_CRUD.object.empty_db],
                        },
                    },
                    [strings_1.STATES_COMMON_CRUD.object.check_options_limit]: {
                        entry: strings_1.ACTIONS_CRUD.object.__increment,
                        always: [
                            {
                                cond: (_, { data }) => { var _a; return !!((_a = data === null || data === void 0 ? void 0 : data.options) === null || _a === void 0 ? void 0 : _a.limit); },
                                target: strings_1.STATES_COMMON_CRUD.object.options_limit,
                            },
                            { target: strings_1.STATES_COMMON_CRUD.object.no_options_limit },
                        ],
                    },
                    [strings_1.STATES_COMMON_CRUD.object.no_options_limit]: {
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
                                    { target: '#readAll.nolimit' },
                                ],
                            },
                            [strings_1.STATES_COMMON_CRUD.object.limit_reached]: {
                                entry: strings_1.ACTIONS_CRUD.object.__increment,
                            },
                        },
                    },
                    [strings_1.STATES_COMMON_CRUD.object.options_limit]: {
                        type: 'final',
                        data: ({ response }) => response,
                    },
                },
            },
            options: {},
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
