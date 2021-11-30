import { Entity } from '../../entities';
import { CreateMany, ReadAll, WithoutDeepID } from '../../types/crud';
export declare class ArrayCRUD_DB<E extends Entity> {
    private _db;
    private permissions?;
    constructor(_db: WithoutDeepID<E>[], permissions?: {
        __read: string[];
        __write: string[];
        __remove: string[];
        __create: string[];
    } | undefined);
    __update: (payload: string[], update: WithoutDeepID<E>) => void;
    rinitDB(): void;
    get length(): number;
    isEmpty(): boolean;
    createMany: CreateMany<E>;
    readAll: ReadAll<E>;
}
export declare function readAll<E extends Entity = Entity>(): ReadAll<E>;
