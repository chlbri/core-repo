import { NOmit } from '@core_chlbri/core';
import { DSO } from '../../dso';
import { QueryOptions, StateMachineCRUD } from '../config';
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
