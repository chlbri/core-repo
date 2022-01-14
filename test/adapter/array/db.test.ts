/* eslint-disable @typescript-eslint/no-empty-function */
import { log } from '@core_chlbri/core';
import { generateSyncMachineTest as ttestM } from '@core_chlbri/test-machine';
import { db } from '../../../src/adapters/array/db';
import { readAll } from '../../../src/adapters/array/read/readAll';

describe('Create', () => {});

describe('ReadAll', () => {
  const machine = readAll();
  ttestM({
    invite: 'ReadAll',
    machine,
    events: [{ type: 'SEND' }],
    beforeAll: {
      fn: () => {
        db.length = 0;
      },
    },
    tests: [
      { value: 'idle' },
      // { value: 'checking' },
      { value: 'server' },
      // { value: STATES_COMMON_CRUD.object.empty_db },
      // { value: STATE_VALUES_CRUD.object.server },
    ],
    subscribers: [
      state => {
        console.log(state.value);
      },
    ],
  });
});
describe('Update', () => {});
describe('Set', () => {});
describe('Delete', () => {});
describe('Retrieve', () => {});
describe('Remove', () => {});
