"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS_STRING = exports.STATES_COMMON_CRUD = exports.STATES_FINAL = exports.ACTIONS_CRUD = exports.STATESF_CRUD = exports.STATE_VALUES_CRUD = void 0;
const functions_1 = require("../functions");
const error_1 = require("../schemas/strings/error");
const machines_1 = require("../schemas/strings/machines");
exports.STATE_VALUES_CRUD = (0, functions_1.getLiteralValues)(machines_1.stateSchemaCRUD);
exports.STATESF_CRUD = (0, functions_1.getLiteralValues)(machines_1.stateFSchemaCRUD);
exports.ACTIONS_CRUD = (0, functions_1.getLiteralValues)(machines_1.actionSchemaCRUD);
function writeFinalState(str) {
    return {
        [str]: {
            entry: [
                exports.ACTIONS_CRUD.object.__increment,
                exports.ACTIONS_CRUD.object.__assignRequest,
            ],
            type: 'final',
        },
    };
}
exports.STATES_FINAL = exports.STATESF_CRUD.array
    .map(writeFinalState)
    .reduce((acc, curr) => {
    Object.assign(acc, curr);
    return acc;
}, {});
exports.STATES_COMMON_CRUD = (0, functions_1.getLiteralValues)(machines_1.statesCommonSchemaCRUD);
exports.ERRORS_STRING = (0, functions_1.getLiteralValues)(error_1.errorSchema);
