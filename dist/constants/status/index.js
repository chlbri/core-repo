"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_FIGURE = exports.TIMEOUT_ERROR_STATUS = exports.SUCCESS_STATUS = exports.SERVER_ERROR_STATUS = exports.REDIRECT_STATUS = exports.PERMISSION_ERROR_STATUS = exports.INFORMATION_STATUS = exports.CLIENT_ERROR_STATUS = exports.STATUS = void 0;
const client_1 = __importDefault(require("./client"));
exports.CLIENT_ERROR_STATUS = client_1.default;
const information_1 = __importDefault(require("./information"));
exports.INFORMATION_STATUS = information_1.default;
const permission_1 = __importDefault(require("./permission"));
exports.PERMISSION_ERROR_STATUS = permission_1.default;
const redirect_1 = __importDefault(require("./redirect"));
exports.REDIRECT_STATUS = redirect_1.default;
const server_1 = __importDefault(require("./server"));
exports.SERVER_ERROR_STATUS = server_1.default;
const success_1 = __importDefault(require("./success"));
exports.SUCCESS_STATUS = success_1.default;
const timeout_1 = __importDefault(require("./timeout"));
exports.TIMEOUT_ERROR_STATUS = timeout_1.default;
exports.STATUS = [
    ...client_1.default,
    ...information_1.default,
    ...permission_1.default,
    ...redirect_1.default,
    ...server_1.default,
    ...success_1.default,
    ...timeout_1.default,
];
exports.STATUS_FIGURE = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
    75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
    93, 94, 95, 96, 97, 98, 99,
];
