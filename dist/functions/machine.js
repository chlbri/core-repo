"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCRUDMachine = void 0;
const immer_1 = __importDefault(require("immer"));
const xstate_1 = require("xstate");
const __1 = require("..");
const strings_1 = require("../constants/strings");
const helpers_1 = require("./helpers");
function createCRUDMachine({ config, options, }) {
    const __states = config.states;
    if (!__states) {
        throw strings_1.ERRORS_STRING.object.empty_states;
    }
    const nocheck2 = Object.keys(__states).length < 1;
    if (nocheck2) {
        throw strings_1.ERRORS_STRING.object.no_machine_states;
    }
    const nocheck3 = Object.keys(__states).some(key => __1.stateSchemaCRUD.safeParse(key).success);
    if (nocheck3) {
        throw strings_1.ERRORS_STRING.object.states_internal;
    }
    const nocheck4 = !!config.context;
    if (nocheck4) {
        throw strings_1.ERRORS_STRING.object.context_exits;
    }
    if (options) {
        const __actions = options.actions;
        if (__actions) {
            const nocheck5 = Object.keys(__actions).some(key => __1.actionSchemaCRUD.safeParse(key).success);
            if (nocheck5)
                throw strings_1.ERRORS_STRING.object.actions_internal;
        }
    }
    const context = {
        iterator: 0,
        response: { status: 404 },
    };
    const _config = (0, immer_1.default)(config, draft => {
        draft.initial = strings_1.STATE_VALUES_CRUD.object.idle;
        if (draft) {
            draft.context = context;
            draft.states = { [strings_1.STATE_VALUES_CRUD.object.idle]: {} };
            Object.assign(draft.states, __states);
            Object.assign(draft.states, strings_1.STATES_FINAL);
        }
    });
    const _options = (0, immer_1.default)(options, draft => {
        if (draft) {
            Object.assign(draft.actions, (0, helpers_1.generateDefaultActions)());
        }
    });
    return (0, xstate_1.createMachine)(_config, _options);
}
exports.createCRUDMachine = createCRUDMachine;
