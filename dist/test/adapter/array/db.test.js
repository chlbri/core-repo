"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_machine_1 = require("@core_chlbri/test-machine");
const read_1 = require("../../../src/adapters/array/query/read");
describe('Create', () => { });
describe('Read', () => {
    const machine = (0, read_1.readAll)();
    (0, test_machine_1.generateSyncMachineTest)({
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
describe('Update', () => { });
describe('Set', () => { });
describe('Delete', () => { });
describe('Retrieve', () => { });
describe('Remove', () => { });
