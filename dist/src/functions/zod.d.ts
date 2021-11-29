import type { TuplifyUnion } from '@core_chlbri/core';
import { ZodLiteral, ZodObject, ZodRawShape, ZodTypeAny, ZodUnion } from 'zod';
import { GetTypeOfUnion } from '../types/zod';
export declare function getLiteralValuesInArray<T extends [ZodLiteral<any>, ...ZodLiteral<any>[]]>(union: ZodUnion<T>): TuplifyUnion<GetTypeOfUnion<T>>;
export declare function getLiteralValuesInObject<T extends [ZodLiteral<any>, ...ZodLiteral<any>[]]>(union: ZodUnion<T>): { [key in GetTypeOfUnion<T>]: Extract<GetTypeOfUnion<T>, key>; };
export declare function getLiteralValues<T extends [ZodLiteral<any>, ...ZodLiteral<any>[]]>(union: ZodUnion<T>): {
    readonly object: { [key in GetTypeOfUnion<T>]: Extract<GetTypeOfUnion<T>, key>; };
    readonly array: TuplifyUnion<GetTypeOfUnion<T>>;
};
export declare function convertUnionStringToMask<T extends [ZodLiteral<string>, ...ZodLiteral<string>[]]>(union: ZodUnion<T>): Record<GetTypeOfUnion<T>, true>;
export declare function convertObjectToArrayMask<T extends ZodRawShape>(obj: ZodObject<T>): TuplifyUnion<keyof T>;
export declare function convertObjectTo<Z extends ZodRawShape, T extends ZodTypeAny = ZodTypeAny>(obj: ZodObject<Z>, to: T): ZodObject<Record<keyof Z, T>, "strip", ZodTypeAny, { [k_1 in keyof import("zod").objectUtil.addQuestionMarks<{ [k in keyof Record<keyof Z, T>]: Record<keyof Z, T>[k]["_output"]; }>]: import("zod").objectUtil.addQuestionMarks<{ [k_2 in keyof Record<keyof Z, T>]: Record<keyof Z, T>[k_2]["_output"]; }>[k_1]; }, { [k_3 in keyof import("zod").objectUtil.addQuestionMarks<{ [k_2 in keyof Record<keyof Z, T>]: Record<keyof Z, T>[k_2]["_input"]; }>]: import("zod").objectUtil.addQuestionMarks<{ [k_2_1 in keyof Record<keyof Z, T>]: Record<keyof Z, T>[k_2_1]["_input"]; }>[k_3]; }>;
export declare function convertObjectToMask<T extends ZodRawShape>(obj: ZodObject<T>): Record<keyof T, true>;
