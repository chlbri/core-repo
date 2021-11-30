import { STATES_COMMON_CRUD } from './../constants/strings';
import { log, sleep } from '@core_chlbri/core';
import produce from 'immer';
import { createMachine } from 'xstate';
import { ERRORS_STRING, STATES_FINAL } from '../constants/strings';
import { actionSchemaCRUD, stateSchemaCRUD } from '../schemas';
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

  if (!__states) {
    throw ERRORS_STRING.object.no_machine_states;
  }
  const nocheck2 = Object.keys(__states).length < 1;

  if (nocheck2) {
    throw ERRORS_STRING.object.empty_states;
  }

  const nocheck3 = Object.keys(__states).some(
    key => stateSchemaCRUD.safeParse(key).success,
  );

  if (nocheck3) {
    throw ERRORS_STRING.object.states_internal;
  }

  const nocheck4 = !!config.initial;

  if (nocheck4) {
    throw ERRORS_STRING.object.initial_exists;
  }

  const nocheck5 = !!config.context;

  if (nocheck5) {
    throw ERRORS_STRING.object.context_exits;
  }

  const nocheck6 = !__states?.[STATES_COMMON_CRUD.object.checking];

  if (nocheck6) {
    throw ERRORS_STRING.object.no_checking;
  }

  if (options) {
    const __actions = options.actions;
    if (__actions) {
      const nocheck7 = Object.keys(__actions).some(
        key => actionSchemaCRUD.safeParse(key).success,
      );
      if (nocheck7) throw ERRORS_STRING.object.actions_internal;
    }
  }

  const context: TC<C> = {
    iterator: 0,
    response: { status: (500 + status) as Status },
  };

  config; //?

  const _config: MachineArgsCRUD<C, E>['config'] = produce(
    config,
    draft => {
      Object.assign(draft, { initial: 'idle' });
      Object.assign(draft, { context });
      draft.states = {
        idle: {
          on: {
            SEND: {
              actions: '__assignRequest',
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
        Object.assign(draft.actions, {
          ...draft.actions,
          ...generateDefaultActions<C, E>(status),
        });
      } else
        Object.assign(draft, {
          actions: generateDefaultActions<C, E>(status),
        });
    },
  );

  return createMachine(_config, _options);
}
