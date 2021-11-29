import { number, union } from 'zod';

export const informationStatusSchema = number().int().gte(100).lte(199);
export const successfullStatusSchema = number().int().gte(200).lte(299);
export const redirectStatusSchema = number().int().gte(300).lte(399);
export const clientErrorStatusSchema = number().int().gte(400).lte(499);
export const serverErrorStatusSchema = number().int().gte(500).lte(599);
export const permissionStatusSchema = number().int().gte(600).lte(699);
export const timeoutErrorStatusSchema = number().int().gte(900).lte(999);

export const statusSchema = union([
  informationStatusSchema,
  successfullStatusSchema,
  redirectStatusSchema,
  clientErrorStatusSchema,
  serverErrorStatusSchema,
  permissionStatusSchema,
  timeoutErrorStatusSchema,
]);

export const statusFigureSchema = number().int().gte(0).lte(99);
