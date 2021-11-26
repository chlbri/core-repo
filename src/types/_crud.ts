import type { DeepPartial, NExtract, NOmit, StringKeys } from 'core';
import {
  CLIENT_ERROR_STATUS,
  INFORMATION_STATUS,
  PERMISSION_ERROR_STATUS,
  RD,
  REDIRECT_STATUS,
  SERVER_ERROR_STATUS,
  STATUS,
  SUCCESS_STATUS,
  TIMEOUT_ERROR_STATUS,
} from 'core-promises';
import { InvokeMeta, StateMachine } from 'xstate';
import { TypeOf } from 'zod';
import { Entity, WithId, WithoutId, WithoutTimeStamps } from '../entities';
import { stateSchema } from '../schemas/strings/machines';
import type { DSO } from './dso';

export type PRD<T> = Promise<RD<T, Status>>;

export type Projection<T> = { [key in StringKeys<T>]: boolean | 0 | 1 };

export type DP<T> = DeepPartial<T>;

export type WI<T> = WithId<DP<T>>;
export type WO<T> = WithoutId<DP<T>>;
export type WT<T> = WithoutTimeStamps<T>;

export type PRDI<T> = PRD<WI<T>>;
export type PRDIM<T> = PRD<WI<T>[]>;
// type PRDO<T> = PRD<WO<DP<T>>>;
// type PRDOM<T> = PRD<WO<DP<T>>[]>;

export type ErrorHandler = (error?: any) => never;

export type QueryOptions = {
  limit?: number;
  errorHandler?: ErrorHandler;
  after?: string;
  before?: string;
};

// #region Create

// #region Status
export type ClientErrorStatus = typeof CLIENT_ERROR_STATUS[number];

export type InformationStatus = typeof INFORMATION_STATUS[number];

export type PermissionErrorStatus = typeof PERMISSION_ERROR_STATUS[number];

export type RedirectStatus = typeof REDIRECT_STATUS[number];

export type ServerErrorStatus = typeof SERVER_ERROR_STATUS[number];

export type SuccessStatus = typeof SUCCESS_STATUS[number];

export type TimeoutErrorStatus = typeof TIMEOUT_ERROR_STATUS[number];

export type Status = typeof STATUS[number];
// #endregion

export type TC<E> = {
  iterator: number;
  status: Status;
  payload?: DeepPartial<E>;
  messages?: string[];
  notPermitteds?: string[];
};

export type States = TypeOf<typeof stateSchema>;

export type TE<E> = {
  type: 'SEND';
  data: E;
};

export type PromiseService<C = any, E = any, TF = any> = (
  context: TC<C>,
  event: TE<E>,
  meta: InvokeMeta,
) => PromiseLike<NOmit<TC<TF>, 'iterator'>>;

export type StateCRUDArgs<C = any, E = any, TF = any> = {
  src: PromiseService<C, E, TF>;
  id?: string;
  status?: Status;
};

export type AbsoluteUdefiny<T extends Record<string, any>> = {
  [key in keyof T]: undefined;
};

export type ObjectStatus<S extends Status> = { status: S };

export type TT<E> =
  | {
      value: NExtract<States, 'information'>;
      context: TC<E> &
        ObjectStatus<InformationStatus> &
        AbsoluteUdefiny<Pick<TC<E>, 'notPermitteds'>>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchema>, 'success'>;
      context: TC<E> &
        ObjectStatus<SuccessStatus> &
        Required<Pick<TC<E>, 'payload'>> &
        AbsoluteUdefiny<Pick<TC<E>, 'notPermitteds' | 'messages'>>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchema>, 'redirect'>;
      context: TC<E> &
        ObjectStatus<RedirectStatus> &
        AbsoluteUdefiny<Pick<TC<E>, 'notPermitteds'>>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchema>, 'client'>;
      context: TC<E> &
        ObjectStatus<ClientErrorStatus> &
        AbsoluteUdefiny<Pick<TC<E>, 'payload' | 'notPermitteds'>>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchema>, 'server'>;
      context: TC<E> &
        ObjectStatus<ServerErrorStatus> &
        AbsoluteUdefiny<Pick<TC<E>, 'payload' | 'notPermitteds'>>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchema>, 'permission'>;
      context: TC<E> & ObjectStatus<PermissionErrorStatus>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchema>, 'timeout'>;
      context: TC<E> &
        ObjectStatus<InformationStatus> &
        AbsoluteUdefiny<
          Pick<TC<E>, 'notPermitteds' | 'messages' | 'payload'>
        >;
    };

// #region Test Types

type Test1 = TT<Entity>;

const test1: Test1 = {
  context: { iterator: 0, status: 100, payload: {} },
  value: 'information',
};

// #endregion

// StateMachine<TContext, TStateSchema extends StateSchema, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
//     value: any;
//     context: TContext;
// }, _TAction extends ActionObject<TContext, TEvent>

export type StateCRUD<C, E = Record<string, unknown>> = StateMachine<
  TC<C>,
  any,
  TE<E>,
  TT<C>
>;

export type CreateMany<E = any> = StateCRUD<
  string[],
  {
    data: WT<WO<E>>[];
    options?: QueryOptions;
  }
>;

