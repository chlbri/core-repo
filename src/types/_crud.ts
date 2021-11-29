import type {
  DeepPartial,
  NExclude,
  NExtract,
  NFunction,
  NOmit,
  StringKeys,
} from '@core_chlbri/core';
import {
  ClientErrorStatus,
  CLIENT_ERROR_STATUS,
  InformationStatus,
  INFORMATION_STATUS,
  PermissionErrorStatus,
  PERMISSION_ERROR_STATUS,
  RD,
  RedirectStatus,
  REDIRECT_STATUS,
  ServerErrorStatus,
  SERVER_ERROR_STATUS,
  Status,
  STATUS,
  SuccessStatus,
  SUCCESS_STATUS,
  TimeoutErrorStatus,
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
  STATE_VALUES_CRUD,
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

// export type PRD<T> = Promise<RD<T, Status>>;

export type Projection<T> = { [key in StringKeys<T>]: boolean | 0 | 1 };

export type DP<T> = DeepPartial<T>;

export type WI<T> = WithId<DP<T>>;
export type WithoutDeepID<T> = WithoutId<DP<T>>;
export type WT<T> = WithoutTimeStamps<T>;

// export type PRDI<T> = PRD<WI<T>>;
// export type PRDIM<T> = PRD<WI<T>[]>;
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

export type REqResp<C, E = any> = { response: C; request: E };

export type FlatRD<T> = {
  status: Status;
  payload?: DeepPartial<T>;
  messages?: string[];
  notPermitteds?: string[];
};

export type TC<C = any, E = any> = {
  iterator: number;
} & REqResp<FlatRD<C>, DeepPartial<E>>;

export type States = TypeOf<typeof stateSchemaCRUD>;

export type TE<E> = {
  type: 'SEND';
  data: E;
};

export type TT<C = any, E = any> =
  | {
      value: NExtract<States, 'information'>;
      context: TC<C, E> &
        REqResp<
          UndefinyFields<FlatRD<C>, 'notPermitteds'> & {
            status: InformationStatus;
          },
          E
        >;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'success'>;
      context: TC<C, E> &
        REqResp<
          RequiredFields<
            UndefinyFields<FlatRD<C>, 'notPermitteds'> & {
              status: SuccessStatus;
            },
            'payload'
          >,
          E
        >;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'redirect'>;
      context: TC<C, E> &
        REqResp<
          UndefinyFields<FlatRD<C>, 'notPermitteds'> & {
            status: RedirectStatus;
          },
          E
        >;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'client'>;
      context: TC<C, E> &
        REqResp<
          UndefinyFields<FlatRD<C>, 'notPermitteds' | 'payload'> & {
            status: ClientErrorStatus;
          },
          E
        >;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'server'>;
      context: TC<C, E> &
        REqResp<
          UndefinyFields<FlatRD<C>, 'notPermitteds' | 'payload'> & {
            status: ServerErrorStatus;
          },
          E
        >;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'permission'>;
      context: TC<C, E> &
        REqResp<
          FlatRD<C> & {
            status: PermissionErrorStatus;
          },
          E
        >;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'timeout'>;
      context: TC<C, E> &
        REqResp<
          UndefinyFields<
            FlatRD<C>,
            'notPermitteds' | 'payload' | 'messages'
          > & {
            status: TimeoutErrorStatus;
          },
          E
        >;
    };

// #region Test <TT>

const TT_test1: TT<string, boolean> = {
  value: 'information',
  context: {
    iterator: 0,
    request: true,
    response: {
      status: 100,
      payload: '',
      messages: undefined,
      notPermitteds: undefined,
    },
  },
};
const TT_test11: TT<string, boolean> = {
  value: 'information',
  context: {
    iterator: 0,
    request: true,
    response: {
      status: 100,
      payload: '',
      messages: ['info1', 'info2'],
      notPermitteds: undefined,
    },
  },
};

const TT_test2: TT<string, boolean> = {
  value: 'success',
  context: {
    iterator: 0,
    request: true,
    response: { status: 200, payload: '', notPermitteds: undefined },
  },
};

const TT_test3: TT<string, boolean> = {
  value: 'redirect',
  context: {
    iterator: 0,
    request: true,
    response: {
      status: 300,
      payload: undefined,
      notPermitteds: undefined,
      messages: ['red2'],
    },
  },
};
const TT_test4: TT<string, boolean> = {
  value: 'client',
  context: {
    iterator: 0,
    request: true,
    response: {
      status: 430,
      payload: undefined,
      messages: ['client1'],
      notPermitteds: undefined,
    },
  },
};

const TT_test5: TT<string, boolean> = {
  value: 'server',
  context: {
    iterator: 0,
    request: true,
    response: {
      status: 500,
      payload: undefined,
      messages: ['serv1'],
      notPermitteds: undefined,
    },
  },
};

const TT_test6: TT<string, boolean> = {
  value: 'permission',
  context: {
    iterator: 0,
    request: false,
    response: {
      status: 600,
      payload: undefined,
      messages: ['perm1'],
      notPermitteds: ['perm2'],
    },
  },
};
const TT_test7: TT<string, boolean> = {
  value: 'timeout',
  context: {
    iterator: 0,
    request: true,
    response: {
      status: 997,
      payload: undefined,
      notPermitteds: undefined,
      messages: undefined,
    },
  },
};

// #endregion

export type ServiceReturn<R = any> = NOmit<TC<R>, 'iterator'>;

export type SR<R = any> = ServiceReturn<R>;

export type StateValueCRUD = TypeOf<typeof stateSchemaCRUD>;

export type StateCommonCRUD = TypeOf<typeof statesCommonSchemaCRUD>;

export type StateValueCRUDF = NExclude<
  StateValueCRUD,
  'idle' | 'pending' | 'checking'
>;

export type StateMachineCRUD<C = any, E = any> = StateMachine<
  TC<C, E>,
  any,
  TE<E>,
  TT<C, E>
>;

export type FinalStates = Record<
  StateValueCRUDF,
  {
    entry: [
      typeof ACTIONS_CRUD.object.__increment,
      typeof ACTIONS_CRUD.object.assign,
    ];
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

export type AbsoluteUdefiny<T extends Record<string, any>> = {
  [key in keyof T]: undefined;
};

export type ObjectStatus<S extends Status> = { status: S };

export type RequiredFields<T, K extends keyof T> = NOmit<T, K> &
  Required<Pick<T, K>>;

export type UndefinyFields<T, K extends keyof T> = NOmit<T, K> &
  Partial<Record<K, undefined>>;

export type NeveryFields<T, K extends keyof T> = NOmit<T, K> &
  Record<K, never>;

export type PartialFields<T, K extends keyof T> = NOmit<T, K> &
  Partial<Pick<T, K>>;

// StateMachine<TContext, TStateSchema extends StateSchema, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
//     value: any;
//     context: TContext;
// }, _TAction extends ActionObject<TContext, TEvent>

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
    data: WT<WithoutDeepID<E>>[];
    options?: QueryOptions;
  }
>;

export type CreateOne<E = any> = StateMachineCRUD<
  string,
  {
    data: WT<WithoutDeepID<E>>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type UpsertOne<E = any> = StateMachineCRUD<
  string,
  {
    _id?: string;
    data: WT<WithoutDeepID<E>>;
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
// #endregion

// #region Set

export type SetAll<E = any> = StateMachineCRUD<
  string[],
  {
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type SetMany<E = any> = StateMachineCRUD<
  string[],
  {
    filters: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type SetManyByIds<E = any> = StateMachineCRUD<
  string[],
  {
    ids: string[];
    filters?: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: QueryOptions;
  }
>;

export type SetOne<E = any> = StateMachineCRUD<
  string,
  {
    filters: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
    options?: NOmit<QueryOptions, 'limit'>;
  }
>;

export type SetOneById<E = any> = StateMachineCRUD<
  string[],
  {
    id: string;
    filters?: DSO<E>;
    data: Omit<WithoutDeepID<E>, '_updatedAt'>;
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
