/* eslint-disable @typescript-eslint/no-unused-vars */

import { assign } from '@xstate/immer';
import { DefaultActions } from '../types/crud/config';
import {
  ClientErrorStatus,
  InformationStatus,
  PermissionErrorStatus,
  RedirectStatus,
  ServerErrorStatus,
  StatusFigure,
  SuccessStatus,
  TimeoutErrorStatus,
} from '../types/crud/status';

export const error = (arg?: string): never => {
  throw new Error(arg);
};

export function generateDefaultActions<C = any, E = any>(
  statusF: StatusFigure,
): DefaultActions<C, E> {
  return {
    __increment: assign(({ iterator }) => {
      iterator++;
    }),
    __assignRequest: assign(({ request }, { data }) => {
      if (data) request = data as any;
    }),
    __information: assign(({ response: { status } }) => {
      status = (100 + statusF) as InformationStatus;
    }),
    __success: assign(({ response: { status } }) => {
      status = (200 + statusF) as SuccessStatus;
    }),
    __redirect: assign(({ response: { status } }) => {
      status = (300 + statusF) as RedirectStatus;
    }),
    __client: assign(({ response: { status } }) => {
      status = (400 + statusF) as ClientErrorStatus;
    }),
    __server: assign(({ response: { status } }) => {
      status = (500 + statusF) as ServerErrorStatus;
    }),
    __permission: assign(({ response: { status } }) => {
      status = (600 + statusF) as PermissionErrorStatus;
    }),
    __timeout: assign(({ response: { status } }) => {
      status = (900 + statusF) as TimeoutErrorStatus;
    }),
  };
}
