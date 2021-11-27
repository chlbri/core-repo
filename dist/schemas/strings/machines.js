"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUARDS = exports.actionsSchema = exports.stateSchema = void 0;
const zod_1 = require("zod");
exports.stateSchema = (0, zod_1.union)([
    (0, zod_1.literal)('idle'),
    (0, zod_1.literal)('pending'),
    (0, zod_1.literal)('information'),
    (0, zod_1.literal)('success'),
    (0, zod_1.literal)('redirect'),
    (0, zod_1.literal)('client'),
    (0, zod_1.literal)('server'),
    (0, zod_1.literal)('permission'),
    (0, zod_1.literal)('timeout'),
]);
exports.actionsSchema = (0, zod_1.union)([
    (0, zod_1.literal)('increment'),
    (0, zod_1.literal)('assign'),
]);
exports.GUARDS = (0, zod_1.union)([
    (0, zod_1.literal)('idle'),
    (0, zod_1.literal)('pending'),
    (0, zod_1.literal)('information'),
    (0, zod_1.literal)('success'),
    (0, zod_1.literal)('redirect'),
    (0, zod_1.literal)('client'),
    (0, zod_1.literal)('server'),
    (0, zod_1.literal)('permission'),
    (0, zod_1.literal)('timeout'),
]);
