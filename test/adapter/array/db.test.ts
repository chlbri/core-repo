/* eslint-disable @typescript-eslint/no-empty-function */
import { log } from '@core_chlbri/core';
import { generateSyncMachineTest as ttestM } from '@core_chlbri/test-machine';
import { readAll } from '../../../src/adapters/array/db';

describe('Create', () => {});

describe('Read', () => {
  const machine = readAll();
  ttestM({
    invite: 'ReadAll',
    machine,
    events: ['SEND'],
    tests: [
      { value: 'idle' },
      { value: 'server' },
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
