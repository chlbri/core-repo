/* eslint-disable @typescript-eslint/no-unused-vars */
import { assign } from '@xstate/immer';
import { Entity } from '../../../entities';
import { createCRUDMachine } from '../../../functions/machine';
import { Count, WithDeepID } from '../../../types';
import { inStreamSearchAdapter } from '../resolver';

export function count<E extends Entity = Entity>(
  db: WithDeepID<E>[] = [],
): Count<E> {
  return createCRUDMachine({
    config: {
      id: 'count',
      states: {
        checking: {
          entry: '__increment',
          always: [
            {
              cond: () => db.length === 0,
              target: 'empty_db',
            },
            'check_filters',
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
                payload = db.length;
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
              payload = db.filter(
                inStreamSearchAdapter(filters as any),
              ).length;
            }),
          },
        },
        check_options: {
          entry: '__increment',
          always: [
            {
              cond: ({ request }) => {
                return !!request?.options;
              },
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
                    return !!limit && !!payload && limit < payload;
                  },
                  target: 'limit_reached',
                },
                {
                  target: `#count.information`,
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
                    if (limit) payload = limit;
                  },
                ),
                target: `#count.redirect`,
              },
            },
          },
        },
      },
    },
    options: {},
    status: 17,
  });
}
