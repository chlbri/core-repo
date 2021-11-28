import produce from 'immer';
import { createMachine } from 'xstate';
import { actionSchemaCRUD, stateFSchemaCRUD } from '..';
import { ERRORS_STRING, STATES_FINAL } from '../constants/strings';
import {
  MachineArgsCRUD,
  MachineConfigCRUD,
  StateMachineCRUD,
} from '../types/crud/config';
import { DEFAULT_ACTIONS } from './helpers';

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
    key => stateFSchemaCRUD.safeParse(key).success,
  );

  if (nocheck3) {
    throw ERRORS_STRING.object.states_internal;
  }
  const _config: MachineArgsCRUD<C, E>['config'] = produce(
    config,
    draft => {
      if (draft.states) {
        Object.assign(draft.states, STATES_FINAL);
      }
    },
  );

  if (options) {
    const __actions = options.actions;
    if (__actions) {
      const nocheck4 = Object.keys(__actions).some(
        key => actionSchemaCRUD.safeParse(key).success,
      );
      if (nocheck4) throw ERRORS_STRING.object.actions_internal;
    }
  }

  const _options: MachineArgsCRUD<C, E>['options'] = produce(
    options,
    draft => {
      if (draft?.actions) {
        Object.assign(draft.actions, DEFAULT_ACTIONS);
      }
    },
  );

  return createMachine(_config, _options);
}
