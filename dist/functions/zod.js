"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiteralValues = exports.getLiteralValuesInObject = exports.getLiteralValuesInARray = void 0;
function getLiteralValuesInARray(union) {
    return union.options.map(un => un._def.value);
}
exports.getLiteralValuesInARray = getLiteralValuesInARray;
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
        array: getLiteralValuesInARray(union),
    };
}
exports.getLiteralValues = getLiteralValues;
