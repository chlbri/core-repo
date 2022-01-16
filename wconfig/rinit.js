"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@core_chlbri/core");
const fs_extra_1 = require("fs-extra");
function main() {
    (0, fs_extra_1.emptyDirSync)('node_modules');
    (0, core_1.log)('Empty node_modules', 'done');
}
main();
