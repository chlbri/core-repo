import { literal, union } from 'zod';

export const errorSchema = union([
  literal('no_machine_states'),
  literal('initial'),
  literal('empty_states'),
  literal('actions_internal'),
  literal('states_internal'),
  literal('no_checking'),
  literal('context_exits'),
]);
