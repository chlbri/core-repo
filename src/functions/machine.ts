import { log } from '@core_chlbri/core';
import produce from 'immer';
import { createMachine } from 'xstate';
import {
  ACTIONS_CRUD,
  ERRORS_STRING,
  STATES_FINAL,
  STATE_CHECKING,
  STATE_VALUES_CRUD,
} from '../constants/strings';
import { configSChema, optionsSchema } from '../schemas/machines';
import { actionSchemaCRUD, stateSchemaCRUD } from '../schemas/strings';
import { Status } from '../types/crud';
import {
  MachineArgsCRUD,
  StateMachineCRUD,
  TC,
} from '../types/crud/config';
import { generateDefaultActions } from './helpers';

export function createCRUDMachine<C = any, E = any>({
  config,
  options,
  status,
}: MachineArgsCRUD<C, E>): StateMachineCRUD<C, E> {
  const __states = config.states;
  log('config', config);
  log('states', __states);
  log('status', status);
  const context: TC<C> = {
    iterator: 0,
    response: { status: (500 + status) as Status },
  };

  config; //?

  const _config: MachineArgsCRUD<C, E>['config'] = produce(
    config,
    draft => {
      Object.assign(draft, { initial: STATE_VALUES_CRUD.object.idle });
      Object.assign(draft, { context });
      draft.states = {
        idle: {
          on: {
            SEND: {
              actions: ['__assignRequest'],
              target: 'checking',
            },
          },
        },
      };

      Object.assign(draft.states, __states);
      Object.assign(draft.states, STATES_FINAL);
    },
  );

  const _options: MachineArgsCRUD<C, E>['options'] = produce(
    options,
    draft => {
      if (draft?.actions) {
        Object.assign(draft.actions, generateDefaultActions<C, E>(status));
      }
    },
  );

  return createMachine(_config, _options);
}
