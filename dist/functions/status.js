"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStatus = exports.isTimeoutStatus = exports.isSuccessStatus = exports.isServerStatus = exports.isRedirectStatus = exports.isPermissionStatus = exports.isInformationStatus = exports.isClientErrorStatus = void 0;
const status_1 = require("../schemas/status");
function isClientErrorStatus(arg) {
    return status_1.clientErrorStatusSchema.safeParse(arg.status).success;
}
exports.isClientErrorStatus = isClientErrorStatus;
function isInformationStatus(arg) {
    return status_1.informationStatusSchema.safeParse(arg.status).success;
}
exports.isInformationStatus = isInformationStatus;
function isPermissionStatus(arg) {
    return status_1.permissionStatusSchema.safeParse(arg.status).success;
}
exports.isPermissionStatus = isPermissionStatus;
function isRedirectStatus(arg) {
    return status_1.redirectStatusSchema.safeParse(arg.status).success;
}
exports.isRedirectStatus = isRedirectStatus;
function isServerStatus(arg) {
    return status_1.serverErrorStatusSchema.safeParse(arg.status).success;
}
exports.isServerStatus = isServerStatus;
function isSuccessStatus(arg) {
    return status_1.successfullStatusSchema.safeParse(arg.status).success;
}
exports.isSuccessStatus = isSuccessStatus;
function isTimeoutStatus(arg) {
    return status_1.timeoutErrorStatusSchema.safeParse(arg.status).success;
}
exports.isTimeoutStatus = isTimeoutStatus;
function isStatus(arg) {
    return status_1.statusSchema.safeParse(arg.status).success;
}
exports.isStatus = isStatus;
