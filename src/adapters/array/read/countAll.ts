// import { createCRUDMachine } from "../../../functions/machine";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { CountAll } from '../../../types/crud/query/count';
import { Entity } from '../../../entities';
import { createCRUDMachine } from '../../../functions/machine';
import { db } from '../db';
import { assign } from '@xstate/immer';

export function countAll(): CountAll {
  return createCRUDMachine({
    config: {
      id: 'countAll',
      states: {
        checking: {
          entry: '__increment',
          always: [
            {
              cond: () => db.length === 0,
              target: 'empty_db',
              actions: () => {
                console.log('okkk');
              },
            },
            'check_options_limit',
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
              cond: ({ request }) => !!request?.limit,
              target: 'options_limit',
            },
            {
              target: 'success',
              actions: assign(({ response: { payload } }) => {
                payload = db.length;
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
                    const limit = request?.limit;
                    return !!limit && limit < db.length;
                  },
                  target: 'limit_reached',
                },
                {
                  target: `#countAll.information`,
                  actions: assign(
                    ({ response: { messages, payload } }) => {
                      messages = ['options_limit'];
                      payload = db.length;
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
                    const limit = request?.limit;
                    payload = limit;
                  },
                ),
                target: `#countAll.redirect`,
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
