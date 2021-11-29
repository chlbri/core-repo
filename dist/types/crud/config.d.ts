import { DeepPartial, NExtract, NOmit, StringKeys } from '@core_chlbri/core';
import { ActionFunction, AssignAction, MachineConfig, MachineOptions, StateMachine } from 'xstate';
import { TypeOf } from 'zod/lib/types';
import { ACTIONS_CRUD } from '../../constants/strings';
import { WithId, WithoutId } from '../../entities';
import { statesCommonSchemaCRUD } from '../../schemas/strings';
import { actionSchemaCRUD, stateFSchemaCRUD, stateSchemaCRUD } from './../../schemas/strings/machines';
import { InformationStatus, Status } from './status';
export declare type Projection<T> = {
    [key in StringKeys<T>]: boolean | 0 | 1;
};
export declare type ErrorHandler = (error?: any) => never;
export declare type QueryOptions = {
    limit?: number;
    errorHandler?: ErrorHandler;
    after?: string;
    before?: string;
};
export declare type DP<T> = DeepPartial<T>;
export declare type WithDeepID<T> = WithId<DP<T>>;
export declare type WithoutDeepID<T> = WithoutId<DP<T>>;
export declare type Response<T> = {
    status: Status;
    payload?: DeepPartial<T>;
    messages?: string[];
    notPermitteds?: string[];
};
export declare type ReqRes<C = any, E = any> = {
    response: Response<C>;
    request?: DeepPartial<E>;
};
export declare type TC<C = any, E = any> = {
    iterator: number;
} & ReqRes<C, E>;
export declare type States = TypeOf<typeof stateSchemaCRUD>;
export declare type TE<E> = {
    type: 'SEND';
    data?: E;
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
export declare type TT<C = any, E = any> = {
    value: NExtract<States, 'information'>;
    context: TC<C, E> & UndefinyFields<Response<C>, 'notPermitteds'> & {
        status: InformationStatus;
    };
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'success'>;
    context: TC<C, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'redirect'>;
    context: TC<C, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'client'>;
    context: TC<C, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'server'>;
    context: TC<C, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'permission'>;
    context: TC<C, E>;
} | {
    value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'timeout'>;
    context: TC<C, E>;
};
export declare type SingleOrArray<T> = T[] | T;
export declare type StateValueCRUD = TypeOf<typeof stateSchemaCRUD>;
export declare type DefaultActionValueCRUD = TypeOf<typeof actionSchemaCRUD>;
export declare type StateCommonCRUD = TypeOf<typeof statesCommonSchemaCRUD>;
export declare type StateValueCRUDF = TypeOf<typeof stateFSchemaCRUD>;
export declare type ActionFunctionCRUD<C = any, E = any> = ActionFunction<TC<C>, TE<E>>;
export declare type DefaultActions<C = any, E = any> = Record<DefaultActionValueCRUD, AssignAction<TC<C, E>, TE<E>>>;
export declare type MachineConfigCRUD<C = any, E = any> = MachineConfig<TC<C, E>, any, TE<E>>;
export declare type MachineOptionsCRUD<C = any, E = any> = Partial<MachineOptions<TC<C>, TE<E>>>;
export declare type MachineArgsCRUD<C = any, E = any> = {
    config: MachineConfigCRUD<C, E>;
    options?: MachineOptionsCRUD<C, E>;
};
export declare type Config = {
    config: {
        key?: string;
        initial?: Exclude<string, StateValueCRUDF>;
        type?: 'atomic' | 'compound' | 'parallel' | 'final' | 'history';
        history?: 'shallow' | 'deep' | boolean | undefined;
        invoke: SingleOrArray<{
            id?: string;
            autoForward?: boolean;
        }>;
        states: Record<Exclude<string, StateValueCRUDF>, any>;
    };
};
export declare type StateMachineCRUD<C = any, E = any> = StateMachine<TC<C, E>, any, TE<E>, TT<C>>;
export declare type FinalStates = Record<StateValueCRUDF, {
    entry: [
        typeof ACTIONS_CRUD.object.__increment,
        typeof ACTIONS_CRUD.object.__assignRequest
    ];
    type: 'final';
}>;
export declare type NExtractSV<S extends StateValueCRUDF> = NExtract<StateValueCRUDF, S>;
