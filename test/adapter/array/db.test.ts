/* eslint-disable @typescript-eslint/no-empty-function */
import { ArrayCRUD_DB } from './../../../src/adapters/array/db';
import { generateSyncMachineTest as ttestM } from '@core_chlbri/test-machine';

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
        data: {
          options: {},
        },
      },
    ],
    tests: [],
  });
});
describe('Update', () => {});
describe('Set', () => {});
describe('Delete', () => {});
describe('Retrieve', () => {});
describe('Remove', () => {});
