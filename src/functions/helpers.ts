/* eslint-disable @typescript-eslint/no-unused-vars */

import { assign } from '@xstate/immer';
import { ACTIONS_CRUD } from '../constants/strings';
import { DefaultActions } from '../types/crud/config';
import { isStatus } from './status';

export const error = (arg?: string): never => {
  throw new Error(arg);
};

export function generateDefaultActions<C = any, E = any>(): DefaultActions<
  C,
  E
> {
  return {
    [ACTIONS_CRUD.object.__increment]: assign(({ iterator }) => {
      iterator++;
    }),
    [ACTIONS_CRUD.object.__assignRequest]: assign(
      ({ request }, { data }) => {
        if (data) request = data as any;
      },
    ),
  };
}
