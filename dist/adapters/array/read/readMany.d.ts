import { Entity } from '../../../entities';
import { ReadMany, WithDeepID } from '../../../types';
export declare function readMany<E extends Entity = Entity>(db?: WithDeepID<E>[]): ReadMany<E>;
