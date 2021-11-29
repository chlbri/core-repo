import { getLiteralValues } from '../functions';
import { errorSchema } from '../schemas/strings/error';
import {
  actionSchemaCRUD,
  stateFSchemaCRUD,
  stateSchemaCRUD,
  statesCommonSchemaCRUD,
} from '../schemas/strings/machines';
import { FinalStates } from '../types/crud/config';

export const xstate = 'xstate' as const;

export const STATE_VALUES_CRUD = getLiteralValues(stateSchemaCRUD);

export const STATESF_CRUD = getLiteralValues(stateFSchemaCRUD);

export const ACTIONS_CRUD = getLiteralValues(actionSchemaCRUD);

export const STATE_CHECKING = 'checking' as const;

function writeFinalState<S extends string>(str: S) {
  return {
    [str]: {
      entry: [ACTIONS_CRUD.object.__increment],
      type: 'final',
    },
  } as const;
}

export const STATES_FINAL = {
  [STATESF_CRUD.object.information]: {
    entry: [
      ACTIONS_CRUD.object.__information,
      ACTIONS_CRUD.object.__increment,
    ],
    type: 'final',
  },
  [STATESF_CRUD.object.success]: {
    entry: [
      ACTIONS_CRUD.object.__success,
      ACTIONS_CRUD.object.__increment,
    ],
    type: 'final',
  },
  [STATESF_CRUD.object.redirect]: {
    entry: [
      ACTIONS_CRUD.object.__redirect,
      ACTIONS_CRUD.object.__increment,
    ],
    type: 'final',
  },
  [STATESF_CRUD.object.client]: {
    entry: [ACTIONS_CRUD.object.__client, ACTIONS_CRUD.object.__increment],
    type: 'final',
  },
  [STATESF_CRUD.object.server]: {
    entry: [ACTIONS_CRUD.object.__server, ACTIONS_CRUD.object.__increment],
    type: 'final',
  },
  [STATESF_CRUD.object.permission]: {
    entry: [
      ACTIONS_CRUD.object.__permission,
      ACTIONS_CRUD.object.__increment,
    ],
    type: 'final',
  },
  [STATESF_CRUD.object.timeout]: {
    entry: [
      ACTIONS_CRUD.object.__timeout,
      ACTIONS_CRUD.object.__increment,
    ],
    type: 'final',
  },
} as const;

export const STATES_COMMON_CRUD = getLiteralValues(statesCommonSchemaCRUD); //?

export const ERRORS_STRING = getLiteralValues(errorSchema);


const D = {
  [STATES_COMMON_CRUD.object.checking]:'3'
}