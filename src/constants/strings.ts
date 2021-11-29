import { getLiteralValues } from '../functions';
import { errorSchema } from '../schemas/strings/error';
import {
  actionSchemaCRUD,
  stateFSchemaCRUD,
  stateSchemaCRUD,
  statesCommonSchemaCRUD,
} from '../schemas/strings/machines';
import { FinalStates } from '../types/crud/config';

export const STATE_VALUES_CRUD = getLiteralValues(stateSchemaCRUD);

export const STATESF_CRUD = getLiteralValues(stateFSchemaCRUD);

export const ACTIONS_CRUD = getLiteralValues(actionSchemaCRUD);

function writeFinalState<S extends string>(str: S) {
  return {
    [str]: {
      entry: [
        ACTIONS_CRUD.object.__increment,
        ACTIONS_CRUD.object.__assignRequest,
      ],
      type: 'final',
    },
  } as const;
}

export const STATES_FINAL = STATESF_CRUD.array
  .map(writeFinalState)
  .reduce((acc, curr) => {
    Object.assign(acc, curr);
    return acc;
  }, {}) as FinalStates;

export const STATES_COMMON_CRUD = getLiteralValues(statesCommonSchemaCRUD);

export const ERRORS_STRING = getLiteralValues(errorSchema);
