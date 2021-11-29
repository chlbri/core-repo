"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inStreamSearchAdapter = exports.inStreamSearchAdapterKey = void 0;
const lite_1 = require("dequal/lite");
const __1 = require("../..");
function inStreamSearchAdapterKey(op) {
    // if (!op) return () => true;
    const keys = Object.keys(op);
    if (keys.every(key => !key.includes('$'))) {
        return (arg) => {
            if (typeof arg === 'string' ||
                typeof arg === 'number' ||
                typeof arg === 'bigint' ||
                typeof arg === 'boolean' ||
                typeof arg === 'undefined' ||
                Object.keys(keys) === Object.keys(arg)) {
                return (0, lite_1.dequal)(op, arg);
            }
            return inStreamSearchAdapter(op)(arg);
        };
    }
    const entries = Object.entries(op);
    const switcherFunctionsByKeys = ([key, value]) => {
        switch (key) {
            // #region Object
            case '$exists':
                return (arg) => {
                    const sw = arg !== undefined && arg !== null;
                    return value ? sw : !sw;
                };
            case '$eq':
                return (arg) => (0, lite_1.dequal)(arg, value);
            case '$ne':
                return (arg) => !(0, lite_1.dequal)(arg, value);
            case '$in':
                return (arg) => {
                    return value.some(val => (0, lite_1.dequal)(arg, val));
                };
            case '$nin':
                return (arg) => {
                    return value.every(val => !(0, lite_1.dequal)(arg, val));
                };
            // #endregion
            // #region Number
            case '$gt':
                return (arg) => arg > value;
            case '$gte':
                return (arg) => arg >= value;
            case '$lt':
                return (arg) => arg < value;
            case '$lte':
                return (arg) => arg <= value;
            case '$mod':
                return (arg) => arg % value === 0;
            // #endregion
            // #region String
            case '$cts':
                return (arg) => arg.includes(value);
            case '$sw':
                return (arg) => arg.trim().startsWith(value);
            case '$ew':
                return (arg) => arg.trim().endsWith(value);
            // #endregion
            // #region Array
            case '$all':
                return (arg) => arg.every(val => (0, lite_1.dequal)(val, value));
            case '$em':
                return (arg) => arg.some(val => (0, lite_1.dequal)(val, value));
            case '$size':
                return (arg) => arg.length === value;
            // #endregion
            // #region Logicals
            case '$and':
                return (arg) => {
                    const val = value;
                    const out = val.reduce((acc, curr) => {
                        const search = inStreamSearchAdapterKey(curr)(arg);
                        return acc && search;
                    }, true);
                    return out;
                };
            case '$not':
                return (arg) => {
                    const val = value;
                    const out = !inStreamSearchAdapterKey(val)(arg);
                    return out;
                };
            case '$nor':
                return (arg) => {
                    const val = value;
                    const out = val.reduce((acc, curr) => {
                        const search = inStreamSearchAdapterKey(curr)(arg);
                        return acc && !search;
                    }, true);
                    return out;
                };
            case '$or':
                return (arg) => {
                    const values = value;
                    let out = false;
                    for (const curr of values) {
                        out = inStreamSearchAdapterKey(curr)(arg);
                        if (out)
                            break;
                    }
                    return out;
                };
            // #endregion
            default:
                return () => false;
        }
    };
    const funcs = entries.map(switcherFunctionsByKeys);
    const resolver = (arg) => {
        return funcs.reduce((acc, curr) => acc && curr(arg), true);
    };
    return resolver;
}
exports.inStreamSearchAdapterKey = inStreamSearchAdapterKey;
function inStreamSearchAdapter(filter) {
    const funcs = [];
    if ((0, __1.isNotClause)(filter)) {
        const entries = Object.entries(filter.$not);
        entries.forEach(([key, value]) => {
            if (value) {
                const func = (arg) => {
                    return inStreamSearchAdapterKey(value)(arg[key]);
                };
                funcs.push(func);
            }
        });
    }
    else {
        const entries = Object.entries(filter);
        entries.forEach(([key, value]) => {
            if (value) {
                const func = (arg) => {
                    return inStreamSearchAdapterKey(value)(arg[key]);
                };
                funcs.push(func);
            }
        });
    }
    const resolver = (arg) => {
        return funcs.reduce((acc, curr) => acc && curr(arg), true);
    };
    return resolver;
}
exports.inStreamSearchAdapter = inStreamSearchAdapter;
