/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ReturnData } from 'core-promises';
import { dequal } from 'dequal/lite';
import { nanoid } from 'nanoid';
import { CollectionPermissions } from '../../entities';
import { produce } from 'immer';
import { isNotClause } from '../../functions/data';
import {
  Count,
  CountAll,
  CreateMany,
  CreateOne,
  CRUD,
  DeleteAll,
  DeleteMany,
  DeleteManyByIds,
  DeleteOne,
  DeleteOneById,
  ServiceCRUD,
  ReadAll,
  ReadMany,
  ReadManyByIds,
  ReadOne,
  ReadOneById,
  RemoveAll,
  RemoveMany,
  RemoveManyByIds,
  RemoveOne,
  RemoveOneById,
  RetrieveAll,
  RetrieveMany,
  RetrieveManyByIds,
  RetrieveOne,
  RetrieveOneById,
  ServiceReturn,
  SR,
  SetAll,
  SetMany,
  SetManyByIds,
  SetOne,
  SetOneById,
  TC,
  UpdateAll,
  UpdateMany,
  UpdateManyByIds,
  UpdateOne,
  UpdateOneById,
  UpsertMany,
  UpsertOne,
  WI,
  WithoutDeepID,
} from '../../types/_crud';
import type {
  DataSearchOperations,
  SearchOperation,
} from '../../types/dso';
import { Entity } from '../../entities';
import { inStreamSearchAdapter } from '..';
import { createCRUDMAchine } from '../../functions/machine';
import { NOmit } from '@core_chlbri/core';
import { createMachine } from 'xstate';
import { STATES_COMMON_CRUD, STATES_CRUD } from '../../constants/strings';

// type Permission<T extends Entity> = {
//   permissionReader: PermissionsReaderOne<T>;
// };

export class ArrayCRUD_DB<E extends Entity> implements CRUD<E> {
  /* , Permission<T> */
  constructor(
    private _db: WI<E>[],
    private permissions: CollectionPermissions,
  ) {}

  __update = (payload: string[], update: WithoutDeepID<E>) => {
    const __db = produce([...this._db], draft => {
      payload.forEach(id => {
        const index = draft.findIndex((data: any) => data._id === id);
        if (index !== -1) {
          (draft[index] as any).login = (update as any).login;
        }
      });
    });
    this.rinitDB();
    this._db.push(...__db);
    this._db; //?
  };

  rinitDB() {
    this._db.length = 0;
  }

  get length() {
    return this._db.length;
  }

  // readonly permissionReaderMany: PermissionsReaderMany<T> = dso => {
  //   const datas = this._db.filter(inStreamSearchAdapter(dso));
  //   const out = datas.map(getPermissions);
  //   return out;
  // };
  // readonly permissionReaderOne: PermissionsReaderOne<T> = dso =>
  //   this.permissionReaderMany(dso)[0];

  // #region Create

  createMany: CreateMany<E> = createCRUDMAchine({
    src: async (_, { data: { data: datas, options } }) => {
      const inputs = datas.map(data => ({
        _id: nanoid(),
        ...data,
      })) as WI<E>[];
      let rd: NOmit<TC<string[]>, 'iterator'>;
      if (options && options.limit && options.limit < datas.length) {
        const limit = options.limit;
        const _inputs = inputs.slice(0, limit);
        this._db.push(..._inputs);
        const payload = _inputs.map(input => input._id);
        const messages = ['Limit exceeded'];
        rd = { status: 110, payload, messages };
        return rd;
      }

      this._db.push(...inputs);
      const payload = inputs.map(input => input._id) as string[];
      rd = { status: 210, payload };
      return rd;
    },
    status: 410,
  });

  createOne: CreateOne<E> = createCRUDMAchine({
    src: async (_, { data: { data } }) => {
      const input = {
        _id: nanoid(),
        ...data,
      } as WI<E>;

      this._db.push(input);
      const payload = input._id;
      const rd: SR<string> = {
        status: 211,
        payload,
      };
      return rd;
    },
    status: 411,
  });

