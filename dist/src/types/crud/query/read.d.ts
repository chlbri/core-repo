import { NOmit } from '@core_chlbri/core';
import { DSO } from '../../dso';
import { QueryOptions, StateMachineCRUD, WithDeepID } from '../config';
export declare type ReadAll<E = any> = StateMachineCRUD<WithDeepID<E>[], {
    options?: QueryOptions;
}>;
export declare type ReadMany<E = any> = StateMachineCRUD<WithDeepID<E>[], {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
export declare type ReadManyByIds<E = any> = StateMachineCRUD<WithDeepID<E>[], {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
}>;
export declare type ReadOne<E = any> = StateMachineCRUD<WithDeepID<E>, {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
export declare type ReadOneById<E = any> = StateMachineCRUD<WithDeepID<E>, {
    _id: string;
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
}>;
