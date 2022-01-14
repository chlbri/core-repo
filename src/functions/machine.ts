import { log } from '@core_chlbri/core';
import produce from 'immer';
import { createMachine } from 'xstate';
import * as z from 'zod';
import { STATES_FINAL } from '../constants/strings';
import { configSchema, optionsSchema } from '../schemas/machines';
import { Status } from '../types/crud';
import { MachineArgsCRUD, StateMachineCRUD } from '../types/crud/config';
import {
  ACTIONS_CRUD,
  STATES_COMMON_CRUD,
  STATE_VALUES_CRUD,
} from './../constants/strings';
import { generateDefaultActions } from './helpers';

export function createCRUDMachine<C = any, E = any>({
  config,
  options,
  status,
}: MachineArgsCRUD<C, E>): StateMachineCRUD<C, E> {
  const __states = config.states;

  // if (!__states) {
  //   throw ERRORS_STRING.object.no_machine_states;
  // }
  // const nocheck2 = Object.keys(__states).length < 1;

  // if (nocheck2) {
  //   throw ERRORS_STRING.object.empty_states;
  // }

  // const nocheck3 = Object.keys(__states).some(
  //   key => stateSchemaCRUD.safeParse(key).success,
  // );

  // if (nocheck3) {
  //   throw ERRORS_STRING.object.states_internal;
  // }

  // const nocheck4 = !!config.initial;

  // if (nocheck4) {
  //   throw ERRORS_STRING.object.initial_exists;
  // }

  // const nocheck5 = !!config.context;

  // if (nocheck5) {
  //   throw ERRORS_STRING.object.context_exits;
  // }

  // const nocheck6 = !__states?.[STATES_COMMON_CRUD.object.checking];

  // if (nocheck6) {
  //   throw ERRORS_STRING.object.no_checking;
  // }

  // if (options) {
  //   const __actions = options.actions;
  //   if (__actions) {
  //     const nocheck7 = Object.keys(__actions).some(
  //       key => actionSchemaCRUD.safeParse(key).success,
  //     );
  //     if (nocheck7) throw ERRORS_STRING.object.actions_internal;
  //   }
  // }

  const _config = configSchema.parse(config);

  _config.initial = STATE_VALUES_CRUD.object.idle;

  _config.states = {
    [STATE_VALUES_CRUD.object.idle]: {
      on: {
        SEND: {
          actions: ACTIONS_CRUD.object.__assignRequest,
          target: STATES_COMMON_CRUD.object.checking,
        },
      },
    },
    ...__states,
  };
  Object.assign(_config.states, STATES_FINAL);

  _config.context = {
    iterator: 0,
    response: { status: (500 + status) as Status },
  };

  const _options: MachineArgsCRUD<C, E>['options'] = produce(
    optionsSchema.parse(options),
    draft => {
      if (!draft) return;
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

  log('id', _config.id);
  [].forEach

  return createMachine(_config, {
    ..._options,
    actions: generateDefaultActions<C, E>(status),
  });
}
