import { literal, union } from 'zod';

export const stateSchema = union([
  literal('idle'),
  literal('pending'),
  literal('information'),
  literal('success'),
  literal('redirect'),
  literal('client'),
  literal('server'),
  literal('permission'),
  literal('timeout'),
]);

export const actionsSchema = union([
  literal('increment'),
  literal('assign'),
]);


export const GUARDS = union([
  literal('idle'),
  literal('pending'),
  literal('information'),
  literal('success'),
  literal('redirect'),
  literal('client'),
  literal('server'),
  literal('permission'),
  literal('timeout'),
]);