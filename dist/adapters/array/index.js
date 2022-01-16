"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./db"), exports);
__exportStar(require("./resolver"), exports);
// export * from './mutation';
__exportStar(require("./read"), exports);
const xstate_1 = require("xstate");
const read_1 = require("./read");
class ArrayDB {
    constructor(db = []) {
        this.db = db;
        this.countAll = (0, read_1.countAll)(db);
        this.count = (0, read_1.count)(db);
    }
    rinitDB() {
        this.db.length = 0;
    }
    interpret(machine, devTools) {
        return (0, xstate_1.interpret)(machine, {
            devTools,
        });
    }
}
exports.default = ArrayDB;
