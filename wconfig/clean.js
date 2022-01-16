"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_json_file_1 = __importDefault(require("edit-json-file"));
const shelljs_1 = require("shelljs");
// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.
const CLEAN_COMMAND2 = 'git add . && git commit -am "clean"';
const CLEAN_COMMAND35 = 'pnpm git-push';
const CLEAN_COMMAND4 = 'git checkout dev && git merge main';
const CLEAN_COMMAND6 = 'git checkout dev';
const PACKAGE = './package.json';
function main() {
    // #region Config
    const file = (0, edit_json_file_1.default)(PACKAGE);
    const versions = file.get('version').split('.');
    const versionN = Number.parseInt(versions[versions.length - 1]) + 1;
    versions.pop();
    versions.push(versionN + '');
    const version = versions.join('.');
    file.set('version', version);
    // #endregion
    file.save();
    (0, shelljs_1.exec)(CLEAN_COMMAND2);
    (0, shelljs_1.exec)(CLEAN_COMMAND35);
    (0, shelljs_1.exec)(CLEAN_COMMAND4);
    (0, shelljs_1.exec)(CLEAN_COMMAND35);
    (0, shelljs_1.exec)(CLEAN_COMMAND6);
}
main();
