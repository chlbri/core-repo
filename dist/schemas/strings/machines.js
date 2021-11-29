"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statesCommonSchemaCRUD = exports.actionSchemaCRUD = exports.stateFSchemaCRUD = exports.stateSchemaCRUD = void 0;
const zod_1 = require("zod");
exports.stateSchemaCRUD = (0, zod_1.union)([
    (0, zod_1.literal)('idle'),
    (0, zod_1.literal)('information'),
    (0, zod_1.literal)('success'),
    (0, zod_1.literal)('redirect'),
    (0, zod_1.literal)('client'),
    (0, zod_1.literal)('server'),
    (0, zod_1.literal)('permission'),
    (0, zod_1.literal)('timeout'),
]);
exports.stateFSchemaCRUD = (0, zod_1.union)([
    (0, zod_1.literal)('information'),
    (0, zod_1.literal)('success'),
    (0, zod_1.literal)('redirect'),
    (0, zod_1.literal)('client'),
    (0, zod_1.literal)('server'),
    (0, zod_1.literal)('permission'),
    (0, zod_1.literal)('timeout'),
]);
exports.actionSchemaCRUD = (0, zod_1.union)([
    (0, zod_1.literal)('__increment'),
    (0, zod_1.literal)('__assignRequest'),
]);
exports.statesCommonSchemaCRUD = (0, zod_1.union)([
    (0, zod_1.literal)('empty_db'),
    (0, zod_1.literal)('empty_ids'),
    (0, zod_1.literal)('empty_filters'),
    (0, zod_1.literal)('options_limit'),
    (0, zod_1.literal)('check_options_limit'),
    (0, zod_1.literal)('no_options_limit'),
    (0, zod_1.literal)('limit_reached'),
    (0, zod_1.literal)('filters_limit'),
]);
