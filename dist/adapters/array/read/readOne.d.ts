import { Entity } from '../../../entities';
import { ReadOne, WithDeepID } from '../../../types';
export declare function readOne<E extends Entity = Entity>(db?: WithDeepID<E>[]): ReadOne<E>;
