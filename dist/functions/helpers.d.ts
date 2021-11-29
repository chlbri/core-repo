import { DefaultActions } from '../types/crud/config';
export declare const error: (arg?: string | undefined) => never;
export declare function generateDefaultActions<C = any, E = any>(): DefaultActions<C, E>;
