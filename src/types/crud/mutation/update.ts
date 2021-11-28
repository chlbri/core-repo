import { NOmit } from '@core_chlbri/core';
import {  DSO } from '../../dso';
import {
  QueryOptions,
  StateMachineCRUD,
   WithoutDeepID,
} from '../config';

export type UpdateAll<E = any> = StateMachineCRUD<
  string[],
  {
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type UpdateMany<E = any> = StateMachineCRUD<
  string[],
  {
    filters: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type UpdateManyByIds<E = any> = StateMachineCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type UpdateOne<E = any> = StateMachineCRUD<
  string,
  {
    filters: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type UpdateOneById<E = any> = StateMachineCRUD<
  string[],
  {
    id: string;
    filters?: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;
