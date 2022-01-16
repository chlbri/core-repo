import { NOmit } from '@core_chlbri/core';
import { DSO } from '../../dso';
import { QueryOptions, StateMachineCRUD } from '../config';
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
