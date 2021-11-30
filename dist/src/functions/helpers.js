"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDefaultActions = exports.error = void 0;
const immer_1 = require("@xstate/immer");
const error = (arg) => {
    throw new Error(arg);
};
exports.error = error;
function generateDefaultActions(statusF) {
    return {
        __increment: (0, immer_1.assign)(({ iterator }) => {
            iterator++;
        }),
        __assignRequest: (0, immer_1.assign)(({ request }, { data }) => {
            if (data)
                request = data;
        }),
        __information: (0, immer_1.assign)(({ response: { status } }) => {
            status = (100 + statusF);
        }),
        __success: (0, immer_1.assign)(({ response: { status } }) => {
            status = (200 + statusF);
        }),
        __redirect: (0, immer_1.assign)(({ response: { status } }) => {
            status = (300 + statusF);
        }),
        __client: (0, immer_1.assign)(({ response: { status } }) => {
            status = (400 + statusF);
        }),
        __server: (0, immer_1.assign)(({ response: { status } }) => {
            status = (500 + statusF);
        }),
        __permission: (0, immer_1.assign)(({ response: { status } }) => {
            status = (600 + statusF);
        }),
        __timeout: (0, immer_1.assign)(({ response: { status } }) => {
            status = (900 + statusF);
        }),
    };
}
exports.generateDefaultActions = generateDefaultActions;
