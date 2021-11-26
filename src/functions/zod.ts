import type { TuplifyUnion, NExtract } from '@core_chlbri/core';
import { ZodLiteral, ZodUnion } from 'zod';
import { GetTypeOfUnion } from '../types/schema';

export function getLiteralValuesInARray<
  T extends [ZodLiteral<any>, ...ZodLiteral<any>[]],
>(union: ZodUnion<T>) {
  return union.options.map(un => un._def.value) as unknown as TuplifyUnion<
    GetTypeOfUnion<T>
  >;
}

export function getLiteralValuesInObject<
  T extends [ZodLiteral<any>, ...ZodLiteral<any>[]],
>(union: ZodUnion<T>) {
  return union.options
    .map(un => un._def.value)
    .reduce((acc, curr) => {
      acc[curr] = curr;
      return acc;
    }, {} as any) as {
    [key in GetTypeOfUnion<T>]: NExtract<GetTypeOfUnion<T>, key>;
  };
}

export function getLiteralValues<
  T extends [ZodLiteral<any>, ...ZodLiteral<any>[]],
>(union: ZodUnion<T>) {
  return {
    object: getLiteralValuesInObject(union),
    array: getLiteralValuesInARray(union),
  } as const;
}
