/* eslint-disable @typescript-eslint/no-unused-vars */
import { assign } from '@xstate/immer';
import { Entity } from '../../../entities';
import { createCRUDMachine } from '../../../functions/machine';
import { ReadMany, WithDeepID } from '../../../types';
import { inStreamSearchAdapter } from '../resolver';

export function readMany<E extends Entity = Entity>(
  db: WithDeepID<E>[] = [],
): ReadMany<E> {
  return createCRUDMachine({
    config: {
      id: 'readMany',
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
            'check_filters',
          ],
        },
        empty_db: {
          entry: '__increment',
          always: {
            actions: assign(({ response: { messages } }) => {
              messages.push('empty_db');
            }),
            target: 'server',
          },
        },
        check_filters: {
          entry: '__increment',
          always: [
            {
              cond: ({ request }) => {
                return !!request?.filters;
              },
              target: 'filters',
            },
            {
              target: 'success',
              actions: assign(({ response: { payload } }) => {
                Object.assign(payload, db);
              }),
            },
          ],
        },
        filters: {
          entry: '__increment',
          always: {
            target: 'check_options',
            actions: assign(({ response: { payload }, request }) => {
              const filters = request?.filters;
              if (!filters) return;
              Object.assign(
                payload,
                db.filter(inStreamSearchAdapter(filters as any)),
              );
            }),
          },
        },
        check_options: {
          entry: '__increment',
          always: [
            {
              cond: ({ request }) => !!request?.options?.limit,
              target: 'options',
            },
            'success',
          ],
        },
        options: {
          initial: 'idle',
          states: {
            idle: {
              entry: '__increment',
              always: [
                {
                  cond: ({ request, response: { payload } }) => {
                    const limit = request?.options?.limit;
                    return !!limit && !!payload && limit < payload.length;
                  },
                  target: 'limit_reached',
                },
                {
                  target: `#readMany.information`,
                  actions: assign(({ response: { messages } }) => {
                    messages.push('options_limit');
                  }),
                },
              ],
            },
            limit_reached: {
              entry: '__increment',
              always: {
                actions: assign(
                  ({ response: { payload, messages }, request }) => {
                    messages.push('limit_reached');
                    const limit = request?.options?.limit;
                    if (!payload) throw 'payload_not_defined';
                    Object.assign(payload, payload.slice(0, limit));
                  },
                ),
                target: `#readMany.redirect`,
              },
            },
          },
        },
      },
    },
    options: {},
    status: 16,
  });
}
