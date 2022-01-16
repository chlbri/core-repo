import { AnyZodObject, ZodLiteral, ZodObject, ZodOptional, ZodTypeAny } from 'zod';
export declare type GetTypeOfUnion<T extends ZodLiteral<any>[]> = T extends [
    ZodLiteral<infer U>,
    ...ZodLiteral<infer U>[]
] ? U : never;
export declare type GetShape<T extends AnyZodObject> = T extends ZodObject<{
    [key in infer K]: ZodTypeAny;
}> ? {
    [key in K]: T['shape'][key];
} : never;
export declare type Partialize<T extends AnyZodObject> = ZodObject<{
    [key in keyof GetShape<T>]: ZodOptional<GetShape<T>[key]>;
}>;
