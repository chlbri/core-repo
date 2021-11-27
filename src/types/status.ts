import { CLIENT_ERROR_STATUS, INFORMATION_STATUS, PERMISSION_ERROR_STATUS, REDIRECT_STATUS, SERVER_ERROR_STATUS, SUCCESS_STATUS, TIMEOUT_ERROR_STATUS, STATUS } from '../constants/status';

// #region Status
export type ClientErrorStatus = typeof CLIENT_ERROR_STATUS[number];

export type InformationStatus = typeof INFORMATION_STATUS[number];

export type PermissionErrorStatus = typeof PERMISSION_ERROR_STATUS[number];

export type RedirectStatus = typeof REDIRECT_STATUS[number];

export type ServerErrorStatus = typeof SERVER_ERROR_STATUS[number];

export type SuccessStatus = typeof SUCCESS_STATUS[number];

export type TimeoutErrorStatus = typeof TIMEOUT_ERROR_STATUS[number];

export type Status = typeof STATUS[number];
// #endregion
