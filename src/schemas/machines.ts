import * as z from 'zod';
import { ERRORS_STRING, STATE_CHECKING } from '../constants/strings';
import { actionSchemaCRUD, stateSchemaCRUD } from './strings';
// import { Behavior, StateValueMap, Subscribable } from 'xstate';
// import * as z from 'zod';
// import { ZodFunction } from 'zod';
// import { stateSchemaCRUD } from '.';
// import { xstate } from '../constants/strings';
// import { convertObjectTo, convertObjectToArrayMask } from '../functions';
// import { GetShape, Partialize } from '../types/zod';

// export const actionTypeSchema = z.enum([
//   `${xstate}.start`,
//   `${xstate}.stop`,
//   `${xstate}.raise`,
//   `${xstate}.send`,
//   `${xstate}.cancel`,
//   '',
//   `${xstate}.assign`,
//   `${xstate}.after`,
//   'done.state',
//   'done.invoke',
//   `${xstate}.log`,
//   `${xstate}.init`,
//   `${xstate}.invoke`,
//   'log',
//   'init',
//   'invoke',
//   `${xstate}.error`,
//   `${xstate}.update`,
//   `${xstate}.pure`,
//   `${xstate}.choose`,
// ]);

// export const valueMapSchema: z.ZodSchema<StateValueMap> = z.lazy(() =>
//   z.record(valueMapSchema),
// );

// export function singleOrArraySchema<S extends z.ZodTypeAny>(schema: S) {
//   return z.union([schema, z.array(schema)]);
// }

// export function singleOrArrayObjectSchema<S extends z.ZodRawShape>(
//   schema: z.ZodObject<S>,
// ) {
//   return z.union([schema, z.array(schema)]);
// }

// export function observerSchema<T extends z.ZodTypeAny>(value: T) {
//   return z.object({
//     next: z.function().args(value).returns(z.void()),
//     error: z.function().args(z.any()).returns(z.void()).optional(),
//     complete: z.function().returns(z.void()).optional(),
//   }) as unknown as z.ZodObject<{
//     next: z.ZodFunction<z.ZodTuple<[T]>, z.ZodVoid>;
//     error: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodAny]>, z.ZodVoid>>;
//     complete: z.ZodOptional<z.ZodFunction<z.ZodTuple<[]>, z.ZodVoid>>;
//   }>;
// }

// export const subscriptionSchema = z.function().returns(z.void());

// export function subscribeSchema<T extends z.ZodTypeAny>(value: T) {
//   const observer = observerSchema(value);
//   return z.union([
//     z
//       .function()
//       .args(
//         observer.shape.next,
//         observer.shape.error,
//         observer.shape.complete,
//       )
//       .returns(subscriptionSchema),
//     z.function().args(observer).returns(subscriptionSchema),
//   ]);
// }

// // #region Conditions

// export function condFunctionSchema<
//   C extends z.ZodTypeAny,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   return z.function().args(context, event).returns(z.boolean());
// }

// export function conditionSchema<
//   C extends z.ZodTypeAny,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   return singleOrArraySchema(condFunctionSchema(context, event))
//     .or(singleOrArraySchema(z.string()))
//     .optional();
// }

// // #endregion

// // #region Actions

// // #region Assigners

// export function assignFunctionSchema<
//   C extends z.AnyZodObject,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   const partial = context.partial();
//   return (
//     z
//       .function()
//       .args(context, event)
//       .returns(partial) as unknown as z.ZodFunction<
//       z.ZodTuple<[C, E]>,
//       Partialize<C>
//     >
//   ).optional();
// }

// export function propertyAssignerSchema<
//   C extends z.AnyZodObject,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   const preprocesseds = convertObjectToArrayMask<GetShape<C>>(
//     context as any,
//   );
//   const processed = (preprocesseds as string[])
//     .map(processed => ({
//       [processed]: z
//         .function()
//         .args(context, event)
//         .returns(context.shape[processed]),
//     }))
//     .reduce((acc, curr) => {
//       Object.assign(acc, curr);
//       return acc;
//     }, {}) as unknown as {
//     [key in keyof GetShape<C>]: z.ZodFunction<
//       z.ZodTuple<[C, E]>,
//       GetShape<C>[key]
//     >;
//   };

