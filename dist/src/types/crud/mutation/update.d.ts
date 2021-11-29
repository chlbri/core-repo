import { NOmit } from '@core_chlbri/core';
import { DSO } from '../../dso';
import { QueryOptions, StateMachineCRUD, WithoutDeepID } from '../config';
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
