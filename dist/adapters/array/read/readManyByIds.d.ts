import { Entity } from '../../../entities';
import { ReadManyByIds, WithDeepID } from '../../../types';
export declare function readManyByIds<E extends Entity = Entity>(db?: WithDeepID<E>[]): ReadManyByIds<E>;
