/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { produce } from 'immer';
import {
  ACTIONS_CRUD,
  STATES_COMMON_CRUD,
  STATE_VALUES_CRUD,
} from '../../constants/strings';
import { CollectionPermissions, Entity } from '../../entities';
import { createCRUDMachine } from '../../functions/machine';
import { ReadMany, WithoutDeepID } from '../../types/crud';

// type Permission<T extends Entity> = {
//   permissionReader: PermissionsReaderOne<T>;
// };

export class ArrayCRUD_DB<E extends Entity> /* implements CRUD<E> */ {
  /* , Permission<T> */
  constructor(
    private _db: WithoutDeepID<E>[],
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
  };

  rinitDB() {
    this._db.length = 0;
  }

  get length() {
    return this._db.length;
  }

  isEmpty() {
    return this._db.length === 0;
  }

  // readonly permissionReaderMany: PermissionsReaderMany<T> = dso => {
  //   const datas = this._db.filter(inStreamSearchAdapter(dso));
  //   const out = datas.map(getPermissions);
  //   return out;
  // };
  // readonly permissionReaderOne: PermissionsReaderOne<T> = dso =>
  //   this.permissionReaderMany(dso)[0];

  // #region Create

  // #endregion

  // #region Read

  readMany: ReadMany<E> = createCRUDMachine({
    config: {
      id: 'readAll',
      initial: STATE_VALUES_CRUD.object.idle,
      states: {
        [STATE_VALUES_CRUD.object.idle]: {
          on: {
            SEND: [
              { actions: [ACTIONS_CRUD.object.__assignRequest] },
              {
                cond: this.isEmpty,
                target: STATES_COMMON_CRUD.object.empty_db,
              },
              { target: STATES_COMMON_CRUD.object.check_options_limit },
            ],
          },
        },
        [STATES_COMMON_CRUD.object.empty_db]: {
          entry: ACTIONS_CRUD.object.__increment,
          type: 'final',
          data: {
            status: 515,
            messages: [STATES_COMMON_CRUD.object.empty_db],
          },
        },
        [STATES_COMMON_CRUD.object.check_options_limit]: {
          entry: ACTIONS_CRUD.object.__increment,

          always: [
            {
              cond: (_, { data }) => !!data?.options?.limit,
              target: STATES_COMMON_CRUD.object.options_limit,
            },
            { target: STATES_COMMON_CRUD.object.no_options_limit },
          ],
        },
        [STATES_COMMON_CRUD.object.no_options_limit]: {
          initial: STATE_VALUES_CRUD.object.idle,
          states: {
            idle: {
              entry: ACTIONS_CRUD.object.__increment,

              always: [
                {
                  cond: ({ request }) => {
                    const limit = request?.options?.limit;
                    return !!limit && limit < this._db.length;
                  },
                  target: STATES_COMMON_CRUD.object.limit_reached,
                },
                { target: '#readAll.nolimit' },
              ],
            },
            [STATES_COMMON_CRUD.object.limit_reached]: {
              entry: ACTIONS_CRUD.object.__increment,
            },
          },
        },
        [STATES_COMMON_CRUD.object.options_limit]: {
          type: 'final',
          data: ({ response }) => response,
        },
      },
    },
    options: {},
  });
}
