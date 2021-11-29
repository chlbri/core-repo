"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Test <TT>
const TT_test1 = {
    value: 'information',
    context: {
        iterator: 0,
        request: true,
        response: {
            status: 100,
            payload: '',
            messages: undefined,
            notPermitteds: undefined,
        },
    },
};
const TT_test11 = {
    value: 'information',
    context: {
        iterator: 0,
        request: true,
        response: {
            status: 100,
            payload: '',
            messages: ['info1', 'info2'],
            notPermitteds: undefined,
        },
    },
};
const TT_test2 = {
    value: 'success',
    context: {
        iterator: 0,
        request: true,
        response: { status: 200, payload: '', notPermitteds: undefined },
    },
};
const TT_test3 = {
    value: 'redirect',
    context: {
        iterator: 0,
        request: true,
        response: {
            status: 300,
            payload: undefined,
            notPermitteds: undefined,
            messages: ['red2'],
        },
    },
};
const TT_test4 = {
    value: 'client',
    context: {
        iterator: 0,
        request: true,
        response: {
            status: 430,
            payload: undefined,
            messages: ['client1'],
            notPermitteds: undefined,
        },
    },
};
const TT_test5 = {
    value: 'server',
    context: {
        iterator: 0,
        request: true,
        response: {
            status: 500,
            payload: undefined,
            messages: ['serv1'],
            notPermitteds: undefined,
        },
    },
};
const TT_test6 = {
    value: 'permission',
    context: {
        iterator: 0,
        request: false,
        response: {
            status: 600,
            payload: undefined,
            messages: ['perm1'],
            notPermitteds: ['perm2'],
        },
    },
};
const TT_test7 = {
    value: 'timeout',
    context: {
        iterator: 0,
        request: true,
        response: {
            status: 997,
            payload: undefined,
            notPermitteds: undefined,
            messages: undefined,
        },
    },
};
const test3 = {
    on: (() => {
        throw undefined;
    })(),
};
