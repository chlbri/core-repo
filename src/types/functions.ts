// #region Functions

import {
  ClientErrorStatus,
  InformationStatus,
  PermissionErrorStatus,
  RedirectStatus,
  SuccessStatus,
  ServerErrorStatus,
  TimeoutErrorStatus,
} from './status';

export type InformationFunction<T, R> = (
  status: InformationStatus,
  payload?: T,
  messages?: string[],
) => R;

export type InformationGuard<T> = InformationFunction<T, boolean>;

export type SuccessFunction<T, R> = (
  status: SuccessStatus,
  payload: T,
  messages?: string[],
) => R;

export type SuccessGuard<T> = SuccessFunction<T, boolean>;

export type RedirectFunction<T, R> = (
  status: RedirectStatus,
  payload?: T,
  messages?: string[],
) => R;

export type RedirectGuard<T> = RedirectFunction<T, boolean>;

export type ClientErrorFunction<R> = (
  status: ClientErrorStatus,
  messages?: string[],
) => R;

export type ClientErrorGuard = ClientErrorFunction<boolean>;

export type ServerFunction<R> = (
  status: ServerErrorStatus,
  messages?: string[],
) => R;

export type ServerErrorGuard = ServerFunction<boolean>;

export type PermissionErrorFunction<T, R> = (
  status: PermissionErrorStatus,
  payload?: T,
  notPermitteds?: string[],
  messages?: string[],
) => R;

export type PermissionErrorGuard<T> = PermissionErrorFunction<T, boolean>;

export type TimeoutErrorFunction<R> = (status: TimeoutErrorStatus) => R;

export type TimeoutErrorGuard = TimeoutErrorFunction<boolean>;

// #endregion