export type CreateOne<E = any> = StateCRUD<
  string,
  {
    data: WT<WO<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type UpsertOne<E = any> = StateCRUD<
  string,
  {
    _id?: string;
    data: WT<WO<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type UpsertMany<E = any> = StateCRUD<
  string[],
  {
    upserts: { _id?: string; data: WO<E> }[];
    options?: QueryOptions;
  }
>;

// #endregion

// #region Read

export type ReadAll<E = any> = StateCRUD<
  WI<E>[],
  { options?: QueryOptions }
>;

export type ReadMany<E = any> = StateCRUD<
  WI<E>[],
  { filters: DSO<E>; options?: QueryOptions }
>;

export type ReadManyByIds<E = any> = StateCRUD<
  WI<E>[],
  { ids: string[]; filters?: DSO<E>; options?: QueryOptions }
>;

export type ReadOne<E = any> = StateCRUD<
  WI<E>,
  { filters: DSO<E>; options?: NOmit<QueryOptions, 'limit'> }
>;

export type ReadOneById<E = any> = StateCRUD<
  WI<E>,
  { _id: string; filters: DSO<E>; options?: NOmit<QueryOptions, 'limit'> }
>;

// #endregion

// #region Count

export type CountAll = StateCRUD<number>;

export type Count<E = any> = StateCRUD<
  number,
  { filters: DSO<E>; options?: QueryOptions }
>;

// #endregion

// #region Update

export type UpdateAll<E = any> = StateCRUD<
  string[],
  {
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type UpdateMany<E = any> = StateCRUD<
  string[],
  {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type UpdateManyByIds<E = any> = StateCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type UpdateOne<E = any> = StateCRUD<
  string,
  {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type UpdateOneById<E = any> = StateCRUD<
  string[],
  {
    id: string;
    filters?: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;
// #endregion

// #region Set

export type SetAll<E = any> = StateCRUD<
  string[],
  {
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type SetMany<E = any> = StateCRUD<
  string[],
  {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type SetManyByIds<E = any> = StateCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type SetOne<E = any> = StateCRUD<
  string,
  {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type SetOneById<E = any> = StateCRUD<
  string[],
  {
    id: string;
    filters?: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

// #endregion

// #region Delete

export type DeleteAll = StateCRUD<
  string[],
  {
    options?: QueryOptions;
  }
>;

export type DeleteMany<E = any> = StateCRUD<
  string[],
  {
    filters: DSO<E>;
    options?: QueryOptions;
  }
>;

export type DeleteManyByIds<E = any> = StateCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
  }
>;

export type DeleteOne<E = any> = StateCRUD<
  string,
  {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type DeleteOneById<E = any> = StateCRUD<
  string[],
  {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

// #endregion

// #region Remove

export type RemoveAll = StateCRUD<
  string[],
  {
    options?: QueryOptions;
  }
>;

export type RemoveMany<E = any> = StateCRUD<
  string[],
  {
    filters: DSO<E>;
    options?: QueryOptions;
  }
>;

export type RemoveManyByIds<E = any> = StateCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
  }
>;

export type RemoveOne<E = any> = StateCRUD<
  string,
  {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;
export type RemoveOneById<E = any> = StateCRUD<
  string[],
  {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

// #endregion

// #region Retrieve

export type RetrieveAll = StateCRUD<
  string[],
  {
    options?: QueryOptions;
  }
>;

export type RetrieveMany<E = any> = StateCRUD<
  string[],
  {
    filters: DSO<E>;
    options?: QueryOptions;
  }
>;

export type RetrieveManyByIds<E = any> = StateCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    options?: QueryOptions;
  }
>;

export type RetrieveOne<E = any> = StateCRUD<
  string,
  {
    filters: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type RetrieveOneById<E = any> = StateCRUD<
  string[],
  {
    id: string;
    filters?: DSO<E>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

// #endregion

export interface CRUD<E extends Entity> {
  createMany: CreateMany<E>;
  createOne: CreateOne<E>;
  upsertOne: UpsertOne<E>;
  upsertMany: UpsertMany<E>;
  readAll: ReadAll<E>;
  readMany: ReadMany<E>;
  readManyByIds: ReadManyByIds<E>;
  readOne: ReadOne<E>;
  readOneById: ReadOneById<E>;
  countAll: CountAll;
  count: Count<E>;
  updateAll: UpdateAll<E>;
  updateMany: UpdateMany<E>;
  updateManyByIds: UpdateManyByIds<E>;
  updateOne: UpdateOne<E>;
  updateOneById: UpdateOneById<E>;
  setAll: SetAll<E>;
  setMany: SetMany<E>;
  setManyByIds: SetManyByIds<E>;
  setOne: SetOne<E>;
  setOneById: SetOneById<E>;
  deleteAll: DeleteAll;
  deleteMany: DeleteMany<E>;
  deleteManyByIds: DeleteManyByIds<E>;
  deleteOne: DeleteOne<E>;
  deleteOneById: DeleteOneById<E>;
  retrieveAll: RetrieveAll;
  retrieveMany: RetrieveMany<E>;
  retrieveManyByIds: RetrieveManyByIds<E>;
  retrieveOne: RetrieveOne<E>;
  retrieveOneById: RetrieveOneById<E>;
  removeAll: RemoveAll;
  removeMany: RemoveMany<E>;
  removeManyByIds: RemoveManyByIds<E>;
  removeOne: RemoveOne<E>;
  removeOneById: RemoveOneById<E>;
}
