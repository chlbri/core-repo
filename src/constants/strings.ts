import { getLiteralValues } from '../functions';
import {
  actionSchemaCRUD,
  errorSchema,
  stateFSchemaCRUD,
  stateSchemaCRUD,
  statesCommonSchemaCRUD,
} from './../schemas/strings/machines';

export const xstate = 'xstate' as const;

const type = 'final' as const;

export const STATE_VALUES_CRUD = getLiteralValues(stateSchemaCRUD);

export const STATESF_CRUD = getLiteralValues(stateFSchemaCRUD);

export const ACTIONS_CRUD = getLiteralValues(actionSchemaCRUD);

export const STATES_FINAL = {
  information: {
    entry: [
      ACTIONS_CRUD.object.__information,
      ACTIONS_CRUD.object.__increment,
    ],
    type,
  },
  success: {
    entry: [
      ACTIONS_CRUD.object.__success,
      ACTIONS_CRUD.object.__increment,
    ],
    type,
  },
  redirect: {
    entry: [
      ACTIONS_CRUD.object.__redirect,
      ACTIONS_CRUD.object.__increment,
    ],
    type,
  },
  client: {
    entry: [ACTIONS_CRUD.object.__client, ACTIONS_CRUD.object.__increment],
    type,
  },
  server: {
    entry: [ACTIONS_CRUD.object.__server, ACTIONS_CRUD.object.__increment],
    type,
  },
  permission: {
    entry: [
      ACTIONS_CRUD.object.__permission,
      ACTIONS_CRUD.object.__increment,
    ],
    type,
  },
  timeout: {
    entry: [
      ACTIONS_CRUD.object.__timeout,
      ACTIONS_CRUD.object.__increment,
    ],
    type,
  },
} as const;

export const STATES_COMMON_CRUD = getLiteralValues(statesCommonSchemaCRUD);

export const ERRORS_STRING = getLiteralValues(errorSchema);