  upsertOne: UpsertOne<E> = createCRUDMAchine({
    src: async (_, { data: { _id, data } }) => {
      const _filter = inStreamSearchAdapter({ _id, ...data } as any);
      const _exist = this._db.find(_filter);
      let out: SR<string>;
      if (_exist) {
        const messages = ['Already exists'];
        out = { status: 312, payload: _id, messages };
      } else {
        const input = {
          _id: nanoid(),
          ...data,
        } as WI<E>;
        this._db.push(input);
        out = { status: 212, payload: _id };
      }
      return out;
    },
    status: 412,
  });

  upsertMany: UpsertMany<E> = createCRUDMAchine({
    src: async (_, { data: { upserts, options } }) => {
      const inputs = upserts.map(({ _id, data }) => ({
        _id,
        ...data,
      })) as WI<E>[];
      const alreadyExists: string[] = [];
      if (options && options.limit && options.limit < upserts.length) {
        const limit = options.limit;
        const _inputs = inputs.slice(0, limit).map(input => {
          const _filter = inStreamSearchAdapter(input as any);
          const _exist = this._db.find(_filter)?._id;
          if (_exist) {
            alreadyExists.push(_exist);
          } else {
            this._db.push({ ...input, _id: input._id ?? nanoid() });
          }
          return input;
        });
        if (alreadyExists.length > 0) {
          return {
            status: 313,
            payload: _inputs.map(input => input._id),
            messages: [`${alreadyExists.length} already exist`],
          };
        } else {
          return {
            status: 113,
            payload: _inputs.map(input => input._id),
          };
        }
      }

      inputs.forEach(input => {
        const _filter = inStreamSearchAdapter(input as any);
        const _exist = this._db.find(_filter)?._id;

        if (_exist) {
          alreadyExists.push(_exist);
        } else {
          this._db.push({ ...input, _id: input._id ?? nanoid() });
        }
        return input;
      });

      if (alreadyExists.length > 0) {
        return {
          status: 313,
          payload: inputs.map(input => input._id),
          messages: [`${alreadyExists.length} already exist`],
        };
      } else {
        return {
          status: 213,
          payload: inputs.map(input => input._id),
        };
      }
    },
    status: 413,
  });

  // #endregion

  // #region Read

  readAll: ReadAll<E> = createCRUDMAchine({
    src: (_, { data: { options } }) =>
      createMachine(
        {
          id: 'readAll',
          initial: 'idle',
          states: {
            
            idle: {
              always: [
                { cond: () => this._db.length < 0, target: 'empty' },
                { target: 'check_limit' },
              ],
            },
            empty: {
              type: 'final',
              data: {
                status: 514,
                messages: ['Empty'],
              },
            },
            check_limit: {
              always: [
                { cond: () => !!options?.limit, target: 'limit' },
                { target: 'nolimit' },
              ],
            },
            limit: {
              initial: 'idle',
              states: {
                idle: {
                  always: [
                    {
                      cond: () =>
                        !!options?.limit &&
                        options.limit < this._db.length,
                      target: 'limit_reached',
                    },
                    { target: '#readAll.nolimit' },
                  ],
                },
                limit_reached: {
                  type: 'final',
                  data: {
                    status: 314,
                    payload: this._db.slice(0, options?.limit),
                    messages: ['Limit Reached'],
                  },
                },
              },
            },
            nolimit: {
              type: 'final',
              data: {
                status: 214,
                payload: this._db,
              },
            },
          },
        },
        {},
      ),
  });

  readMany: ReadMany<E> = createMachine(
    {
      id: 'readAll',
      initial: STATES_CRUD.object.idle,
      context: { iterator: 0, response:{status: 415}, request:{} } as TC<WI<E>[]>,
      states: {
        [STATES_CRUD.object.idle]: {
          on: {
            SEND:{
              
            }
          },
          always: [
            {
              cond: () => this._db.length < 0,
              target: STATES_COMMON_CRUD.object.empty_db,
            },
            { target: STATES_COMMON_CRUD.object.check_options_limit },
          ],
        },
        [STATES_COMMON_CRUD.object.empty_db]: {
          type: 'final',
          data: {
            status: 515,
            messages: [STATES_COMMON_CRUD.object.empty_db],
          },
        },
        [STATES_COMMON_CRUD.object.check_options_limit]: {
          always: [
            {
              cond: () => !!options?.limit,
              target: STATES_COMMON_CRUD.object.options_limit,
            },
            { target: STATES_COMMON_CRUD.object.no_options_limit },
          ],
        },
        [STATES_COMMON_CRUD.object.no_options_limit]: {
          initial: STATES_CRUD.object.idle,
          states: {
            idle: {
              always: [
                {
                  cond: () =>
                    !!options?.limit && options.limit < this._db.length,
                  target: STATES_COMMON_CRUD.object.limit_reached,
                },
                { target: '#readAll.nolimit' },
              ],
            },
            [STATES_COMMON_CRUD.object.limit_reached]: {
              type: 'final',
              data: {
                status: 314,
                payload: this._db.slice(0, options?.limit),
                messages: [STATES_COMMON_CRUD.object.limit_reached],
              },
            },
          },
        },
        [STATES_COMMON_CRUD.object.options_limit]: {
          type: 'final',
          data: {
            status: 214,
            payload: this._db,
          },
        },
      },
    },
    {},
  );

