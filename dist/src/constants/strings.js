"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS_STRING = exports.STATES_COMMON_CRUD = exports.STATES_FINAL = exports.ACTIONS_CRUD = exports.STATESF_CRUD = exports.STATE_VALUES_CRUD = exports.xstate = void 0;
const functions_1 = require("../functions");
const machines_1 = require("./../schemas/strings/machines");
exports.xstate = 'xstate';
const type = 'final';
exports.STATE_VALUES_CRUD = (0, functions_1.getLiteralValues)(machines_1.stateSchemaCRUD);
exports.STATESF_CRUD = (0, functions_1.getLiteralValues)(machines_1.stateFSchemaCRUD);
exports.ACTIONS_CRUD = (0, functions_1.getLiteralValues)(machines_1.actionSchemaCRUD);
exports.STATES_FINAL = {
    information: {
        entry: [
            exports.ACTIONS_CRUD.object.__information,
            exports.ACTIONS_CRUD.object.__increment,
        ],
        type,
    },
    success: {
        entry: [
            exports.ACTIONS_CRUD.object.__success,
            exports.ACTIONS_CRUD.object.__increment,
        ],
        type,
    },
    redirect: {
        entry: [
            exports.ACTIONS_CRUD.object.__redirect,
            exports.ACTIONS_CRUD.object.__increment,
        ],
        type,
    },
    client: {
        entry: [exports.ACTIONS_CRUD.object.__client, exports.ACTIONS_CRUD.object.__increment],
        type,
    },
    server: {
        entry: [exports.ACTIONS_CRUD.object.__server, exports.ACTIONS_CRUD.object.__increment],
        type,
    },
    permission: {
        entry: [
            exports.ACTIONS_CRUD.object.__permission,
            exports.ACTIONS_CRUD.object.__increment,
        ],
        type,
    },
    timeout: {
        entry: [
            exports.ACTIONS_CRUD.object.__timeout,
            exports.ACTIONS_CRUD.object.__increment,
        ],
        type,
    },
};
exports.STATES_COMMON_CRUD = (0, functions_1.getLiteralValues)(machines_1.statesCommonSchemaCRUD);
exports.ERRORS_STRING = (0, functions_1.getLiteralValues)(machines_1.errorSchema);
