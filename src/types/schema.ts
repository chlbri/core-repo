import { ZodLiteral } from 'zod';

export type GetTypeOfUnion<T extends ZodLiteral<any>[]> = T extends [
  ZodLiteral<infer U>,
  ...ZodLiteral<infer U>[]
]
  ? U
  : never;
