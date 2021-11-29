/* eslint-disable @typescript-eslint/no-empty-function */
import { ArrayCRUD_DB } from '../../../src/adapters/array/db';
import { generateSyncMachineTest as ttestM } from '@core_chlbri/test-machine';
import {
  ACTIONS_CRUD,
  STATESF_CRUD,
  STATES_COMMON_CRUD,
  STATE_VALUES_CRUD,
} from '../../../src/constants/strings';
import { createCRUDMachine } from '../../../src/functions/machine';
import { ReadAll, WithoutDeepID } from '../../../src/types/crud';
import { assign } from '@xstate/immer';
import { Entity } from '../../../src';
import { log } from '@core_chlbri/core';

const db = new ArrayCRUD_DB([], {
  __create: [],
  __read: [],
  __remove: [],
  __write: [],
});

const _db: WithoutDeepID<Entity>[] = [];
const machine: ReadAll<Entity> = createCRUDMachine({
  config: {
    id: 'readAll',
    states: {
      checking: {
        always: [
          {
            cond: () => _db.length < 1,
            target: 'empty_db',
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
            cond: ({ request }) => !!request?.options?.limit,
            target: 'options_limit',
          },
          {
            target: STATESF_CRUD.object.success,
            actions: assign(({ response: { payload } }) => {
              Object.assign(payload, _db);
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
                  return !!limit && limit < _db.length;
                },
                target: 'limit_reached',
              },
              {
                target: `#readAll.information`,
                actions: assign(({ response: { messages, payload } }) => {
                  messages = ['options_limit'];
                  Object.assign(payload, _db);
                }),
              },
            ],
          },
          limit_reached: {
            entry: ACTIONS_CRUD.object.__increment,
            always: {
              actions: assign(
                ({ response: { payload, messages }, request }) => {
                  messages = ['limit_reached'];
                  const limit = request?.options?.limit;
                  Object.assign(payload, _db.slice(0, limit));
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

describe('Create', () => {});

describe('Read', () => {
  ttestM({
    invite: 'ReadAll',
    machine,
    events: [
      {
        type: 'SEND',
      },
    ],
    tests: [
      { value: STATE_VALUES_CRUD.object.idle },
      { value: STATE_VALUES_CRUD.object.server },
      // { value: STATES_COMMON_CRUD.object.empty_db },
      // { value: STATE_VALUES_CRUD.object.server },
    ],
  });
});
describe('Update', () => {});
describe('Set', () => {});
describe('Delete', () => {});
describe('Retrieve', () => {});
describe('Remove', () => {});
