import { StateValueMap } from 'xstate';
import * as z from 'zod';
import { stateSchemaCRUD } from '.';
import { convertObjectTo, convertObjectToArrayMask } from '../functions';
import { GetShape, Partialize } from '../types/zod';

export function singleOrArraySchema<S extends z.ZodTypeAny>(schema: S) {
  return z.union([schema, z.array(schema)]);
}

export function singleOrArrayObjectSchema<S extends z.ZodRawShape>(
  schema: z.ZodObject<S>,
) {
  return z.union([schema, z.array(schema)]);
}

// #region Conditions

export function condSchema<C extends z.ZodTypeAny, E extends z.ZodTypeAny>(
  context: C,
  event: E,
) {
  return z.function().args(context, event).returns(z.boolean());
}

// #endregion

// #region Assigners

export function assignFunctionSchema<
  C extends z.AnyZodObject,
  E extends z.ZodTypeAny,
>(context: C, event: E) {
  const partial = context.partial();
  return (
    z
      .function()
      .args(context, event)
      .returns(partial) as unknown as z.ZodFunction<
      z.ZodTuple<[C, E]>,
      Partialize<C>
    >
  ).optional();
}

export function propertyAssignerSchema<
  C extends z.AnyZodObject,
  E extends z.ZodTypeAny,
>(context: C, event: E) {
  const preprocesseds = convertObjectToArrayMask<GetShape<C>>(
    context as any,
  );
  const processed = (preprocesseds as string[])
    .map(processed => ({
      [processed]: z
        .function()
        .args(context, event)
        .returns(context.shape[processed]),
    }))
    .reduce((acc, curr) => {
      Object.assign(acc, curr);
      return acc;
    }, {}) as unknown as {
    [key in keyof GetShape<C>]: z.ZodFunction<
      z.ZodTuple<[C, E]>,
      GetShape<C>[key]
    >;
  };

  const out = z.object(processed).partial();
  return out;
}

// #endregion

export function actionFunctionSchema<
  C extends z.ZodTypeAny,
  E extends z.ZodTypeAny,
>(context: C, event: E) {
  return (
    z
      .function()
      .args(context, event)
      .returns(z.void()) as unknown as z.ZodFunction<
      z.ZodTuple<[C, E]>,
      z.ZodVoid
    >
  ).optional();
}

export const valueMapSchema: z.ZodSchema<StateValueMap> = z.lazy(() =>
  z.record(valueMapSchema),
);

export function transitionSchema<
  C extends z.AnyZodObject,
  E extends z.ZodTypeAny,
>(context: C, event: E) {
  return z.object({
    cond: singleOrArraySchema(condSchema(context, event))
      .or(singleOrArraySchema(z.string()))
      .optional(),
    actions: singleOrArraySchema(propertyAssignerSchema(context, event))
      .or(singleOrArraySchema(z.string()))
      .or(singleOrArraySchema(assignFunctionSchema(context, event)))
      .optional(),
    in: z.union([z.string(), valueMapSchema]).optional(),
    target: singleOrArraySchema(z.string()).optional(),
    internal: z.boolean().optional(),
    meta: z.record(z.any()).optional(),
    description: z.string().optional(),
  });
}

const test3 = transitionSchema(z.object({ data: z.number() }), z.string());
const test6 = assignFunctionSchema(
  z.object({ data: z.number() }),
  z.string(),
);

test3; //?
type Test3 = z.infer<typeof test3>;
type Test3Actions = Test3['actions'];
test3.shape.actions;
const _test3: Test3 = {
  cond: () => true,
  actions: (ctx, ev) => ({ data: 3, fdfdf: '' }),
};

const test5 = z.object({ data: z.number() }).partial();
type Test5 = z.infer<typeof test5>;

export function alwaysSchema<
  C extends z.ZodTypeAny,
  E extends z.ZodTypeAny,
>(context: C, event: E) {
  return z.union([
    z.object({
      cond: condSchema(context, event),
    }),
    z.string(),
  ]);
}

export const stateConfigSchema = z.object({});

export const machineConfigSchema = z
  .object({
    states: z
      .record(stateConfigSchema)
      .refine(arg => {
        const check = Object.keys(arg).length > 0;
        return check;
      })
      .refine(arg => {
        const check = Object.keys(arg).some(
          key => stateSchemaCRUD.safeParse(key).success,
        );
        return check;
      }),
  })
  .strict();

type Test = z.infer<typeof machineConfigSchema>;
