"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorSchema = void 0;
const zod_1 = require("zod");
exports.errorSchema = (0, zod_1.union)([
    (0, zod_1.literal)('no_machine_states'),
    (0, zod_1.literal)('initial'),
    (0, zod_1.literal)('empty_states'),
    (0, zod_1.literal)('actions_internal'),
    (0, zod_1.literal)('states_internal'),
    (0, zod_1.literal)('no_checking'),
    (0, zod_1.literal)('context_exits'),
]);
