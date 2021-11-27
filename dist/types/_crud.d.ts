import type { DeepPartial, NExtract, NOmit, StringKeys } from 'core';
import { CLIENT_ERROR_STATUS, INFORMATION_STATUS, PERMISSION_ERROR_STATUS, RD, REDIRECT_STATUS, SERVER_ERROR_STATUS, STATUS, SUCCESS_STATUS, TIMEOUT_ERROR_STATUS } from 'core-promises';
import { InvokeMeta, StateMachine } from 'xstate';
import { TypeOf } from 'zod';
import { Entity, WithId, WithoutId, WithoutTimeStamps } from '../entities';
import { stateSchema } from '../schemas/strings/machines';
import type { DSO } from './dso';
export declare type PRD<T> = Promise<RD<T, Status>>;
export declare type Projection<T> = {
    [key in StringKeys<T>]: boolean | 0 | 1;
};
export declare type DP<T> = DeepPartial<T>;
export declare type WI<T> = WithId<DP<T>>;
export declare type WO<T> = WithoutId<DP<T>>;
export declare type WT<T> = WithoutTimeStamps<T>;
export declare type PRDI<T> = PRD<WI<T>>;
export declare type PRDIM<T> = PRD<WI<T>[]>;
export declare type ErrorHandler = (error?: any) => never;
export declare type QueryOptions = {
    limit?: number;
    errorHandler?: ErrorHandler;
    after?: string;
    before?: string;
};
export declare type ClientErrorStatus = typeof CLIENT_ERROR_STATUS[number];
export declare type InformationStatus = typeof INFORMATION_STATUS[number];
export declare type PermissionErrorStatus = typeof PERMISSION_ERROR_STATUS[number];
export declare type RedirectStatus = typeof REDIRECT_STATUS[number];
export declare type ServerErrorStatus = typeof SERVER_ERROR_STATUS[number];
export declare type SuccessStatus = typeof SUCCESS_STATUS[number];
export declare type TimeoutErrorStatus = typeof TIMEOUT_ERROR_STATUS[number];
export declare type Status = typeof STATUS[number];
export declare type TC<E> = {
    iterator: number;
    status: Status;
    payload?: DeepPartial<E>;
    messages?: string[];
    notPermitteds?: string[];
};
export declare type States = TypeOf<typeof stateSchema>;
export declare type TE<E> = {
    type: 'SEND';
    data: E;
};
export declare type PromiseService<C = any, E = any, TF = any> = (context: TC<C>, event: TE<E>, meta: InvokeMeta) => PromiseLike<NOmit<TC<TF>, 'iterator'>>;
export declare type StateCRUDArgs<C = any, E = any, TF = any> = {
    src: PromiseService<C, E, TF>;
    id?: string;
    status?: Status;
};
export declare type AbsoluteUdefiny<T extends Record<string, any>> = {
    [key in keyof T]: undefined;
};
export declare type ObjectStatus<S extends Status> = {
    status: S;
};
export declare type TT<E> = {
    value: NExtract<States, 'information'>;
    context: TC<E> & ObjectStatus<InformationStatus> & AbsoluteUdefiny<Pick<TC<E>, 'notPermitteds'>>;
} | {
    value: NExtract<TypeOf<typeof stateSchema>, 'success'>;
    context: TC<E> & ObjectStatus<SuccessStatus> & Required<Pick<TC<E>, 'payload'>> & AbsoluteUdefiny<Pick<TC<E>, 'notPermitteds' | 'messages'>>;
} | {
    value: NExtract<TypeOf<typeof stateSchema>, 'redirect'>;
    context: TC<E> & ObjectStatus<RedirectStatus> & AbsoluteUdefiny<Pick<TC<E>, 'notPermitteds'>>;
} | {
    value: NExtract<TypeOf<typeof stateSchema>, 'client'>;
    context: TC<E> & ObjectStatus<ClientErrorStatus> & AbsoluteUdefiny<Pick<TC<E>, 'payload' | 'notPermitteds'>>;
} | {
    value: NExtract<TypeOf<typeof stateSchema>, 'server'>;
    context: TC<E> & ObjectStatus<ServerErrorStatus> & AbsoluteUdefiny<Pick<TC<E>, 'payload' | 'notPermitteds'>>;
} | {
    value: NExtract<TypeOf<typeof stateSchema>, 'permission'>;
    context: TC<E> & ObjectStatus<PermissionErrorStatus>;
} | {
    value: NExtract<TypeOf<typeof stateSchema>, 'timeout'>;
    context: TC<E> & ObjectStatus<InformationStatus> & AbsoluteUdefiny<Pick<TC<E>, 'notPermitteds' | 'messages' | 'payload'>>;
};
export declare type StateCRUD<C, E = Record<string, unknown>> = StateMachine<TC<C>, any, TE<E>, TT<C>>;
export declare type CreateMany<E = any> = StateCRUD<string[], {
    data: WT<WO<E>>[];
    options?: QueryOptions;
}>;
export declare type CreateOne<E = any> = StateCRUD<string, {
    data: WT<WO<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type UpsertOne<E = any> = StateCRUD<string, {
    _id?: string;
    data: WT<WO<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type UpsertMany<E = any> = StateCRUD<string[], {
    upserts: {
        _id?: string;
        data: WO<E>;
    }[];
    options?: QueryOptions;
}>;
export declare type ReadAll<E = any> = StateCRUD<WI<E>[], {
    options?: QueryOptions;
}>;
export declare type ReadMany<E = any> = StateCRUD<WI<E>[], {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type ReadManyByIds<E = any> = StateCRUD<WI<E>[], {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
}>;
export declare type ReadOne<E = any> = StateCRUD<WI<E>, {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type ReadOneById<E = any> = StateCRUD<WI<E>, {
    _id: string;
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type CountAll = StateCRUD<number>;
export declare type Count<E = any> = StateCRUD<number, {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type UpdateAll<E = any> = StateCRUD<string[], {
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type UpdateMany<E = any> = StateCRUD<string[], {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type UpdateManyByIds<E = any> = StateCRUD<string[], {
    ids: string[];
    filters?: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type UpdateOne<E = any> = StateCRUD<string, {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type UpdateOneById<E = any> = StateCRUD<string[], {
    id: string;
    filters?: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type SetAll<E = any> = StateCRUD<string[], {
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type SetMany<E = any> = StateCRUD<string[], {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type SetManyByIds<E = any> = StateCRUD<string[], {
    ids: string[];
    filters?: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type SetOne<E = any> = StateCRUD<string, {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type SetOneById<E = any> = StateCRUD<string[], {
    id: string;
    filters?: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type DeleteAll = StateCRUD<string[], {
    options?: QueryOptions;
}>;
export declare type DeleteMany<E = any> = StateCRUD<string[], {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type DeleteManyByIds<E = any> = StateCRUD<string[], {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
}>;
export declare type DeleteOne<E = any> = StateCRUD<string, {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type DeleteOneById<E = any> = StateCRUD<string[], {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type RemoveAll = StateCRUD<string[], {
    options?: QueryOptions;
}>;
export declare type RemoveMany<E = any> = StateCRUD<string[], {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type RemoveManyByIds<E = any> = StateCRUD<string[], {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
}>;
export declare type RemoveOne<E = any> = StateCRUD<string, {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type RemoveOneById<E = any> = StateCRUD<string[], {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type RetrieveAll = StateCRUD<string[], {
    options?: QueryOptions;
}>;
export declare type RetrieveMany<E = any> = StateCRUD<string[], {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type RetrieveManyByIds<E = any> = StateCRUD<string[], {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
}>;
export declare type RetrieveOne<E = any> = StateCRUD<string, {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type RetrieveOneById<E = any> = StateCRUD<string[], {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export interface CRUD<E extends Entity> {
    createMany: CreateMany<E>;
    createOne: CreateOne<E>;
    upsertOne: UpsertOne<E>;
    upsertMany: UpsertMany<E>;
    readAll: ReadAll<E>;
    readMany: ReadMany<E>;
    readManyByIds: ReadManyByIds<E>;
    readOne: ReadOne<E>;
    readOneById: ReadOneById<E>;
    countAll: CountAll;
    count: Count<E>;
    updateAll: UpdateAll<E>;
    updateMany: UpdateMany<E>;
    updateManyByIds: UpdateManyByIds<E>;
    updateOne: UpdateOne<E>;
    updateOneById: UpdateOneById<E>;
    setAll: SetAll<E>;
    setMany: SetMany<E>;
    setManyByIds: SetManyByIds<E>;
    setOne: SetOne<E>;
    setOneById: SetOneById<E>;
    deleteAll: DeleteAll;
    deleteMany: DeleteMany<E>;
    deleteManyByIds: DeleteManyByIds<E>;
    deleteOne: DeleteOne<E>;
    deleteOneById: DeleteOneById<E>;
    retrieveAll: RetrieveAll;
    retrieveMany: RetrieveMany<E>;
    retrieveManyByIds: RetrieveManyByIds<E>;
    retrieveOne: RetrieveOne<E>;
    retrieveOneById: RetrieveOneById<E>;
    removeAll: RemoveAll;
    removeMany: RemoveMany<E>;
    removeManyByIds: RemoveManyByIds<E>;
    removeOne: RemoveOne<E>;
    removeOneById: RemoveOneById<E>;
}
