/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { assign } from '@xstate/immer';
import { createMachine } from 'xstate';
import { ACTIONS_CRUD } from '../../../constants/strings';
import { Entity } from '../../../entities';
import { createCRUDMachine } from '../../../functions/machine';
import type { CountAll, WithDeepID } from '../../../types';

const ID = 'countAll';
const IDS = {
  guards: {
    dbIsEmpty: 'dbIsEmpty',
    optionsIsDefined: 'optionsIsDefined',
    limitIsDefined: 'limitIsDefined',
    limitIsReached: 'limitIsReached',
  },
  states: {
    checking: 'checking',
    empty_db: 'empty_db',
    check_options: 'check_options',
    check_limit: 'check_limit',
    options: 'options',
    idle: 'idle',
    limit_reached: 'limit_reached',
    information: '#countAll.information',
    success: '#countAll.success',
    server: '#countAll.server',
    redirect: '#countAll.redirect',
  },
  actions: {
    pushEmptyDB: 'pushEmptyDB',
    pushLimitReached: 'pushLimitReached',
    pushOptionsLimit: 'pushOptionsLimit',
    assignPayloadToDBLength: 'assignPayloadToDBLength',
    assignPayloadToLimit: 'assignPayloadToLimit',
  },
  messsages: {
    empty_db: 'empty_db',
    limit_reached: 'limit_reached',
    options_limit: 'options_limit',
  },
} as const;

export function countAll(db: WithDeepID<Entity>[] = []): CountAll {
  return createCRUDMachine({
    config: {
      id: 'countAll',
      states: {
        [IDS.states.checking]: {
          entry: ACTIONS_CRUD.object.__increment,
          always: [
            {
              cond: IDS.guards.dbIsEmpty,
              target: IDS.states.empty_db,
            },
            IDS.states.check_options,
          ],
        },
        [IDS.states.empty_db]: {
          entry: ACTIONS_CRUD.object.__increment,
          always: {
            actions: IDS.actions.assignPayloadToDBLength,
            target: IDS.states.server,
          },
        },
        [IDS.states.check_options]: {
          entry: ACTIONS_CRUD.object.__increment,
          always: [
            {
              cond: IDS.guards.optionsIsDefined,
              target: IDS.states.options
            },
            {
              target: IDS.states.success,
              actions: assign(({ response: { payload } }) => {
                payload = db.length;
              }),
            },
          ],
        },
        [IDS.states.options]: {
          initial: IDS.states.idle,
          states: {
            [IDS.states.idle]: {
              entry: ACTIONS_CRUD.object.__increment,
              always: [
                {
                  cond: IDS.guards.limitIsDefined,
                  target: IDS.states.check_limit,
                },
                {
                  target: IDS.states.information,
                  actions: [
                    IDS.actions.pushOptionsLimit,
                    IDS.actions.assignPayloadToDBLength,
                  ],
                },
              ],
            },
            [IDS.states.check_limit]: {
              entry: ACTIONS_CRUD.object.__increment,
              always: [
                {
                  cond: IDS.guards.limitIsReached,
                  target: IDS.states.limit_reached,
                },
                IDS.states.information,
              ],
            },
            [IDS.states.limit_reached]: {
              entry: ACTIONS_CRUD.object.__increment,
              always: {
                target: IDS.states.redirect,
                actions: [
                  IDS.actions.pushLimitReached,
                  IDS.actions.assignPayloadToLimit,
                ],
              },
            },
          },
        },
      },
    },
    options: {
      guards: {
        [IDS.guards.dbIsEmpty]: () => db.length === 0,
        [IDS.guards.optionsIsDefined]: ({ request: options }) => !!options,
        [IDS.guards.limitIsDefined]: ({ request: options }) =>
          !!options?.limit,
        [IDS.guards.limitIsReached]: ({ request: options }) => {
          const limit = options?.limit;
          return !!limit && limit < db.length;
        },
      },
      actions: {
        [IDS.actions.pushEmptyDB]: assign(({ response: { messages } }) => {
          messages.push(IDS.messsages.empty_db);
        }),
        [IDS.actions.pushLimitReached]: assign(
          ({ response: { messages } }) => {
            messages.push(IDS.messsages.limit_reached);
          },
        ),
        [IDS.actions.pushOptionsLimit]: assign(
          ({ response: { messages } }) => {
            messages.push(IDS.messsages.options_limit);
          },
        ),
        [IDS.actions.assignPayloadToDBLength]: assign(
          ({ response: { payload } }) => {
            payload = db.length;
          },
        ),
        [IDS.actions.assignPayloadToLimit]: assign(
          ({ response: { payload }, request }) => {
            const limit = request?.limit;
            payload = limit;
          },
        ),
      },
    },
    status: 15,
  });
}

type StatesSChema = {
  initial: {};
  loading: {
    states: {
      checkOne: {};
      checkTwo: {};
    };
  };
  final: {};
};
