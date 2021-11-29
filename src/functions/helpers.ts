/* eslint-disable @typescript-eslint/no-unused-vars */

import { assign } from '@xstate/immer';
import { ACTIONS_CRUD } from '../constants/strings';
import { DefaultActions } from '../types/crud/config';
import {
  InformationStatus,
  RedirectStatus,
  StatusFigure,
  SuccessStatus,
  ClientErrorStatus,
  PermissionErrorStatus,
  ServerErrorStatus,
  TimeoutErrorStatus,
} from '../types/crud/status';
import { isStatus } from './status';

export const error = (arg?: string): never => {
  throw new Error(arg);
};

export function generateDefaultActions<C = any, E = any>(
  statusF: StatusFigure,
): DefaultActions<C, E> {
  return {
    [ACTIONS_CRUD.object.__increment]: assign(({ iterator }) => {
      iterator++;
    }),
    [ACTIONS_CRUD.object.__assignRequest]: assign(
      ({ request }, { data }) => {
        if (data) request = data as any;
      },
    ),
    [ACTIONS_CRUD.object.__information]: assign(
      ({ response: { status } }) => {
        status = (100 + statusF) as InformationStatus;
      },
    ),
    [ACTIONS_CRUD.object.__success]: assign(({ response: { status } }) => {
      status = (200 + statusF) as SuccessStatus;
    }),
    [ACTIONS_CRUD.object.__redirect]: assign(
      ({ response: { status } }) => {
        status = (300 + statusF) as RedirectStatus;
      },
    ),
    [ACTIONS_CRUD.object.__client]: assign(({ response: { status } }) => {
      status = (400 + statusF) as ClientErrorStatus;
    }),
    [ACTIONS_CRUD.object.__server]: assign(({ response: { status } }) => {
      status = (500 + statusF) as ServerErrorStatus;
    }),
    [ACTIONS_CRUD.object.__permission]: assign(
      ({ response: { status } }) => {
        status = (600 + statusF) as PermissionErrorStatus;
      },
    ),
    [ACTIONS_CRUD.object.__timeout]: assign(({ response: { status } }) => {
      status = (900 + statusF) as TimeoutErrorStatus;
    }),
  };
}
