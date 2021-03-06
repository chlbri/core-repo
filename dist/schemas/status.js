"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusFigureSchema = exports.statusSchema = exports.timeoutErrorStatusSchema = exports.permissionStatusSchema = exports.serverErrorStatusSchema = exports.clientErrorStatusSchema = exports.redirectStatusSchema = exports.successfullStatusSchema = exports.informationStatusSchema = void 0;
const zod_1 = require("zod");
exports.informationStatusSchema = (0, zod_1.number)().int().gte(100).lte(199);
exports.successfullStatusSchema = (0, zod_1.number)().int().gte(200).lte(299);
exports.redirectStatusSchema = (0, zod_1.number)().int().gte(300).lte(399);
exports.clientErrorStatusSchema = (0, zod_1.number)().int().gte(400).lte(499);
exports.serverErrorStatusSchema = (0, zod_1.number)().int().gte(500).lte(599);
exports.permissionStatusSchema = (0, zod_1.number)().int().gte(600).lte(699);
exports.timeoutErrorStatusSchema = (0, zod_1.number)().int().gte(900).lte(999);
exports.statusSchema = (0, zod_1.union)([
    exports.informationStatusSchema,
    exports.successfullStatusSchema,
    exports.redirectStatusSchema,
    exports.clientErrorStatusSchema,
    exports.serverErrorStatusSchema,
    exports.permissionStatusSchema,
    exports.timeoutErrorStatusSchema,
]);
exports.statusFigureSchema = (0, zod_1.number)().int().gte(0).lte(99);
