import { ClientErrorStatus, InformationStatus, PermissionErrorStatus, RedirectStatus, ServerErrorStatus, SuccessStatus, TimeoutErrorStatus } from '../types/crud/status';
export declare function isClientErrorStatus(arg: any): arg is ClientErrorStatus;
export declare function isInformationStatus(arg: any): arg is InformationStatus;
export declare function isPermissionStatus(arg: any): arg is PermissionErrorStatus;
export declare function isRedirectStatus(arg: any): arg is RedirectStatus;
export declare function isServerStatus(arg: any): arg is ServerErrorStatus;
export declare function isSuccessStatus(arg: any): arg is SuccessStatus;
export declare function isTimeoutStatus(arg: any): arg is TimeoutErrorStatus;
export declare function isStatus(arg: any): arg is TimeoutErrorStatus;
