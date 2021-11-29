/* eslint-disable @typescript-eslint/no-empty-function */
import { ArrayCRUD_DB } from './../../../src/adapters/array/db';
import { generateSyncMachineTest as ttestM } from '@core_chlbri/test-machine';
import {
  STATES_COMMON_CRUD,
  STATE_VALUES_CRUD,
} from '../../../src/constants/strings';

const db = new ArrayCRUD_DB([], {
  __create: [],
  __read: [],
  __remove: [],
  __write: [],
});

describe('Create', () => {});

describe('Read', () => {
  ttestM({
    invite: 'ReadAll',
    machine: db.readAll,
    events: [
      {
        type: 'SEND',
      },
    ],
    tests: [
      { value: STATE_VALUES_CRUD.object.idle },
      { value: STATES_COMMON_CRUD.object.checking },
      { value: STATES_COMMON_CRUD.object.empty_db },
      { value: STATE_VALUES_CRUD.object.server },
    ],
  });
});
describe('Update', () => {});
describe('Set', () => {});
describe('Delete', () => {});
describe('Retrieve', () => {});
describe('Remove', () => {});
