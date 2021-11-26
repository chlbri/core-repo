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
  SetAll,
  SetMany,
  SetManyByIds,
  SetOne,
  SetOneById,
  UpdateAll,
  UpdateMany,
  UpdateManyByIds,
  UpdateOne,
  UpdateOneById,
  UpsertMany,
  UpsertOne,
  WI,
  WO,
} from '../../types/_crud';
import type { DataSearchOperations, SearchOperation } from '../../types/dso';
import { Entity } from '../../entities';
import { inStreamSearchAdapter } from '..';


// type Permission<T extends Entity> = {
//   permissionReader: PermissionsReaderOne<T>;
// };

export class ArrayCRUD_DB<T extends Entity> implements CRUD<T> {
  /* , Permission<T> */
  constructor(
    private _db: WI<T>[],
    private permissions: CollectionPermissions,
  ) {}

  __update = (payload: string[], update: WO<T>) => {
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

  createMany: CreateMany<T> = async ({ data: datas, options }) => {
    const inputs = datas.map(data => ({
      _id: nanoid(),
      ...data,
    })) as WI<T>[];
    if (options && options.limit && options.limit < datas.length) {
      const limit = options.limit;
      const _inputs = inputs.slice(0, limit);
      this._db.push(..._inputs);
      const payload = _inputs.map(input => input._id);
      const messages = ['Limit exceeded'];
      const rd = new ReturnData({ status: 110, payload, messages });
      return rd;
    }

    this._db.push(...inputs);
    const payload = inputs.map(input => input._id) as string[];
    const rd = new ReturnData({ status: 210, payload });
    return rd;
  };

  createOne: CreateOne<T> = async ({ data }) => {
    const input = {
      _id: nanoid(),
      ...data,
    } as WI<T>;

    this._db.push(input);
    const payload = input._id;
    const rd = new ReturnData({ status: 211, payload });
    return rd;
  };

  upsertOne: UpsertOne<T> = async ({ _id, data }) => {
    const _filter = inStreamSearchAdapter({ _id, ...data } as any);
    const _exist = this._db.find(_filter);
    if (_exist) {
      const messages = ['Already exists'];
      return new ReturnData({ status: 312, payload: _id, messages });
    } else {
      this._db.push({ _id: _id ?? nanoid(), ...data });
      return new ReturnData({ status: 212, payload: _id });
    }
  };

  upsertMany: UpsertMany<T> = async ({ upserts, options }) => {
    const inputs = upserts.map(({ _id, data }) => ({
      _id,
      ...data,
    })) as WI<T>[];
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
        return new ReturnData({
          status: 313,
          payload: _inputs.map(input => input._id),
          messages: [`${alreadyExists.length} already exist`],
        });
      } else {
        return new ReturnData({
          status: 113,
          payload: _inputs.map(input => input._id),
        });
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
      return new ReturnData({
        status: 313,
        payload: inputs.map(input => input._id),
        messages: [`${alreadyExists.length} already exist`],
      });
    } else {
      return new ReturnData({
        status: 213,
        payload: inputs.map(input => input._id),
      });
    }
  };

  // #endregion

  // #region Read

  readAll: ReadAll<T> = async options => {
    if (options && options.limit && options.limit < this._db.length) {
      return new ReturnData({
        status: 314,
        payload: this._db.slice(0, options.limit),
        messages: ['Limit Reached'],
      });
    }
    if (!this._db.length) {
      return new ReturnData({
        status: 514,
        messages: ['Empty'],
      });
    }
    return new ReturnData({
      status: 214,
      payload: this._db.slice(0, options?.limit),
    });
  };

  readMany: ReadMany<T> = async ({ filters, options }) => {
    const reads = this._db.filter(inStreamSearchAdapter(filters));
    if (!reads.length) {
      return new ReturnData({
        status: 515,
        messages: ['Empty'],
      });
    }
    if (options && options.limit && options.limit < reads.length) {
      return new ReturnData({
        status: 115,
        payload: reads.slice(0, options.limit),
        messages: ['Limit Reached'],
      });
    }
    return new ReturnData({
      status: 215,
      payload: reads,
    });
  };

  readManyByIds: ReadManyByIds<T> = async ({ ids, filters, options }) => {
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

  readOne: ReadOne<T> = async ({ filters }) => {
    const payload = this._db.find(inStreamSearchAdapter(filters));
    if (payload) {
      return new ReturnData({ status: 217, payload });
    }
    return new ReturnData({ status: 517, messages: ['NotFound'] });
  };

  readOneById: ReadOneById<T> = async ({ _id, filters }) => {
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

  count: Count<T> = async ({ filters, options }) => {
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

  updateAll: UpdateAll<T> = async ({ data, options }) => {
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

  updateMany: UpdateMany<T> = async ({ filters, data, options }) => {
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

  updateManyByIds: UpdateManyByIds<T> = async ({
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
  updateOne: UpdateOne<T> = async () => {
    throw undefined;
  };
  updateOneById: UpdateOneById<T> = async () => {
    throw undefined;
  };
  setAll: SetAll<T> = async () => {
    throw undefined;
  };
  setMany: SetMany<T> = async () => {
    throw undefined;
  };
  setManyByIds: SetManyByIds<T> = async () => {
    throw undefined;
  };
  setOne: SetOne<T> = async () => {
    throw undefined;
  };
  setOneById: SetOneById<T> = async () => {
    throw undefined;
  };
  deleteAll: DeleteAll = async () => {
    throw undefined;
  };
  deleteMany: DeleteMany<T> = async () => {
    throw undefined;
  };
  deleteManyByIds: DeleteManyByIds<T> = async () => {
    throw undefined;
  };
  deleteOne: DeleteOne<T> = async () => {
    throw undefined;
  };
  deleteOneById: DeleteOneById<T> = async () => {
    throw undefined;
  };
  retrieveAll: RetrieveAll = async () => {
    throw undefined;
  };
  retrieveMany: RetrieveMany<T> = async () => {
    throw undefined;
  };
  retrieveManyByIds: RetrieveManyByIds<T> = async () => {
    throw undefined;
  };
  retrieveOne: RetrieveOne<T> = async () => {
    throw undefined;
  };
  retrieveOneById: RetrieveOneById<T> = async () => {
    throw undefined;
  };
  removeAll: RemoveAll = async () => {
    throw undefined;
  };
  removeMany: RemoveMany<T> = async () => {
    throw undefined;
  };
  removeManyByIds: RemoveManyByIds<T> = async () => {
    throw undefined;
  };
  removeOne: RemoveOne<T> = async () => {
    throw undefined;
  };
  removeOneById: RemoveOneById<T> = async () => {
    throw undefined;
  };
}
