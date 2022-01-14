import { generateSyncMachineTest as ttestM } from '@core_chlbri/test-machine';
import { db } from '../db';
import { readOne } from './readOne';

const machine = readOne();
ttestM({
  invite: 'ReadOne',
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
