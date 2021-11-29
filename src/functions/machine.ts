import produce from 'immer';
import { createMachine } from 'xstate';
import { actionSchemaCRUD, stateSchemaCRUD } from '..';
import {
  ERRORS_STRING,
  STATES_FINAL,
  STATE_VALUES_CRUD,
} from '../constants/strings';
import {
  MachineArgsCRUD,
  StateMachineCRUD,
  TC,
} from '../types/crud/config';
import { generateDefaultActions } from './helpers';

export function createCRUDMachine<C = any, E = any>({
  config,
  options,
}: MachineArgsCRUD<C, E>): StateMachineCRUD<C, E> {
  const __states = config.states;
  if (!__states) {
    throw ERRORS_STRING.object.empty_states;
  }
  const nocheck2 = Object.keys(__states).length < 1;

  if (nocheck2) {
    throw ERRORS_STRING.object.no_machine_states;
  }

  const nocheck3 = Object.keys(__states).some(
    key => stateSchemaCRUD.safeParse(key).success,
  );

  if (nocheck3) {
    throw ERRORS_STRING.object.states_internal;
  }

  const nocheck4 = !!config.context;

  if (nocheck4) {
    throw ERRORS_STRING.object.context_exits;
  }

  if (options) {
    const __actions = options.actions;
    if (__actions) {
      const nocheck5 = Object.keys(__actions).some(
        key => actionSchemaCRUD.safeParse(key).success,
      );
      if (nocheck5) throw ERRORS_STRING.object.actions_internal;
    }
  }

  const context: TC<C, E> = {
    iterator: 0,
    response: { status: 404 },
  };

  const _config: MachineArgsCRUD<C, E>['config'] = produce(
    config,
    draft => {
      draft.initial = STATE_VALUES_CRUD.object.idle;
      if (draft) {
        draft.context = context as any;
        draft.states = { [STATE_VALUES_CRUD.object.idle]: {} };
        Object.assign(draft.states, __states);
        Object.assign(draft.states, STATES_FINAL);
      }
    },
  );

  const _options: MachineArgsCRUD<C, E>['options'] = produce(
    options,
    draft => {
      if (draft) {
        Object.assign(draft.actions, generateDefaultActions<C, E>());
      }
    },
  );

  return createMachine(_config, _options);
}
