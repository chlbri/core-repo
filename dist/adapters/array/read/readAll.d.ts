import { Entity } from '../../../entities';
import { ReadAll, WithDeepID } from '../../../types';
export declare function readAll<E extends Entity = Entity>(db?: WithDeepID<E>[]): ReadAll<E>;
