import { DefaultActions } from '../types/crud/config';
import { StatusFigure } from '../types/crud/status';
export declare const error: (arg?: string | undefined) => never;
export declare function generateDefaultActions<C = any, E = any>(statusF: StatusFigure): DefaultActions<C, E>;
