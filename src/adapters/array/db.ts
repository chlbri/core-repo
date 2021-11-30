/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { assign } from '@xstate/immer';
import { produce } from 'immer';
import { CollectionPermissions, Entity } from '../../entities';
import { createCRUDMachine } from '../../functions/machine';
import { CreateMany, ReadAll, WithoutDeepID } from '../../types/crud';

// type Permission<T extends Entity> = {
//   permissionReader: PermissionsReaderOne<T>;
// };

export class ArrayCRUD_DB<E extends Entity> /* implements CRUD<E> */ {
  /* , Permission<T> */
  constructor(
    private _db: WithoutDeepID<E>[],
    private permissions?: CollectionPermissions,
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

  createMany: CreateMany<E> = createCRUDMachine({
    status: 11,
    config: {},
    options: {},
  });
  // #endregion

  // #region Read

  readAll: ReadAll<E> = createCRUDMachine({
    config: {
      id: 'readAll',
      states: {
        checking: {
          always: [
            {
              cond: () => true,
              target: 'empty_db',
            },
            'empty_db',
          ],
        },
        empty_db: {
          entry: '__increment',
          always: {
            actions: assign(({ response: { messages } }) => {
              messages = ['empty_db'];
            }),
            target: 'server',
          },
        },
        check_options_limit: {
          entry: '__increment',
          always: [
            {
              cond: ({ request }) => !!request?.options?.limit,
              target: 'options_limit',
            },
            {
              target: 'success',
              actions: assign(({ response: { payload } }) => {
                Object.assign(payload, []);
              }),
            },
          ],
        },
        options_limit: {
          initial: 'idle',
          states: {
            idle: {
              entry: '__increment',
              always: [
                {
                  cond: ({ request }) => {
                    const limit = request?.options?.limit;
                    return !!limit && limit < [].length;
                  },
                  target: 'limit_reached',
                },
                {
                  target: `#readAll.information`,
                  actions: assign(
                    ({ response: { messages, payload } }) => {
                      messages = ['options_limit'];
                      Object.assign(payload, []);
                    },
                  ),
                },
              ],
            },
            limit_reached: {
              entry: '__increment',
              always: {
                actions: assign(
                  ({ response: { payload, messages }, request }) => {
                    messages = ['limit_reached'];
                    const limit = request?.options?.limit;
                    Object.assign(payload, [].slice(0, limit));
                  },
                ),
                target: `#readAll.redirect`,
              },
            },
          },
        },
      },
    },
    options: {},
    status: 15,
  });
}

const db: WithoutDeepID<Entity>[] = [];

export function readAll<E extends Entity = Entity>(): ReadAll<E> {
  return createCRUDMachine({
    config: {
      id: 'readAll',
      states: {
        checking: {
          always: [
            {
              cond: () => db.length < 0,
              target: 'empty_db',
            },
            'empty_db',
          ],
        },
        empty_db: {
          entry: '__increment',
          always: {
            actions: assign(({ response: { messages } }) => {
              messages = ['empty_db'];
            }),
            target: 'server',
          },
        },
        check_options_limit: {
          entry: '__increment',
          always: [
            {
              cond: ({ request }) => !!request?.options?.limit,
              target: 'options_limit',
            },
            {
              target: 'success',
              actions: assign(({ response: { payload } }) => {
                Object.assign(payload, db);
              }),
            },
          ],
        },
        options_limit: {
          initial: 'idle',
          states: {
            idle: {
              entry: '__increment',
              always: [
                {
                  cond: ({ request }) => {
                    const limit = request?.options?.limit;
                    return !!limit && limit < db.length;
                  },
                  target: 'limit_reached',
                },
                {
                  target: `#readAll.information`,
                  actions: assign(
                    ({ response: { messages, payload } }) => {
                      messages = ['options_limit'];
                      Object.assign(payload, []);
                    },
                  ),
                },
              ],
            },
            limit_reached: {
              entry: '__increment',
              always: {
                actions: assign(
                  ({ response: { payload, messages }, request }) => {
                    messages = ['limit_reached'];
                    const limit = request?.options?.limit;
                    Object.assign(payload, db.slice(0, limit));
                  },
                ),
                target: `#readAll.redirect`,
              },
            },
          },
        },
      },
    },
    options: {},
    status: 15,
  });
}
