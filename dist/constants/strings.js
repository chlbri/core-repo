"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIONS = exports.STATES = void 0;
const functions_1 = require("../functions");
const machines_1 = require("../schemas/strings/machines");
exports.STATES = (0, functions_1.getLiteralValues)(machines_1.stateSchema);
exports.ACTIONS = (0, functions_1.getLiteralValues)(machines_1.actionsSchema);
