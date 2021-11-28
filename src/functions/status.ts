import {
  clientErrorStatusSchema,
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  statusSchema,
  successfullStatusSchema,
  timeoutErrorStatusSchema,
} from '../schemas/status';
import {
  ClientErrorStatus,
  InformationStatus,
  PermissionErrorStatus,
  RedirectStatus,
  ServerErrorStatus,
  SuccessStatus,
  TimeoutErrorStatus,
} from '../types/crud/status';

export function isClientErrorStatus(arg: any): arg is ClientErrorStatus {
  return clientErrorStatusSchema.safeParse(arg.status).success;
}

export function isInformationStatus(arg: any): arg is InformationStatus {
  return informationStatusSchema.safeParse(arg.status).success;
}

export function isPermissionStatus(
  arg: any,
): arg is PermissionErrorStatus {
  return permissionStatusSchema.safeParse(arg.status).success;
}

export function isRedirectStatus(arg: any): arg is RedirectStatus {
  return redirectStatusSchema.safeParse(arg.status).success;
}

export function isServerStatus(arg: any): arg is ServerErrorStatus {
  return serverErrorStatusSchema.safeParse(arg.status).success;
}

export function isSuccessStatus(arg: any): arg is SuccessStatus {
  return successfullStatusSchema.safeParse(arg.status).success;
}

export function isTimeoutStatus(arg: any): arg is TimeoutErrorStatus {
  return timeoutErrorStatusSchema.safeParse(arg.status).success;
}
export function isStatus(arg: any): arg is TimeoutErrorStatus {
  return statusSchema.safeParse(arg.status).success;
}
