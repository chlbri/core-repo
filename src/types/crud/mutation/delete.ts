import { NOmit } from '@core_chlbri/core';
import { DSO } from '../../dso';
import { QueryOptions, StateMachineCRUD } from '../config';

export type DeleteAll = StateMachineCRUD<
  string[],
  {
    options?: QueryOptions;
  }
>;

export type DeleteMany<E = any> = StateMachineCRUD<
  string[],
  {
    filters: DSO<E>;
    options?: QueryOptions;
  }
>;

export type DeleteManyByIds<E = any> = StateMachineCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
  }
>;

export type DeleteOne<E = any> = StateMachineCRUD<
  string,
  {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type DeleteOneById<E = any> = StateMachineCRUD<
  string[],
  {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;
