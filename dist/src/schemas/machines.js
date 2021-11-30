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
exports.optionsSchema = exports.configSChema = void 0;
const strings_1 = require("./../constants/strings");
const z = __importStar(require("zod"));
const strings_2 = require("../constants/strings");
const strings_3 = require("./strings");
// export function actorRefSchema<
//   E extends z.ZodTypeAny,
//   TE extends z.ZodTypeAny,
// >(event: E, emitted: TE) {
//   return z.object({
//     id: z.string(),
//     send: senderSchema(event),
//     getSnapshot: z.function().returns(emitted.optional()),
//     stop: z.function().returns(z.void()),
//     toJSON: z.function().returns(z.any()),
//   });
// }
// export function sendActionSchema<
//   C extends z.ZodTypeAny,
//   E extends z.ZodTypeAny,
//   L extends string,
// >(context: C, event: E, literal?: L) {
//   return z.object({
//     id: z.union([z.string(), z.number()]),
//     delay: z.number().optional(),
//   });
// }
// export function stopActionSchema<
//   C extends z.ZodTypeAny,
//   E extends z.ZodTypeAny,
//   R extends z.ZodTypeAny = z.ZodTypeAny,
// >(context: C, event: E, returns?: R) {
//   return z.object({
//     type: z.literal(actionTypeSchema.enum['xstate.stop']),
//     activity: z.union([
//       z.string(),
//       z.object({ id: z.string() }),
//       exprSchema(context, event, returns),
//     ]),
//   });
// }
// export function cancelActionSchema<
//   C extends z.ZodTypeAny,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   return z.object({
//     exec: actionFunctionSchema(context, event).optional(),
//     sendId: z.union([z.string(), z.number()]),
//   });
// }
// // #endregion
// export function eventSchema<L extends string>(literal: L) {
//   return z.literal(literal);
// }
// export function transitionConfigSchema<
//   C extends z.AnyZodObject,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   return z.object({
//     cond: conditionSchema(context, event),
//     actions: actionSchema(context, event),
//     in: z.union([z.string(), valueMapSchema]).optional(),
//     target: singleOrArraySchema(z.string()).optional(),
//     internal: z.boolean().optional(),
//     meta: z.record(z.any()).optional(),
//     description: z.string().optional(),
//   });
// }
// // #region Type tests
// const test3 = transitionConfigSchema(
//   z.object({ data: z.number() }),
//   z.string(),
// );
// const test6 = assignFunctionSchema(
//   z.object({ data: z.number() }),
//   z.string(),
// );
// test3; //?
// type Test3 = z.infer<typeof test3>;
// type Test3Actions = Test3['actions'];
// test3.shape.actions;
// const _test3: Test3 = {
//   cond: () => true,
//   actions: (ctx, ev) => ({ data: 3, fdfdf: '' }),
// };
// const test5 = z.object({ data: z.number() }).partial();
// type Test5 = z.infer<typeof test5>;
// // #endregion
// export function alwaysSchema<
//   C extends z.AnyZodObject,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   return singleOrArraySchema(transitionConfigSchema(context, event)).or(
//     singleOrArraySchema(z.string()),
//   );
// }
// export const stateTypeSchema = z.union([
//   z.literal('atomic'),
//   z.literal('compound'),
//   z.literal('parallel'),
//   z.literal('final'),
//   z.literal('history'),
// ]);
// export const historySchema = z.union([
//   z.literal('shallow'),
//   z.literal('deep'),
//   z.boolean(),
// ]);
// export function entrySchema<
//   C extends z.AnyZodObject,
//   E extends ZodEventObject,
//   R extends z.ZodTypeAny,
// >(context: C, event: E, returns?: R) {
//   return singleOrArraySchema(
//     z.union([
//       raiseActionSchema(event.shape.type._def.value),
//       sendActionSchema(context, event),
//       logActionSchema(context, event, returns),
//       cancelActionSchema(context, event),
//       stopActionSchema(context, event),
//       chooseActionSchema(context, event),
//       actionFunctionSchema(context, event),
//     ]),
//   );
// }
// export function delaySchema<
//   C extends z.AnyZodObject,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   return z.union([
//     z.record(singleOrArraySchema(transitionConfigSchema(context, event))),
//     z.array(
//       transitionConfigSchema(context, event).and(
//         z.object({
//           delay: z.union([
//             z.number(),
//             z.string(),
//             exprSchema(context, event, z.number()),
//           ]),
//         }),
//       ),
//     ),
//   ]);
// }
// export function doneInvokeSchema<
//   E extends ZodEventObject,
//   D extends z.ZodTypeAny = z.ZodTypeAny,
// >(event: E, data?: D) {
//   return z.object({
//     type: event.shape.type,
//     data: data?.optional() ?? z.any(),
//   });
// }
// export function onDoneConfigSchema<
//   C extends z.AnyZodObject,
//   E extends ZodEventObject,
//   D extends z.ZodTypeAny = z.ZodTypeAny,
// >(context: C, event: E, data?: D) {
//   return z.union([
//     z.string(),
//     singleOrArraySchema(
//       transitionConfigSchema(context, doneInvokeSchema(event, data)),
//     ),
//   ]);
// }
// export function actorContextSchema<
//   E extends z.ZodTypeAny,
//   TE extends z.ZodTypeAny,
// >(event: E, emitted?: TE) {
//   const _emitted = emitted ?? z.any();
//   return z.object({
//     parent: actorRefSchema(z.any(), z.any()).optional(),
//     self: actorRefSchema(event, _emitted),
//     id: z.string(),
//     observers: z.set(observerSchema(_emitted)),
//   });
// }
// export function behaviorSchema<
//   E extends z.ZodTypeAny,
//   TE extends z.ZodTypeAny,
// >(event: E, emitted?: TE) {
//   const _emitted = emitted ?? z.any();
//   return z.object({
//     transition: z
//       .function()
//       .args(_emitted, event, actorContextSchema(event, emitted))
//       .returns(_emitted),
//     initialState: _emitted,
//     start: z
//       .function()
//       .args(actorContextSchema(event, emitted))
//       .returns(_emitted)
//       .optional(),
//   });
// }
// export function invokeCreatorSchema<
//   C extends z.AnyZodObject,
//   E extends ZodEventObject,
//   TF extends z.ZodTypeAny = z.ZodTypeAny,
// >(context: C, event: E, final?: TF) {
//   const _emitted = final ?? z.any();
//   const subscribe = subscribeSchema(event);
//   const behavior = behaviorSchema(event, _emitted);
//   return z.lazy(() =>
//     z
//       .function()
//       .args(context, event)
//       .returns(
//         z.union([
//           //TODO add statemachine
//           z.promise(_emitted),
//           subscribeSchema(event),
//           behaviorSchema(event, _emitted),
//         ]),
//       ),
//   ) as unknown as z.ZodLazy<
//     z.ZodFunction<
//       z.ZodTuple<[C, E]>,
//       z.ZodUnion<[z.ZodPromise<TF>, z.ZodString]>
//     >
//   >;
// }
// export function invokeConfigSchema<
//   C extends z.AnyZodObject,
//   E extends ZodEventObject,
//   D extends z.ZodTypeAny = z.ZodTypeAny,
// >(context: C, event: E, data?: D) {
//   return z.object({
//     id: z.string().optional(),
//     autoForward: z.boolean().optional(),
//     onDone: onDoneConfigSchema(context, event, data).optional(),
//     onError: onDoneConfigSchema(context, event, data).optional(),
//     meta: z.record(z.any()),
//     //TODO add statemachine
//     src: z.union([z.string(), invokeCreatorSchema(context, event)]),
//   });
// }
// export function stateConfigSchema<
//   C extends z.AnyZodObject,
//   E extends ZodEventObject,
//   R extends z.ZodTypeAny,
// >(context: C, event: E, returns?: R) {
//   return z.object({
//     id: z.string().optional(),
//     key: z.string().optional(),
//     initial: z.string(),
//     type: stateTypeSchema.optional(),
//     history: historySchema.optional(),
//     entry: entrySchema(context, event, returns).optional(),
//     exit: entrySchema(context, event, returns).optional(),
//     always: alwaysSchema(context, event).optional(),
//     order: z.number().optional(),
//     tags: singleOrArraySchema(z.string()),
//     description: z.string().optional(),
//     preserveActionOrder: z.boolean().optional(),
//     delimiter: z.string().optional(),
//     delays: delaySchema(context, event),
//     strict: z.boolean().optional(),
//     meta: z.any().optional(),
//     invoke: invokeConfigSchema(context, event),
//   });
// }
// // type Test = z.infer<typeof machineConfigSchema>;
const configSChema = (context, event) => z.object({
    id: z.string().optional(),
    initial: z
        .literal(strings_2.STATE_VALUES_CRUD.object.idle, {
        invalid_type_error: strings_2.ERRORS_STRING.object.initial_exists,
    })
        .optional(),
    states: z
        .record(z.any(), {
        required_error: strings_2.ERRORS_STRING.object.no_machine_states,
    })
        .refine(record => Object.keys(record).length > 0, {
        message: strings_2.ERRORS_STRING.object.empty_states,
    })
        .refine(record => Object.keys(record).some(key => !strings_3.stateSchemaCRUD.safeParse(key).success), { message: strings_2.ERRORS_STRING.object.states_internal })
        .refine(record => Object.keys(record).some(key => key === strings_1.STATES_COMMON_CRUD.object.checking), { message: strings_2.ERRORS_STRING.object.no_checking }),
    context: z
        .object({
        iterator: z.number(),
        response: z.object({
            status: z.custom(),
            payload: context,
            messages: z.array(z.string()).optional(),
            notPermitteds: z.array(z.string()).optional(),
        }),
        request: z
            .object({ type: z.literal('SEND'), data: event })
            .optional(),
    }, {
        invalid_type_error: strings_2.ERRORS_STRING.object.context_exits,
    })
        .optional(),
});
exports.configSChema = configSChema;
exports.optionsSchema = z
    .object({
    actions: z
        .record(z.any())
        .refine(record => Object.keys(record).every(key => !strings_3.actionSchemaCRUD.safeParse(key).success), { message: strings_2.ERRORS_STRING.object.actions_internal }),
})
    .partial();
