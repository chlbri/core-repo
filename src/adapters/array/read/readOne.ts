/* eslint-disable @typescript-eslint/no-unused-vars */
import { assign } from '@xstate/immer';
import { Entity } from '../../../entities';
import { createCRUDMachine } from '../../../functions/machine';
import { ReadOne } from '../../../types';
import { db } from '../db';
import { inStreamSearchAdapter } from '../resolver';

export function readOne<E extends Entity = Entity>(): ReadOne<E> {
  return createCRUDMachine({
    config: {
      id: 'readOne',
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
            'check_options',
          ],
        },
        filters: {
          entry: '__increment',
          always: {
            target: 'check_options',
            actions: assign(({ response: { payload }, request }) => {
              const filters = request?.filters;
              if (!filters) return;
              if (!payload) return;
              Object.assign(
                payload,
                db.find(inStreamSearchAdapter(filters as any)),
              );
            }),
          },
        },
        check_options: {
          entry: '__increment',
          always: ['success'],
        },
      },
    },
    options: {},
    status: 16,
  });
}
