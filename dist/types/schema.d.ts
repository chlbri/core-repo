import { ZodLiteral } from 'zod';
export declare type GetTypeOfUnion<T extends ZodLiteral<any>[]> = T extends [
    ZodLiteral<infer U>,
    ...ZodLiteral<infer U>[]
] ? U : never;
