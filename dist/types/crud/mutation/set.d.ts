import { NOmit } from '@core_chlbri/core';
import { DSO } from '../../dso';
import { QueryOptions, StateMachineCRUD, WithoutDeepID } from '../config';
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
