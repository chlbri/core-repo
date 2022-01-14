/* eslint-disable @typescript-eslint/no-unused-vars */
import { assign } from '@xstate/immer';
import { Entity } from '../../../entities';
import { createCRUDMachine } from '../../../functions/machine';
import { ReadOneById } from '../../../types';
import { db } from '../db';
import { inStreamSearchAdapter } from '../resolver';

export function readOneById<E extends Entity = Entity>(): ReadOneById<E> {
  return createCRUDMachine({
    config: {
      id: 'readOneById',
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
            'findId',
          ],
        },
        findId: {
          entry: '__increment',
          always: {
            actions: assign(({ response: { payload }, request }) => {
              const _id = request?._id;
              if (!_id) return;
              if (!payload) return;
              Object.assign(
                payload,
                db.find(data => (data._id = _id)),
              );
            }),
            target: 'check_filters',
          },
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
          states: {
            idle: {
              entry: '__increment',

              always: {
                target: 'check_payload',
                actions: assign(({ response: { payload }, request }) => {
                  const filters = request?.filters;
                  if (!filters) return;
                  if (!payload) return;
                  Object.assign(
                    payload,
                    [payload].find(inStreamSearchAdapter(filters as any)),
                  );
                }),
              },
            },
            check_payload: {
              entry: '__increment',
              always: [
                {
                  cond: ({ response: { payload } }) => !payload,
                  target: 'no_payload',
                },
                'payload',
              ],
            },
            no_payload: {
              entry: '__increment',
              always: {
                actions: assign(({ response: { messages } }) => {
                  messages.push('filter_kill_data');
                }),
                target: '#readOneById.redirect',
              },
            },
            payload: {
              entry: '__increment',
              always: '#readOneById.check_options',
            },
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
