"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertObjectToMask = exports.convertObjectTo = exports.convertObjectToArrayMask = exports.convertUnionStringToMask = exports.getLiteralValues = exports.getLiteralValuesInObject = exports.getLiteralValuesInArray = void 0;
const zod_1 = require("zod");
function getLiteralValuesInArray(union) {
    return union.options.map(un => un._def.value);
}
exports.getLiteralValuesInArray = getLiteralValuesInArray;
function getLiteralValuesInObject(union) {
    return union.options
        .map(un => un._def.value)
        .reduce((acc, curr) => {
        acc[curr] = curr;
        return acc;
    }, {});
}
exports.getLiteralValuesInObject = getLiteralValuesInObject;
function getLiteralValues(union) {
    return {
        object: getLiteralValuesInObject(union),
        array: getLiteralValuesInArray(union),
    };
}
exports.getLiteralValues = getLiteralValues;
function convertUnionStringToMask(union) {
    const processed = getLiteralValuesInArray(union);
    const out = processed
        .map(un => ({ [un]: true }))
        .reduce((acc, curr) => {
        Object.assign(acc, curr);
        return acc;
    }, {});
    return out;
}
exports.convertUnionStringToMask = convertUnionStringToMask;
function convertObjectToArrayMask(obj) {
    const processed = obj.shape;
    return Object.keys(processed);
}
exports.convertObjectToArrayMask = convertObjectToArrayMask;
function convertObjectTo(obj, to) {
    const preprocesseds = convertObjectToArrayMask(obj);
    const processed = preprocesseds
        .map(processed => ({ [processed]: to }))
        .reduce((acc, curr) => {
        Object.assign(acc, curr);
        return acc;
    }, {});
    const out = (0, zod_1.object)(processed);
    return out;
}
exports.convertObjectTo = convertObjectTo;
function convertObjectToMask(obj) {
    const processeds = convertObjectToArrayMask(obj);
    const out = processeds
        .map(processed => ({ [processed]: true }))
        .reduce((acc, curr) => {
        Object.assign(acc, curr);
        return acc;
    }, {});
    return out;
}
exports.convertObjectToMask = convertObjectToMask;
const test1 = convertObjectToArrayMask((0, zod_1.object)({ guard: (0, zod_1.literal)(true), mil: (0, zod_1.literal)('yugduy') }));
const test2 = convertObjectToMask((0, zod_1.object)({ guard: (0, zod_1.literal)(true), mil: (0, zod_1.literal)('yugduy') }));
const test3 = convertObjectTo((0, zod_1.object)({ guard: (0, zod_1.literal)(true), mil: (0, zod_1.literal)('yugduy') }), (0, zod_1.object)({ to: (0, zod_1.literal)('empty') }));
const test4 = (0, zod_1.object)({
    guard: (0, zod_1.literal)(true),
    mil: (0, zod_1.literal)('yugduy'),
}).shape;
