import type { TuplifyUnion } from '@core_chlbri/core';
import { ZodLiteral, ZodUnion } from 'zod';
import { GetTypeOfUnion } from '../types/schema';
export declare function getLiteralValuesInARray<T extends [ZodLiteral<any>, ...ZodLiteral<any>[]]>(union: ZodUnion<T>): TuplifyUnion<GetTypeOfUnion<T>>;
export declare function getLiteralValuesInObject<T extends [ZodLiteral<any>, ...ZodLiteral<any>[]]>(union: ZodUnion<T>): { [key in GetTypeOfUnion<T>]: Extract<GetTypeOfUnion<T>, key>; };
export declare function getLiteralValues<T extends [ZodLiteral<any>, ...ZodLiteral<any>[]]>(union: ZodUnion<T>): {
    readonly object: { [key in GetTypeOfUnion<T>]: Extract<GetTypeOfUnion<T>, key>; };
    readonly array: TuplifyUnion<GetTypeOfUnion<T>>;
};
