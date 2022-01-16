import { Entity } from '../../../entities';
import { Count, WithDeepID } from '../../../types';
export declare function count<E extends Entity = Entity>(db?: WithDeepID<E>[]): Count<E>;
