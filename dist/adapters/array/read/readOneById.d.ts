import { Entity } from '../../../entities';
import { ReadOneById, WithDeepID } from '../../../types';
export declare function readOneById<E extends Entity = Entity>(db?: WithDeepID<E>[]): ReadOneById<E>;
