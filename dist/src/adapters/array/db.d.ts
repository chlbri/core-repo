import { CollectionPermissions, Entity } from '../../entities';
import { CreateMany, ReadAll, WithoutDeepID } from '../../types/crud';
export declare class ArrayCRUD_DB<E extends Entity> {
    private _db;
    private permissions;
    constructor(_db: WithoutDeepID<E>[], permissions: CollectionPermissions);
    __update: (payload: string[], update: WithoutDeepID<E>) => void;
    rinitDB(): void;
    get length(): number;
    isEmpty(): boolean;
    createMany: CreateMany<E>;
    readAll: ReadAll<E>;
}
