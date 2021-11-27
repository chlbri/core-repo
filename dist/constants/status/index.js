"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMEOUT_ERROR_STATUS = exports.SUCCESS_STATUS = exports.SERVER_ERROR_STATUS = exports.REDIRECT_STATUS = exports.PERMISSION_ERROR_STATUS = exports.INFORMATION_STATUS = exports.CLIENT_ERROR_STATUS = exports.STATUS = void 0;
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
