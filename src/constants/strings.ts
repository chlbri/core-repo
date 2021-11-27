import { NExclude } from '@core_chlbri/core';
import { getLiteralValues } from '../functions';
import {
  actionSchemaCRUD,
  stateSchemaCRUD,
  statesCommonSchemaCRUD,
} from '../schemas/strings/machines';
import { FinalStates } from '../types/_crud';

export const STATES_CRUD = getLiteralValues(stateSchemaCRUD);

export const ACTIONS_CRUD = getLiteralValues(actionSchemaCRUD);

function writeFinalState<S extends string>(str: S) {
  return {
    [str]: {
      entry: ACTIONS_CRUD.object.increment,
      type: 'final',
    },
  } as const;
}

export const STATES_FINAL = STATES_CRUD.array
  .filter(state => state !== 'idle' && state !== 'pending')
  .map(writeFinalState)
  .reduce((acc, curr) => {
    Object.assign(acc, curr);
    return acc;
  }, {}) as FinalStates;

export const STATES_COMMON_CRUD = getLiteralValues(statesCommonSchemaCRUD);
