import type { DeepPartial, NExclude, NExtract, NFunction, NOmit, StringKeys } from '@core_chlbri/core';
import { ClientErrorStatus, InformationStatus, PermissionErrorStatus, RedirectStatus, ServerErrorStatus, Status, SuccessStatus, TimeoutErrorStatus } from 'core-promises';
import { Behavior, EventObject, InvokeCallback, InvokeMeta, StateMachine, Subscribable } from 'xstate';
import { TypeOf } from 'zod';
import { ACTIONS_CRUD } from '../constants/strings';
import { Entity, WithId, WithoutId, WithoutTimeStamps } from '../entities';
import { stateSchemaCRUD, statesCommonSchemaCRUD } from '../schemas/strings/machines';
import type { DSO } from './dso';
import { ClientErrorGuard, InformationGuard, PermissionErrorGuard, RedirectGuard, ServerErrorGuard, SuccessGuard, TimeoutErrorGuard } from './functions';
export declare type Projection<T> = {
    [key in StringKeys<T>]: boolean | 0 | 1;
};
export declare type DP<T> = DeepPartial<T>;
export declare type WI<T> = WithId<DP<T>>;
export declare type WithoutDeepID<T> = WithoutId<DP<T>>;
export declare type WT<T> = WithoutTimeStamps<T>;
export declare type ErrorHandler = (error?: any) => never;
export declare type QueryOptions = {
    limit?: number;
    errorHandler?: ErrorHandler;
    after?: string;
    before?: string;
};
export declare type REqResp<C, E = any> = {
    response: C;
    request: E;
};
export declare type FlatRD<T> = {
    status: Status;
    payload?: DeepPartial<T>;
    messages?: string[];
    notPermitteds?: string[];
};
export declare type TC<C = any, E = any> = {
    iterator: number;
} & REqResp<FlatRD<C>, DeepPartial<E>>;
export declare type States = TypeOf<typeof stateSchemaCRUD>;
export declare type TE<E> = {
    type: 'SEND';
    data: E;
};
export declare type TT<C = any, E = any> = {
    value: NExtract<States, 'information'>;
    context: TC<C, E> & REqResp<UndefinyFields<FlatRD<C>, 'notPermitteds'> & {
        status: InformationStatus;
    }, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'success'>;
    context: TC<C, E> & REqResp<RequiredFields<UndefinyFields<FlatRD<C>, 'notPermitteds'> & {
        status: SuccessStatus;
    }, 'payload'>, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'redirect'>;
    context: TC<C, E> & REqResp<UndefinyFields<FlatRD<C>, 'notPermitteds'> & {
        status: RedirectStatus;
    }, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'client'>;
    context: TC<C, E> & REqResp<UndefinyFields<FlatRD<C>, 'notPermitteds' | 'payload'> & {
        status: ClientErrorStatus;
    }, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'server'>;
    context: TC<C, E> & REqResp<UndefinyFields<FlatRD<C>, 'notPermitteds' | 'payload'> & {
        status: ServerErrorStatus;
    }, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'permission'>;
    context: TC<C, E> & REqResp<FlatRD<C> & {
        status: PermissionErrorStatus;
    }, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'timeout'>;
    context: TC<C, E> & REqResp<UndefinyFields<FlatRD<C>, 'notPermitteds' | 'payload' | 'messages'> & {
        status: TimeoutErrorStatus;
    }, E>;
};
export declare type ServiceReturn<R = any> = NOmit<TC<R>, 'iterator'>;
export declare type SR<R = any> = ServiceReturn<R>;
export declare type StateValueCRUD = TypeOf<typeof stateSchemaCRUD>;
export declare type StateCommonCRUD = TypeOf<typeof statesCommonSchemaCRUD>;
export declare type StateValueCRUDF = NExclude<StateValueCRUD, 'idle' | 'pending' | 'checking'>;
export declare type StateMachineCRUD<C = any, E = any> = StateMachine<TC<C, E>, any, TE<E>, TT<C, E>>;
export declare type FinalStates = Record<StateValueCRUDF, {
    entry: [
        typeof ACTIONS_CRUD.object.__increment,
        typeof ACTIONS_CRUD.object.assign
    ];
    type: 'final';
}>;
export declare type NExtractSV<S extends StateValueCRUDF> = NExtract<StateValueCRUDF, S>;
export declare type GuardF<S extends StateValueCRUDF, F extends NFunction> = {
    [key in S]: F;
};
export declare type Guards<T> = GuardF<'information', InformationGuard<T>> & GuardF<'success', SuccessGuard<T>> & GuardF<'redirect', RedirectGuard<T>> & GuardF<'client', ClientErrorGuard> & GuardF<'server', ServerErrorGuard> & GuardF<'permission', PermissionErrorGuard<T>> & GuardF<'timeout', TimeoutErrorGuard>;
export declare type ServiceCRUD<C = any, E = any> = (context: TC<C>, event: TE<E>, meta: InvokeMeta) => Promise<SR<C>> | StateMachine<SR<C>, any, any> | Subscribable<EventObject> | InvokeCallback<TE<E>, TE<E>> | Behavior<any>;
export declare type StateCRUDArgs<C = any, E = any> = {
    src: ServiceCRUD<C, E>;
    id?: string;
    status?: Status;
};
export declare type AbsoluteUdefiny<T extends Record<string, any>> = {
    [key in keyof T]: undefined;
};
export declare type ObjectStatus<S extends Status> = {
    status: S;
};
export declare type RequiredFields<T, K extends keyof T> = NOmit<T, K> & Required<Pick<T, K>>;
export declare type UndefinyFields<T, K extends keyof T> = NOmit<T, K> & Partial<Record<K, undefined>>;
export declare type NeveryFields<T, K extends keyof T> = NOmit<T, K> & Record<K, never>;
export declare type PartialFields<T, K extends keyof T> = NOmit<T, K> & Partial<Pick<T, K>>;
export declare type DeepOmit<T, K extends string> = T extends Record<string, infer U> ? U extends Record<string, any> ? DeepOmit<U, K> : Omit<T, K> : never;
export declare type TypeState = 'atomic' | 'compound' | 'parallel' | 'final' | 'history';
export declare type CreateMany<E = any> = StateMachineCRUD<string[], {
    data: WT<WithoutDeepID<E>>[];
    options?: QueryOptions;
}>;
export declare type CreateOne<E = any> = StateMachineCRUD<string, {
    data: WT<WithoutDeepID<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type UpsertOne<E = any> = StateMachineCRUD<string, {
    _id?: string;
    data: WT<WithoutDeepID<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type UpsertMany<E = any> = StateMachineCRUD<string[], {
    upserts: {
        _id?: string;
        data: WithoutDeepID<E>;
    }[];
    options?: QueryOptions;
}>;
export declare type ReadAll<E = any> = StateMachineCRUD<WI<E>[], {
    options?: QueryOptions;
}>;
export declare type ReadMany<E = any> = StateMachineCRUD<WI<E>[], {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type ReadManyByIds<E = any> = StateMachineCRUD<WI<E>[], {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
}>;
export declare type ReadOne<E = any> = StateMachineCRUD<WI<E>, {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type ReadOneById<E = any> = StateMachineCRUD<WI<E>, {
    _id: string;
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type CountAll = StateMachineCRUD<number>;
export declare type Count<E = any> = StateMachineCRUD<number, {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type UpdateAll<E = any> = StateMachineCRUD<string[], {
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type UpdateMany<E = any> = StateMachineCRUD<string[], {
    filters: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type UpdateManyByIds<E = any> = StateMachineCRUD<string[], {
    ids: string[];
    filters?: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type UpdateOne<E = any> = StateMachineCRUD<string, {
    filters: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type UpdateOneById<E = any> = StateMachineCRUD<string[], {
    id: string;
    filters?: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type SetAll<E = any> = StateMachineCRUD<string[], {
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type SetMany<E = any> = StateMachineCRUD<string[], {
    filters: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type SetManyByIds<E = any> = StateMachineCRUD<string[], {
    ids: string[];
    filters?: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
}>;
export declare type SetOne<E = any> = StateMachineCRUD<string, {
    filters: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type SetOneById<E = any> = StateMachineCRUD<string[], {
    id: string;
    filters?: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type DeleteAll = StateMachineCRUD<string[], {
    options?: QueryOptions;
}>;
export declare type DeleteMany<E = any> = StateMachineCRUD<string[], {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type DeleteManyByIds<E = any> = StateMachineCRUD<string[], {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
}>;
export declare type DeleteOne<E = any> = StateMachineCRUD<string, {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type DeleteOneById<E = any> = StateMachineCRUD<string[], {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type RemoveAll = StateMachineCRUD<string[], {
    options?: QueryOptions;
}>;
export declare type RemoveMany<E = any> = StateMachineCRUD<string[], {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type RemoveManyByIds<E = any> = StateMachineCRUD<string[], {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
}>;
export declare type RemoveOne<E = any> = StateMachineCRUD<string, {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type RemoveOneById<E = any> = StateMachineCRUD<string[], {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type RetrieveAll = StateMachineCRUD<string[], {
    options?: QueryOptions;
}>;
export declare type RetrieveMany<E = any> = StateMachineCRUD<string[], {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type RetrieveManyByIds<E = any> = StateMachineCRUD<string[], {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
}>;
export declare type RetrieveOne<E = any> = StateMachineCRUD<string, {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type RetrieveOneById<E = any> = StateMachineCRUD<string[], {
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
