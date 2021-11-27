import type {
  DeepPartial,
  NExclude,
  NExtract,
  NFunction,
  NOmit,
  StringKeys,
} from '@core_chlbri/core';
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
import {
  Actor,
  BaseActionObject,
  BaseActions,
  Behavior,
  EventObject,
  InvokeCallback,
  InvokeCreator,
  InvokeMeta,
  MachineConfig,
  StateMachine,
  StateNodeConfig,
  StatesConfig,
  Subscribable,
  TransitionsConfig,
} from 'xstate';
import { TypeOf } from 'zod';
import {
  ACTIONS_CRUD,
  STATES_CRUD,
  STATES_FINAL,
} from '../constants/strings';
import { Entity, WithId, WithoutId, WithoutTimeStamps } from '../entities';
import {
  stateSchemaCRUD,
  statesCommonSchemaCRUD,
} from '../schemas/strings/machines';
import type { DSO } from './dso';
import {
  ClientErrorGuard,
  InformationFunction,
  InformationGuard,
  PermissionErrorGuard,
  RedirectGuard,
  ServerErrorGuard,
  SuccessGuard,
  TimeoutErrorGuard,
} from './functions';

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

export type States = TypeOf<typeof stateSchemaCRUD>;

export type TE<E> = {
  type: 'SEND';
  data: E;
};

export type ServiceReturn<R = any> = NOmit<TC<R>, 'iterator'>;

export type SR<R = any> = ServiceReturn<R>;

export type StateValueCRUDF = NExclude<
  StateValueCRUD,
  'idle' | 'pending' | 'checking'
>;

export type FinalStates = Record<
  StateValueCRUDF,
  {
    entry: typeof ACTIONS_CRUD.object.increment;
    type: 'final';
  }
>;

export type NExtractSV<S extends StateValueCRUDF> = NExtract<
  StateValueCRUDF,
  S
>;

export type GuardF<S extends StateValueCRUDF, F extends NFunction> = {
  [key in S]: F;
};

export type Guards<T> = GuardF<'information', InformationGuard<T>> &
  GuardF<'success', SuccessGuard<T>> &
  GuardF<'redirect', RedirectGuard<T>> &
  GuardF<'client', ClientErrorGuard> &
  GuardF<'server', ServerErrorGuard> &
  GuardF<'permission', PermissionErrorGuard<T>> &
  GuardF<'timeout', TimeoutErrorGuard>;

// PromiseLike<TFinalContext> | StateMachine<TFinalContext, any, any> | Subscribable<EventObject> | InvokeCallback<any, TEvent> | Behavior<any>

export type ServiceCRUD<C = any, E = any> = (
  context: TC<C>,
  event: TE<E>,
  meta: InvokeMeta,
) =>
  | Promise<SR<C>>
  | StateMachine<SR<C>, any, any>
  | Subscribable<EventObject>
  | InvokeCallback<TE<E>, TE<E>>
  | Behavior<any>;

export type StateCRUDArgs<C = any, E = any> = {
  src: ServiceCRUD<C, E>;
  id?: string;
  status?: Status;
  // guards:Guards<TC<C>>
};

export type StateValueCRUD = TypeOf<typeof stateSchemaCRUD>;

export type StateCommonCRUD = TypeOf<typeof statesCommonSchemaCRUD>;

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
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'success'>;
      context: TC<E> &
        ObjectStatus<SuccessStatus> &
        Required<Pick<TC<E>, 'payload'>> &
        AbsoluteUdefiny<Pick<TC<E>, 'notPermitteds' | 'messages'>>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'redirect'>;
      context: TC<E> &
        ObjectStatus<RedirectStatus> &
        AbsoluteUdefiny<Pick<TC<E>, 'notPermitteds'>>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'client'>;
      context: TC<E> &
        ObjectStatus<ClientErrorStatus> &
        AbsoluteUdefiny<Pick<TC<E>, 'payload' | 'notPermitteds'>>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'server'>;
      context: TC<E> &
        ObjectStatus<ServerErrorStatus> &
        AbsoluteUdefiny<Pick<TC<E>, 'payload' | 'notPermitteds'>>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'permission'>;
      context: TC<E> & ObjectStatus<PermissionErrorStatus>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'timeout'>;
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

export type REqREsp<C, E = any> = { response: C; request: E };

export type StateMachineCRUD<C, E = any> = StateMachine<
  TC<{ response: C; request: E }>,
  any,
  TE<E>,
  TT<{ response: C; request: E }>
>;

export type DeepOmit<T, K extends string> = T extends Record<
  string,
  infer U
>
  ? U extends Record<string, any>
    ? DeepOmit<U, K>
    : Omit<T, K>
  : never;

type Test3 = { [key: string]: any; on: never };

const test3: Test3 = {
  on: (() => {
    throw undefined;
  })(),
};

interface Test4 {
  [key: string]: any;
  on?: undefined;
}

export type TypeState =
  | 'atomic'
  | 'compound'
  | 'parallel'
  | 'final'
  | 'history';

export type CreateMany<E = any> = StateMachineCRUD<
  string[],
  {
    data: WT<WO<E>>[];
    options?: QueryOptions;
  }
>;

export type CreateOne<E = any> = StateMachineCRUD<
  string,
  {
    data: WT<WO<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type UpsertOne<E = any> = StateMachineCRUD<
  string,
  {
    _id?: string;
    data: WT<WO<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type UpsertMany<E = any> = StateMachineCRUD<
  string[],
  {
    upserts: { _id?: string; data: WO<E> }[];
    options?: QueryOptions;
  }
>;

// #endregion

// #region Read

export type ReadAll<E = any> = StateMachineCRUD<
  WI<E>[],
  { options?: QueryOptions }
>;

export type ReadMany<E = any> = StateMachineCRUD<
  WI<E>[],
  { filters: DSO<E>; options?: QueryOptions }
>;

export type ReadManyByIds<E = any> = StateMachineCRUD<
  WI<E>[],
  { ids: string[]; filters?: DSO<E>; options?: QueryOptions }
>;

export type ReadOne<E = any> = StateMachineCRUD<
  WI<E>,
  { filters: DSO<E>; options?: NOmit<QueryOptions, 'limit'> }
>;

export type ReadOneById<E = any> = StateMachineCRUD<
  WI<E>,
  { _id: string; filters: DSO<E>; options?: NOmit<QueryOptions, 'limit'> }
>;

// #endregion

// #region Count

export type CountAll = StateMachineCRUD<number>;

export type Count<E = any> = StateMachineCRUD<
  number,
  { filters: DSO<E>; options?: QueryOptions }
>;

// #endregion

// #region Update

export type UpdateAll<E = any> = StateMachineCRUD<
  string[],
  {
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type UpdateMany<E = any> = StateMachineCRUD<
  string[],
  {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type UpdateManyByIds<E = any> = StateMachineCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type UpdateOne<E = any> = StateMachineCRUD<
  string,
  {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type UpdateOneById<E = any> = StateMachineCRUD<
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

export type SetAll<E = any> = StateMachineCRUD<
  string[],
  {
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type SetMany<E = any> = StateMachineCRUD<
  string[],
  {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type SetManyByIds<E = any> = StateMachineCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type SetOne<E = any> = StateMachineCRUD<
  string,
  {
    filters: DSO<E>;
    data: Omit<WO<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type SetOneById<E = any> = StateMachineCRUD<
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

// #endregion

// #region Remove

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

// #endregion

// #region Retrieve

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
