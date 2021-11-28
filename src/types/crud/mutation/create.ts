import { NOmit } from '@core_chlbri/core';
import { WithoutTimeStamps } from '../../../entities';
import { QueryOptions, StateMachineCRUD, WithoutDeepID } from '../config';

export type CreateMany<E = any> = StateMachineCRUD<
  string[],
  {
    data: WithoutTimeStamps<WithoutDeepID<E>>[];
    options?: QueryOptions;
  }
>;

export type CreateOne<E = any> = StateMachineCRUD<
  string,
  {
    data: WithoutTimeStamps<WithoutDeepID<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type UpsertOne<E = any> = StateMachineCRUD<
  string,
  {
    _id?: string;
    data: WithoutTimeStamps<WithoutDeepID<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type UpsertMany<E = any> = StateMachineCRUD<
  string[],
  {
    upserts: { _id?: string; data: WithoutDeepID<E> }[];
    options?: QueryOptions;
  }
>;
