import type {
  CreateMany,
  CreateOne,
  UpsertOne,
  UpsertMany,
  UpdateAll,
  UpdateMany,
  UpdateManyByIds,
  UpdateOne,
  UpdateOneById,
  SetAll,
  SetMany,
  SetManyByIds,
  SetOne,
  SetOneById,
  DeleteAll,
  DeleteMany,
  DeleteManyByIds,
  DeleteOne,
  DeleteOneById,
  RetrieveAll,
  RetrieveMany,
  RetrieveManyByIds,
  RetrieveOne,
  RetrieveOneById,
  RemoveAll,
  RemoveMany,
  RemoveManyByIds,
  RemoveOne,
  RemoveOneById,
} from './mutation';
import type {
  ReadAll,
  ReadMany,
  ReadManyByIds,
  ReadOne,
  ReadOneById,
  CountAll,
  Count,
} from './query';
import { Entity } from '../../entities';

export interface CRUD<T extends Entity> {
  createMany: CreateMany<T>;
  createOne: CreateOne<T>;
  upsertOne: UpsertOne<T>;
  upsertMany: UpsertMany<T>;
  readAll: ReadAll<T>;
  readMany: ReadMany<T>;
  readManyByIds: ReadManyByIds<T>;
  readOne: ReadOne<T>;
  readOneById: ReadOneById<T>;
  countAll: CountAll;
  count: Count<T>;
  updateAll: UpdateAll<T>;
  updateMany: UpdateMany<T>;
  updateManyByIds: UpdateManyByIds<T>;
  updateOne: UpdateOne<T>;
  updateOneById: UpdateOneById<T>;
  setAll: SetAll<T>;
  setMany: SetMany<T>;
  setManyByIds: SetManyByIds<T>;
  setOne: SetOne<T>;
  setOneById: SetOneById<T>;
  deleteAll: DeleteAll;
  deleteMany: DeleteMany<T>;
  deleteManyByIds: DeleteManyByIds<T>;
  deleteOne: DeleteOne<T>;
  deleteOneById: DeleteOneById<T>;
  retrieveAll: RetrieveAll;
  retrieveMany: RetrieveMany<T>;
  retrieveManyByIds: RetrieveManyByIds<T>;
  retrieveOne: RetrieveOne<T>;
  retrieveOneById: RetrieveOneById<T>;
  removeAll: RemoveAll;
  removeMany: RemoveMany<T>;
  removeManyByIds: RemoveManyByIds<T>;
  removeOne: RemoveOne<T>;
  removeOneById: RemoveOneById<T>;
}
