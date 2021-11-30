"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCRUDMachine = void 0;
const core_1 = require("@core_chlbri/core");
const immer_1 = __importDefault(require("immer"));
const xstate_1 = require("xstate");
const z = __importStar(require("zod"));
const strings_1 = require("../constants/strings");
const machines_1 = require("../schemas/machines");
const strings_2 = require("./../constants/strings");
const helpers_1 = require("./helpers");
function createCRUDMachine({ config, options, status, }) {
    const __states = config.states;
    const _configSchema = (0, machines_1.configSChema)(z.custom(), z.custom());
    // if (!__states) {
    //   throw ERRORS_STRING.object.no_machine_states;
    // }
    // const nocheck2 = Object.keys(__states).length < 1;
    // if (nocheck2) {
    //   throw ERRORS_STRING.object.empty_states;
    // }
    // const nocheck3 = Object.keys(__states).some(
    //   key => stateSchemaCRUD.safeParse(key).success,
    // );
    // if (nocheck3) {
    //   throw ERRORS_STRING.object.states_internal;
    // }
    // const nocheck4 = !!config.initial;
    // if (nocheck4) {
    //   throw ERRORS_STRING.object.initial_exists;
    // }
    // const nocheck5 = !!config.context;
    // if (nocheck5) {
    //   throw ERRORS_STRING.object.context_exits;
    // }
    // const nocheck6 = !__states?.[STATES_COMMON_CRUD.object.checking];
    // if (nocheck6) {
    //   throw ERRORS_STRING.object.no_checking;
    // }
    // if (options) {
    //   const __actions = options.actions;
    //   if (__actions) {
    //     const nocheck7 = Object.keys(__actions).some(
    //       key => actionSchemaCRUD.safeParse(key).success,
    //     );
    //     if (nocheck7) throw ERRORS_STRING.object.actions_internal;
    //   }
    // }
    config.context = {
        iterator: 0,
        response: { status: (500 + status) },
    };
    const _config = (0, immer_1.default)(_configSchema.parse(config), draft => {
        draft.initial = strings_2.STATE_VALUES_CRUD.object.idle;
        draft.states = {
            idle: {
                on: {
                    SEND: {
                        actions: strings_2.ACTIONS_CRUD.object.__assignRequest,
                        target: strings_2.STATES_COMMON_CRUD.object.checking,
                    },
                },
            },
            ...__states,
        };
        Object.assign(draft.states, strings_1.STATES_FINAL);
    });
    const _options = (0, immer_1.default)(machines_1.optionsSchema.parse(options), draft => {
        if (draft === null || draft === void 0 ? void 0 : draft.actions) {
            Object.assign(draft.actions, {
                ...draft.actions,
                ...(0, helpers_1.generateDefaultActions)(status),
            });
        }
        else
            Object.assign(draft, {
                actions: (0, helpers_1.generateDefaultActions)(status),
            });
    });
    (0, core_1.log)('id', _config.id);
    return (0, xstate_1.createMachine)(_config, _options);
}
exports.createCRUDMachine = createCRUDMachine;