//   const out = z.object(processed).partial();
//   return out;
// }

// // #endregion

// export function actionFunctionSchema<
//   C extends z.ZodTypeAny,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   return (
//     z
//       .function()
//       .args(context, event)
//       .returns(z.void()) as unknown as z.ZodFunction<
//       z.ZodTuple<[C, E]>,
//       z.ZodVoid
//     >
//   ).optional();
// }

// export function actionSchema<
//   C extends z.AnyZodObject,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   return singleOrArraySchema(propertyAssignerSchema(context, event))
//     .or(singleOrArraySchema(z.string()))
//     .or(singleOrArraySchema(assignFunctionSchema(context, event)))
//     .or(singleOrArraySchema(actionFunctionSchema(context, event)))
//     .optional();
// }

// export function chooseActionSchema<
//   C extends z.ZodTypeAny,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   return z.object({
//     cond: z
//       .union([z.string(), condFunctionSchema(context, event)])
//       .optional(),
//     actions: singleOrArraySchema(
//       z.union([z.string(), actionFunctionSchema(context, event)]),
//     ),
//   });
// }

// export function raiseActionSchema<L extends string>(literal: L) {
//   return z.object({
//     type: z.literal(actionTypeSchema.enum['xstate.raise']),
//     event: eventSchema(literal),
//   });
// }

// export function assignObjectSchema<
//   C extends z.AnyZodObject,
//   E extends z.ZodTypeAny,
// >(context: C, event: E) {
//   return z.object({
//     type: z.literal(actionTypeSchema.enum['xstate.assign']),
//     assignement: z.union([
//       assignFunctionSchema(context, event),
//       propertyAssignerSchema(context, event),
//     ]),
//   });
// }

// export function exprSchema<
//   C extends z.ZodTypeAny,
//   E extends z.ZodTypeAny,
//   R extends z.ZodTypeAny = z.ZodTypeAny,
// >(context: C, event: E, returns?: R) {
//   return z
//     .function()
//     .args(context, event)
//     .returns(returns ?? z.any());
// }

// export function logActionSchema<
//   C extends z.ZodTypeAny,
//   E extends z.ZodTypeAny,
//   R extends z.ZodTypeAny = z.ZodTypeAny,
// >(context: C, event: E, returns?: R) {
//   return z.object({
//     label: z.string().optional(),
//     expr: z.union([z.string(), exprSchema(context, event, returns)]),
//   });
// }

// export function senderSchema<E extends z.ZodTypeAny>(event: E) {
//   return z.function().args(event).returns(z.void());
// }

// type ZodEventObject = z.ZodObject<{ type: z.ZodLiteral<string> }>;

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

export const configSChema = z.object({
  initial: z
    .undefined({
      invalid_type_error: ERRORS_STRING.object.initial,
    })
    .optional(),
  states: z
    .record(z.any(), {
      required_error: ERRORS_STRING.object.no_machine_states,
    })
    .refine(record => Object.keys(record).length > 0, {
      message: ERRORS_STRING.object.empty_states,
    })
    .refine(
      record =>
        Object.keys(record).some(
          key => !stateSchemaCRUD.safeParse(key).success,
        ),
      { message: ERRORS_STRING.object.states_internal },
    )
    .refine(
      record => Object.keys(record).some(key => key === STATE_CHECKING),
      { message: ERRORS_STRING.object.no_checking },
    ),
  context: z
    .undefined({
      invalid_type_error: ERRORS_STRING.object.context_exits,
    })
    .optional(),
});

export const optionsSchema = z
  .object({
    actions: z
      .record(z.any())
      .refine(
        record =>
          Object.keys(record).every(
            key => !actionSchemaCRUD.safeParse(key).success,
          ),
        { message: ERRORS_STRING.object.actions_internal },
      ),
  })
  .partial();
