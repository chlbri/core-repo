import {
  DeepPartial,
  NExclude,
  NExtract,
  NOmit,
  StringKeys,
  Undefiny,
  NotSubType,
  Primitive,
} from '@core_chlbri/core';
import {
  ActionFunction,
  AssignAction,
  InvokeConfig,
  MachineConfig,
  MachineOptions,
  Mapper,
  PropertyMapper,
  StateMachine,
  StateNodeConfig,
  StatesConfig,
  TransitionConfigOrTarget,
} from 'xstate';
import { TypeOf } from 'zod/lib/types';
import { ACTIONS_CRUD, STATE_VALUES_CRUD } from '../../constants/strings';
import { WithId, WithoutId } from '../../entities';
import { statusFigureSchema } from '../../schemas/status';
import { statesCommonSchemaCRUD } from '../../schemas/strings';
import {
  actionSchemaCRUD,
  stateFSchemaCRUD,
  stateSchemaCRUD,
} from './../../schemas/strings/machines';
import { InformationStatus, Status, StatusFigure } from './status';

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

export type Response<T> = {
  status: Status;
  payload?: DeepPartial<T>;
  messages: string[];
  notPermitteds: string[];
};

export type ReqRes<C = any, E = any> = {
  response: Response<C>;
  request?: DeepPartial<E>;
};

export type TC<C = any, E = any> = {
  iterator: number;
} & ReqRes<C, E>;

export type States = TypeOf<typeof stateSchemaCRUD>;

type EventData<T> = T extends Primitive
  ? T
  : NotSubType<T, undefined> extends Record<string, never>
  ? T | undefined
  : T;

export type TE<E = any> = {
  type: 'SEND';
  data?: E;
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
export type TT<C = any, E = any> =
  | {
      value: NExtract<States, 'information'>;
      context: TC<C, E> &
        UndefinyFields<Response<C>, 'notPermitteds'> & {
          status: InformationStatus;
        };
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'success'>;
      context: TC<C, E>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'redirect'>;
      context: TC<C, E>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'client'>;
      context: TC<C, E>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'server'>;
      context: TC<C, E>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'permission'>;
      context: TC<C, E>;
    }
  | {
      value: NExtract<TypeOf<typeof stateSchemaCRUD>, 'timeout'>;
      context: TC<C, E>;
    };

// #endregion

export declare type SingleOrArray<T> = T[] | T;

export type StateValueCRUD = TypeOf<typeof stateSchemaCRUD>;
export type DefaultActionValueCRUD = TypeOf<typeof actionSchemaCRUD>;

export type StateCommonCRUD = TypeOf<typeof statesCommonSchemaCRUD>;

export type StateValueCRUDF = TypeOf<typeof stateFSchemaCRUD>;

export type ActionFunctionCRUD<C = any, E = any> = ActionFunction<
  TC<C>,
  TE<E>
>;

export type DefaultActions<C = any, E = any> = Record<
  DefaultActionValueCRUD,
  AssignAction<TC<C, E>, TE<E>>
>;

export type MachineConfigCRUD<C = any, E = any> = MachineConfig<
  TC<C, E>,
  any,
  TE<E>
>;

export type MachineOptionsCRUD<C = any, E = any> = Partial<
  MachineOptions<TC<C>, TE<E>>
>;

export type MachineArgsCRUD<C = any, E = any> = {
  config: MachineConfigCRUD<C, E>;
  options?: MachineOptionsCRUD<C, E>;
  status: StatusFigure;
};

// options?: { services: {} };

// #region Test <StateMachineConfigCRUD>

// #endregion

// MachineConfig<TContext, any, TEvent>

export type ActionCRUD = TypeOf<typeof actionSchemaCRUD>;

export type StateMachineCRUD<C = any, E = any> = StateMachine<
  TC<C, E>,
  any,
  TE<E>,
  TT<C>
>;

type NAction<T extends ActionCRUD> = NExtract<ActionCRUD, T>;
type NStateVF<T extends StateValueCRUDF> = NExtract<StateValueCRUDF, T>;

export type FinalStates = {
  [key in NStateVF<'information'>]: {
    entry: [NAction<'__information'>, NAction<'__increment'>];
    type: 'final';
  };
} & {
  [key in NStateVF<'success'>]: {
    entry: [NAction<'__success'>, NAction<'__increment'>];
    type: 'final';
  };
} & {
  [key in NStateVF<'redirect'>]: {
    entry: [NAction<'__redirect'>, NAction<'__increment'>];
    type: 'final';
  };
} & {
  [key in NStateVF<'client'>]: {
    entry: [NAction<'__client'>, NAction<'__increment'>];
    type: 'final';
  };
} & {
  [key in NStateVF<'server'>]: {
    entry: [NAction<'__server'>, NAction<'__increment'>];
    type: 'final';
  };
} & {
  [key in NStateVF<'permission'>]: {
    entry: [NAction<'__permission'>, NAction<'__increment'>];
    type: 'final';
  };
} & {
  [key in NStateVF<'timeout'>]: {
    entry: [NAction<'__timeout'>, NAction<'__increment'>];
    type: 'final';
  };
};

export type NExtractSV<S extends StateValueCRUDF> = NExtract<
  StateValueCRUDF,
  S
>;
