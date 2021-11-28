import { NOmit } from '@core_chlbri/core';
import { DSO } from '../../dso';
import { QueryOptions, StateMachineCRUD } from '../config';

export type RetrieveAll = StateMachineCRUD<
  string[],
  {
    options?: QueryOptions;
  }
>;

export type RetrieveMany<E = any> = StateMachineCRUD<
  string[],
  {
    filters: DSO<E>;
    options?: QueryOptions;
  }
>;

export type RetrieveManyByIds<E = any> = StateMachineCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
  }
>;

export type RetrieveOne<E = any> = StateMachineCRUD<
  string,
  {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type RetrieveOneById<E = any> = StateMachineCRUD<
  string[],
  {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;