  readManyByIds: ReadManyByIds<E> = async ({ ids, filters, options }) => {
    const reads1 = this._db.filter(data => ids.includes(data._id));
    if (!reads1.length) {
      return new ReturnData({
        status: 516,
        messages: ['Empty'],
      });
    }
    if (!filters) {
      if (options && options.limit && options.limit < reads1.length) {
        return new ReturnData({
          status: 116,
          payload: reads1.slice(0, options.limit),
          messages: ['Limit Reached'],
        });
      } else {
        return new ReturnData({
          status: 216,
          payload: reads1,
        });
      }
    }
    const reads2 = reads1.filter(inStreamSearchAdapter(filters));
    if (!reads2.length) {
      return new ReturnData({
        status: 516,
        messages: ['Filters kill data'],
      });
    }
    if (options && options.limit && options.limit < reads2.length) {
      return new ReturnData({
        status: 116,
        payload: reads2.slice(0, options.limit),
        messages: ['Limit Reached'],
      });
    }
    if (reads2.length < reads1.length) {
      return new ReturnData({
        status: 316,
        payload: reads2,
        messages: ['Filters slice datas'],
      });
    }
    return new ReturnData({
      status: 216,
      payload: reads1,
    });
  };

  readOne: ReadOne<E> = async ({ filters }) => {
    const payload = this._db.find(inStreamSearchAdapter(filters));
    if (payload) {
      return new ReturnData({ status: 217, payload });
    }
    return new ReturnData({ status: 517, messages: ['NotFound'] });
  };

  readOneById: ReadOneById<E> = async ({ _id, filters }) => {
    const exits1 = this._db.find(data => data._id === _id);
    if (!filters) {
      if (!exits1) {
        return new ReturnData({ status: 518, messages: ['NotFound'] });
      } else return new ReturnData({ status: 218, payload: exits1 });
    }
    const exists2 = this._db
      .filter(data => data._id === _id)
      .find(inStreamSearchAdapter(filters));

    if (!exists2) {
      return new ReturnData({
        status: 518,
        messages: exits1 ? ['Not found'] : ['Filters kill data'],
      });
    }
    return new ReturnData({ status: 218, payload: exists2 });
  };

  countAll: CountAll = async () => {
    const out = this._db.length;
    if (out <= 0) {
      return new ReturnData({ status: 519, messages: ['Empty'] });
    }
    return new ReturnData({ status: 219, payload: this._db.length });
  };

  count: Count<E> = async ({ filters, options }) => {
    const payload = this._db.filter(inStreamSearchAdapter(filters)).length;
    if (payload <= 0) {
      return new ReturnData({ status: 520, messages: ['Empty'] });
    }
    const limit = options?.limit;
    if (limit && limit < payload) {
      return new ReturnData({
        status: 120,
        payload: limit,
        messages: ['Limit Reached'],
      });
    }
    return new ReturnData({ status: 220, payload });
  };

  // #endregion

  updateAll: UpdateAll<E> = async ({ data, options }) => {
    const db = [...this._db];
    if (!db.length) {
      return new ReturnData({ status: 521, messages: ['Empty'] });
    }
    const limit = options?.limit;
    const inputs = db
      .slice(0, limit)
      .map(_data => ({ ..._data, ...data }));
    if (limit && limit < db.length) {
      this._db.length = 0;
      this._db.push(...inputs);
      return new ReturnData({
        status: 121,
        payload: inputs.map(input => input._id),
        messages: ['Limit Reached'],
      });
    }
    return new ReturnData({
      status: 221,
      payload: inputs.map(input => input._id),
    });
  };

