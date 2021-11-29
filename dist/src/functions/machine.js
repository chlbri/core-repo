"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCRUDMachine = void 0;
const core_1 = require("@core_chlbri/core");
const immer_1 = __importDefault(require("immer"));
const xstate_1 = require("xstate");
const strings_1 = require("../constants/strings");
const helpers_1 = require("./helpers");
function createCRUDMachine({ config, options, status, }) {
    const __states = config.states;
    (0, core_1.log)('config', config);
    (0, core_1.log)('states', __states);
    (0, core_1.log)('status', status);
    const context = {
        iterator: 0,
        response: { status: (500 + status) },
    };
    config; //?
    const _config = (0, immer_1.default)(config, draft => {
        Object.assign(draft, { initial: strings_1.STATE_VALUES_CRUD.object.idle });
        Object.assign(draft, { context });
        draft.states = {
            idle: {
                on: {
                    SEND: {
                        actions: ['__assignRequest'],
                        target: 'checking',
                    },
                },
            },
        };
        Object.assign(draft.states, __states);
        Object.assign(draft.states, strings_1.STATES_FINAL);
    });
    const _options = (0, immer_1.default)(options, draft => {
        if (draft === null || draft === void 0 ? void 0 : draft.actions) {
            Object.assign(draft.actions, (0, helpers_1.generateDefaultActions)(status));
        }
    });
    return (0, xstate_1.createMachine)(_config, _options);
}
exports.createCRUDMachine = createCRUDMachine;
