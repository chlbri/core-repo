"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDefaultActions = exports.error = void 0;
const immer_1 = require("@xstate/immer");
const strings_1 = require("../constants/strings");
const error = (arg) => {
    throw new Error(arg);
};
exports.error = error;
function generateDefaultActions() {
    return {
        [strings_1.ACTIONS_CRUD.object.__increment]: (0, immer_1.assign)(({ iterator }) => {
            iterator++;
        }),
        [strings_1.ACTIONS_CRUD.object.__assignRequest]: (0, immer_1.assign)(({ request }, { data }) => {
            if (data)
                request = data;
        }),
    };
}
exports.generateDefaultActions = generateDefaultActions;
