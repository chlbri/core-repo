import {
  actionSchemaCRUD,
  stateSchemaCRUD,
} from './../../schemas/strings/machines';
import {
  NExclude,
  StringKeys,
  DeepPartial,
  NOmit,
  NExtract,
} from '@core_chlbri/core';
import {
  ActionFunction,
  AssignAction,
  MachineConfig,
  MachineOptions,
  Mapper,
  StateMachine,
  StateNodeConfig,
} from 'xstate';
import { TypeOf } from 'zod/lib/types';
import { ACTIONS_CRUD } from '../../constants/strings';
import { WithId, WithoutId } from '../../entities';
import { statesCommonSchemaCRUD } from '../../schemas/strings';
import {
  ClientErrorStatus,
  InformationStatus,
  PermissionErrorStatus,
  RedirectStatus,
  ServerErrorStatus,
  Status,
  SuccessStatus,
  TimeoutErrorStatus,
} from './status';

export type Projection<T> = { [key in StringKeys<T>]: boolean | 0 | 1 };

export type ErrorHandler = (error?: any) => never;

export type QueryOptions = {
  limit?: number;
  errorHandler?: ErrorHandler;
  after?: string;
  before?: string;
};

export type DP<T> = DeepPartial<T>;

export type WithDeepID<T> = WithId<DP<T>>;
export type WithoutDeepID<T> = WithoutId<DP<T>>;

export type FlatRD<T> = {
  status: Status;
  payload?: DeepPartial<T>;
  messages?: string[];
  notPermitteds?: string[];
};

export type TC<C = any> = {
  iterator: number;
} & FlatRD<C>;

export type States = TypeOf<typeof stateSchemaCRUD>;

export type TE<E> = {
  type: 'SEND';
  data: E;
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

// #region <TT>
export type TT<C = any> =
  | {
      value: NExtract<States, 'information'>;
      context: TC<C> &
        UndefinyFields<FlatRD<C>, 'notPermitteds'> & {
          status: InformationStatus;
        };
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'success'>;
      context: TC<C> &
        RequiredFields<
          UndefinyFields<FlatRD<C>, 'notPermitteds'> & {
            status: SuccessStatus;
          },
          'payload'
        >;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'redirect'>;
      context: TC<C> &
        UndefinyFields<FlatRD<C>, 'notPermitteds'> & {
          status: RedirectStatus;
        };
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'client'>;
      context: TC<C> &
        UndefinyFields<FlatRD<C>, 'notPermitteds' | 'payload'> & {
          status: ClientErrorStatus;
        };
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'server'>;
      context: TC<C> &
        UndefinyFields<FlatRD<C>, 'notPermitteds' | 'payload'> & {
          status: ServerErrorStatus;
        };
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'permission'>;
      context: TC<C> &
        FlatRD<C> & {
          status: PermissionErrorStatus;
        };
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'timeout'>;
      context: TC<C> &
        UndefinyFields<
          FlatRD<C>,
          'notPermitteds' | 'payload' | 'messages'
        > & {
          status: TimeoutErrorStatus;
        };
    };

// #endregion

export declare type SingleOrArray<T> = T[] | T;

export type StateValueCRUD = TypeOf<typeof stateSchemaCRUD>;
export type DefaultActionValueCRUD = TypeOf<typeof actionSchemaCRUD>;

export type StateCommonCRUD = TypeOf<typeof statesCommonSchemaCRUD>;

export type StateValueCRUDF = NExclude<
  StateValueCRUD,
  'idle' | 'pending' | 'checking'
>;

export type ActionFunctionCRUD<C = any, E = any> = ActionFunction<
  TC<C>,
  TE<E>
>;

export type DefaultActions<C = any, E = any> = Record<
  DefaultActionValueCRUD,
  AssignAction<TC<C>, TE<E>>
>;

export type MachineConfigCRUD<C = any, E = any> = MachineConfig<
  TC<C>,
  any,
  TE<E>
>;

export type MachineOptionsCRUD<C = any, E = any> = Partial<
  MachineOptions<TC<C>, TE<E>>
>;

export type MachineArgsCRUD<C = any, E = any> = {
  config: MachineConfigCRUD<C, E>;
  options?: MachineOptionsCRUD<C, E>;
};

type RSTates = {
  [key2 in StateValueCRUDF]: any;
};

export interface StatesNode extends RSTates {
  [key: string]: any;
}

type Tes3 = keyof StatesNode;

const tes3: StatesNode = {
  information: '',
  success: '',
  redirect: '',
  client: '',
  server: '',
  permission: '',
  timeout: '',
  eer: '',
};

export type Config = {
  config: {
    key?: string;
    initial?: Exclude<string, StateValueCRUDF>;
    type?: 'atomic' | 'compound' | 'parallel' | 'final' | 'history';
    history?: 'shallow' | 'deep' | boolean | undefined;
    invoke: SingleOrArray<{
      id?: string;
      autoForward?: boolean;
    }>;
    states: Record<Exclude<string, StateValueCRUDF>, any>;
  };
  // options?: { services: {} };
};

// #region Test <StateMachineConfigCRUD>

const testSMCC: MachineConfigCRUD<string, string> = {
  initial: '',
  states: {
    idle: {
      type: 'atomic',
      on: {},
    },
  },
};

// #endregion

// MachineConfig<TContext, any, TEvent>

export type StateMachineCRUD<C = any, E = any> = StateMachine<
  TC<C>,
  any,
  TE<E>,
  TT<C>
>;

export type FinalStates = Record<
  StateValueCRUDF,
  {
    entry: [
      typeof ACTIONS_CRUD.object.__increment,
      typeof ACTIONS_CRUD.object.__assignStatus,
    ];
    type: 'final';
  }
>;

export type NExtractSV<S extends StateValueCRUDF> = NExtract<
  StateValueCRUDF,
  S
>;
