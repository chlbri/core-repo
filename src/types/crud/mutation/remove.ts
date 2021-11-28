import { NOmit } from '@core_chlbri/core';
import { DSO } from '../../dso';
import { QueryOptions, StateMachineCRUD } from '../config';

export type RemoveAll = StateMachineCRUD<
  string[],
  {
    options?: QueryOptions;
  }
>;

export type RemoveMany<E = any> = StateMachineCRUD<
  string[],
  {
    filters: DSO<E>;
    options?: QueryOptions;
  }
>;

export type RemoveManyByIds<E = any> = StateMachineCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
  }
>;

export type RemoveOne<E = any> = StateMachineCRUD<
  string,
  {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;
export type RemoveOneById<E = any> = StateMachineCRUD<
  string[],
  {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;
