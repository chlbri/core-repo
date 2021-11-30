/* eslint-disable @typescript-eslint/no-unused-vars */
import { assign } from '@xstate/immer';
import { Entity } from '../../../entities';
import { createCRUDMachine } from '../../../functions/machine';
import { ReadAll } from '../../../types';
import { db } from '../db';

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
