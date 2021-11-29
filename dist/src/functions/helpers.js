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
function generateDefaultActions(statusF) {
    return {
        [strings_1.ACTIONS_CRUD.object.__increment]: (0, immer_1.assign)(({ iterator }) => {
            iterator++;
        }),
        [strings_1.ACTIONS_CRUD.object.__assignRequest]: (0, immer_1.assign)(({ request }, { data }) => {
            if (data)
                request = data;
        }),
        [strings_1.ACTIONS_CRUD.object.__information]: (0, immer_1.assign)(({ response: { status } }) => {
            status = (100 + statusF);
        }),
        [strings_1.ACTIONS_CRUD.object.__success]: (0, immer_1.assign)(({ response: { status } }) => {
            status = (200 + statusF);
        }),
        [strings_1.ACTIONS_CRUD.object.__redirect]: (0, immer_1.assign)(({ response: { status } }) => {
            status = (300 + statusF);
        }),
        [strings_1.ACTIONS_CRUD.object.__client]: (0, immer_1.assign)(({ response: { status } }) => {
            status = (400 + statusF);
        }),
        [strings_1.ACTIONS_CRUD.object.__server]: (0, immer_1.assign)(({ response: { status } }) => {
            status = (500 + statusF);
        }),
        [strings_1.ACTIONS_CRUD.object.__permission]: (0, immer_1.assign)(({ response: { status } }) => {
            status = (600 + statusF);
        }),
        [strings_1.ACTIONS_CRUD.object.__timeout]: (0, immer_1.assign)(({ response: { status } }) => {
            status = (900 + statusF);
        }),
    };
}
exports.generateDefaultActions = generateDefaultActions;
