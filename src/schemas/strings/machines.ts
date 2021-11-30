import { literal, union } from 'zod';

export const stateSchemaCRUD = union([
  literal('idle'),
  literal('information'),
  literal('success'),
  literal('redirect'),
  literal('client'),
  literal('server'),
  literal('permission'),
  literal('timeout'),
]);

export const stateFSchemaCRUD = union([
  literal('information'),
  literal('success'),
  literal('redirect'),
  literal('client'),
  literal('server'),
  literal('permission'),
  literal('timeout'),
]);

export const actionSchemaCRUD = union([
  literal('__increment'),
  literal('__assignRequest'),
  literal('__information'),
  literal('__success'),
  literal('__redirect'),
  literal('__client'),
  literal('__server'),
  literal('__permission'),
  literal('__timeout'),
]);

export const statesCommonSchemaCRUD = union([
  literal('checking'),
  literal('empty_db'),
  literal('empty_ids'),
  literal('empty_by_filters'),
  literal('options_limit'),
  literal('check_options_limit'),
  literal('check_filters_limit'),
  literal('no_options_limit'),
  literal('limit_reached'),
  literal('filters_limit'),
]);

export const errorSchema = union([
  literal('no_machine_states'),
  literal('initial_exists'),
  literal('empty_states'),
  literal('actions_internal'),
  literal('states_internal'),
  literal('no_checking'),
  literal('context_exits'),
]);

export const crudStringSChema = union([
  literal('createMany'),
  literal('createOne'),
  literal('empty_states'),
  literal('actions_internal'),
  literal('states_internal'),
  literal('no_checking'),
  literal('context_exits'),
]);
