"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.machineConfigSchema = exports.stateConfigSchema = exports.alwaysSchema = exports.transitionSchema = exports.valueMapSchema = exports.actionFunctionSchema = exports.propertyAssignerSchema = exports.assignFunctionSchema = exports.condSchema = exports.singleOrArrayObjectSchema = exports.singleOrArraySchema = void 0;
const z = __importStar(require("zod"));
const _1 = require(".");
const functions_1 = require("../functions");
function singleOrArraySchema(schema) {
    return z.union([schema, z.array(schema)]);
}
exports.singleOrArraySchema = singleOrArraySchema;
function singleOrArrayObjectSchema(schema) {
    return z.union([schema, z.array(schema)]);
}
exports.singleOrArrayObjectSchema = singleOrArrayObjectSchema;
// #region Conditions
function condSchema(context, event) {
    return z.function().args(context, event).returns(z.boolean());
}
exports.condSchema = condSchema;
// #endregion
// #region Assigners
function assignFunctionSchema(context, event) {
    const partial = context.partial();
    return z
        .function()
        .args(context, event)
        .returns(partial).optional();
}
exports.assignFunctionSchema = assignFunctionSchema;
function propertyAssignerSchema(context, event) {
    const preprocesseds = (0, functions_1.convertObjectToArrayMask)(context);
    const processed = preprocesseds
        .map(processed => ({
        [processed]: z
            .function()
            .args(context, event)
            .returns(context.shape[processed]),
    }))
        .reduce((acc, curr) => {
        Object.assign(acc, curr);
        return acc;
    }, {});
    const out = z.object(processed).partial();
    return out;
}
exports.propertyAssignerSchema = propertyAssignerSchema;
// #endregion
function actionFunctionSchema(context, event) {
    return z
        .function()
        .args(context, event)
        .returns(z.void()).optional();
}
exports.actionFunctionSchema = actionFunctionSchema;
exports.valueMapSchema = z.lazy(() => z.record(exports.valueMapSchema));
function transitionSchema(context, event) {
    return z.object({
        cond: singleOrArraySchema(condSchema(context, event))
            .or(singleOrArraySchema(z.string()))
            .optional(),
        actions: singleOrArraySchema(propertyAssignerSchema(context, event))
            .or(singleOrArraySchema(z.string()))
            .or(singleOrArraySchema(assignFunctionSchema(context, event)))
            .optional(),
        in: z.union([z.string(), exports.valueMapSchema]).optional(),
        target: singleOrArraySchema(z.string()).optional(),
        internal: z.boolean().optional(),
        meta: z.record(z.any()).optional(),
        description: z.string().optional(),
    });
}
exports.transitionSchema = transitionSchema;
const test3 = transitionSchema(z.object({ data: z.number() }), z.string());
const test6 = assignFunctionSchema(z.object({ data: z.number() }), z.string());
test3; //?
test3.shape.actions;
const _test3 = {
    cond: () => true,
    actions: (ctx, ev) => ({ data: 3, fdfdf: '' }),
};
const test5 = z.object({ data: z.number() }).partial();
function alwaysSchema(context, event) {
    return z.union([
        z.object({
            cond: condSchema(context, event),
        }),
        z.string(),
    ]);
}
exports.alwaysSchema = alwaysSchema;
exports.stateConfigSchema = z.object({});
exports.machineConfigSchema = z
    .object({
    states: z
        .record(exports.stateConfigSchema)
        .refine(arg => {
        const check = Object.keys(arg).length > 0;
        return check;
    })
        .refine(arg => {
        const check = Object.keys(arg).some(key => _1.stateSchemaCRUD.safeParse(key).success);
        return check;
    }),
})
    .strict();
