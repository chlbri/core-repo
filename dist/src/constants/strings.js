"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS_STRING = exports.STATES_COMMON_CRUD = exports.STATES_FINAL = exports.STATE_CHECKING = exports.ACTIONS_CRUD = exports.STATESF_CRUD = exports.STATE_VALUES_CRUD = exports.xstate = void 0;
const functions_1 = require("../functions");
const error_1 = require("../schemas/strings/error");
const machines_1 = require("../schemas/strings/machines");
exports.xstate = 'xstate';
exports.STATE_VALUES_CRUD = (0, functions_1.getLiteralValues)(machines_1.stateSchemaCRUD);
exports.STATESF_CRUD = (0, functions_1.getLiteralValues)(machines_1.stateFSchemaCRUD);
exports.ACTIONS_CRUD = (0, functions_1.getLiteralValues)(machines_1.actionSchemaCRUD);
exports.STATE_CHECKING = 'checking';
function writeFinalState(str) {
    return {
        [str]: {
            entry: [exports.ACTIONS_CRUD.object.__increment],
            type: 'final',
        },
    };
}
exports.STATES_FINAL = {
    [exports.STATESF_CRUD.object.information]: {
        entry: [
            exports.ACTIONS_CRUD.object.__information,
            exports.ACTIONS_CRUD.object.__increment,
        ],
        type: 'final',
    },
    [exports.STATESF_CRUD.object.success]: {
        entry: [
            exports.ACTIONS_CRUD.object.__success,
            exports.ACTIONS_CRUD.object.__increment,
        ],
        type: 'final',
    },
    [exports.STATESF_CRUD.object.redirect]: {
        entry: [
            exports.ACTIONS_CRUD.object.__redirect,
            exports.ACTIONS_CRUD.object.__increment,
        ],
        type: 'final',
    },
    [exports.STATESF_CRUD.object.client]: {
        entry: [exports.ACTIONS_CRUD.object.__client, exports.ACTIONS_CRUD.object.__increment],
        type: 'final',
    },
    [exports.STATESF_CRUD.object.server]: {
        entry: [exports.ACTIONS_CRUD.object.__server, exports.ACTIONS_CRUD.object.__increment],
        type: 'final',
    },
    [exports.STATESF_CRUD.object.permission]: {
        entry: [
            exports.ACTIONS_CRUD.object.__permission,
            exports.ACTIONS_CRUD.object.__increment,
        ],
        type: 'final',
    },
    [exports.STATESF_CRUD.object.timeout]: {
        entry: [
            exports.ACTIONS_CRUD.object.__timeout,
            exports.ACTIONS_CRUD.object.__increment,
        ],
        type: 'final',
    },
};
exports.STATES_COMMON_CRUD = (0, functions_1.getLiteralValues)(machines_1.statesCommonSchemaCRUD); //?
exports.ERRORS_STRING = (0, functions_1.getLiteralValues)(error_1.errorSchema);
const D = {
    [exports.STATES_COMMON_CRUD.object.checking]: '3'
};
