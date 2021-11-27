"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCRUDMAchine = void 0;
const nanoid_1 = require("nanoid");
const xstate_1 = require("xstate");
const strings_1 = require("../constants/strings");
function writeFinalState(str) {
    return {
        [str]: {
            entry: strings_1.ACTIONS.object.increment,
            type: 'final',
        },
    };
}
function createCRUDMAchine({ src, id = (0, nanoid_1.nanoid)(), status = 400, }) {
    const finalStates = strings_1.STATES.array
        .filter(state => state !== 'idle' && state !== 'pending')
        .map(writeFinalState)
        .reduce((acc, curr) => {
        Object.assign(acc, curr);
        return acc;
    }, {});
    const machine = (0, xstate_1.createMachine)({
        initial: 'idle',
        id,
        context: { status, iterator: 0 },
        states: {
            [strings_1.STATES.object.idle]: {
                on: {
                    SEND: strings_1.STATES.object.pending,
                },
            },
            [strings_1.STATES.object.pending]: {
                entry: strings_1.ACTIONS.object.increment,
                invoke: {
                    src,
                    onDone: {
                        target: strings_1.STATES.object.information,
                        actions: strings_1.ACTIONS.object.assign,
                    },
                },
            },
            ...finalStates,
        },
    }, {
        services: {
            src,
        },
        actions: {
            [strings_1.ACTIONS.object.increment]: (0, xstate_1.assign)({
                iterator: ({ iterator }) => iterator + 1,
            }),
            [strings_1.ACTIONS.object.assign]: (0, xstate_1.assign)((ctx, { data }) => ({
                ...ctx,
                ...data,
            })),
        },
    });
    return machine;
}
exports.createCRUDMAchine = createCRUDMAchine;
const src = (c, e, f) => {
    return Promise.resolve({ status: 100, payload: true });
};
const machine = createCRUDMAchine({
    src,
});
const service = (0, xstate_1.interpret)(machine).start();
service.onTransition(state => {
    state.context; //?
});
service.send('SEND');
// #endregion
