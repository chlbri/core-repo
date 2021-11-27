import { literal, union } from 'zod';

export const stateSchemaCRUD = union([
  literal('idle'),
  literal('pending'),
  literal('checking'),
  literal('information'),
  literal('success'),
  literal('redirect'),
  literal('client'),
  literal('server'),
  literal('permission'),
  literal('timeout'),
]);

export const actionSchemaCRUD = union([
  literal('increment'),
  literal('assign'),
]);

export const statesCommonSchemaCRUD = union([
  literal('empty_db'),
  literal('empty_ids'),
  literal('empty_filters'),
  literal('options_limit'),
  literal('check_options_limit'),
  literal('no_options_limit'),
  literal('limit_reached'),
  literal('filters_limit'),
]);