  updateMany: UpdateMany<E> = async ({ filters, data, options }) => {
    const db = [...this._db];
    if (!db.length) {
      return new ReturnData({ status: 522, messages: ['Empty'] });
    }

    const _filter = inStreamSearchAdapter(filters);
    const limit = options?.limit;
    const inputs = db.filter(_filter);

    const payload = inputs.slice(0, limit).map(input => input._id);
    if (!inputs.length) {
      return new ReturnData({
        status: 522,
        messages: ['Filters kill data'],
      });
    }

    if (limit && limit < inputs.length) {
      this.__update(payload /*?*/, data);
      return new ReturnData({
        status: 122,
        payload,
        messages: ['Limit Reached'],
      });
    }
    return new ReturnData({
      status: 222,
      payload,
    });
  };

  updateManyByIds: UpdateManyByIds<E> = async ({
    ids,
    filters,
    data,
    options,
  }) => {
    const db = [...this._db];
    if (!db.length) {
      return new ReturnData({ status: 523, messages: ['Empty'] });
    }
    const limit = options?.limit;

    // const mapper = (_data: WI<T>) => ({ ..._data, ...data });

    const inputs1 = db.filter(data => ids.includes(data._id));

    if (!inputs1.length) {
      return new ReturnData({
        status: 523,
        messages: ['ids cannot reach DB'],
      });
    }
    if (!filters) {
      const payload = inputs1.slice(0, limit).map(input => input._id);

      this.__update(payload, data);
      this._db; //?
      if (limit && limit < inputs1.length) {
        return new ReturnData({
          status: 123,
          payload,
          messages: ['Limit Reached'],
        });
      }
      return new ReturnData({
        status: 223,
        payload,
      });
    }
    const _filter = inStreamSearchAdapter(filters);
    const inputs2 = inputs1.filter(_filter);
    inputs2.length; //?
    const payload = inputs2.slice(0, limit).map(input => input._id);

    this.__update(payload, data);

    if (!inputs2.length) {
      return new ReturnData({
        status: 523,
        messages: ['Filters kill data'],
      });
    }
    if (limit && limit < inputs2.length) {
      return new ReturnData({
        status: 123,
        payload,
        messages: ['Limit Reached'],
      });
    }

    if (inputs2.length < inputs1.length) {
      return new ReturnData({
        status: 323,
        payload,
        messages: ['Filters slice datas'],
      });
    }

    return new ReturnData({
      status: 223,
      payload,
    });
  };
  updateOne: UpdateOne<E> = createCRUDMAchine({} as any);

  updateOneById: UpdateOneById<E> = createCRUDMAchine({} as any);

  setAll: SetAll<E> = createCRUDMAchine({} as any);

  setMany: SetMany<E> = createCRUDMAchine({} as any);

  setManyByIds: SetManyByIds<E> = createCRUDMAchine({} as any);

  setOne: SetOne<E> = createCRUDMAchine({} as any);

  setOneById: SetOneById<E> = createCRUDMAchine({} as any);

  deleteAll: DeleteAll = createCRUDMAchine({} as any);

  deleteMany: DeleteMany<E> = createCRUDMAchine({} as any);

  deleteManyByIds: DeleteManyByIds<E> = createCRUDMAchine({} as any);

  deleteOne: DeleteOne<E> = createCRUDMAchine({} as any);

  deleteOneById: DeleteOneById<E> = createCRUDMAchine({} as any);

  retrieveAll: RetrieveAll = createCRUDMAchine({} as any);

  retrieveMany: RetrieveMany<E> = createCRUDMAchine({} as any);

  retrieveManyByIds: RetrieveManyByIds<E> = createCRUDMAchine({} as any);

  retrieveOne: RetrieveOne<E> = createCRUDMAchine({} as any);

  retrieveOneById: RetrieveOneById<E> = createCRUDMAchine({} as any);

  removeAll: RemoveAll = createCRUDMAchine({} as any);

  removeMany: RemoveMany<E> = createCRUDMAchine({} as any);

  removeManyByIds: RemoveManyByIds<E> = createCRUDMAchine({} as any);

  removeOne: RemoveOne<E> = createCRUDMAchine({} as any);

  removeOneById: RemoveOneById<E> = createCRUDMAchine({} as any);
}
