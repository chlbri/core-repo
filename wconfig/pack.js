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
const COPY_COMMAND = 'xcopy /shi dist .';
// const REMOVE_COMMAND = 'rimraf -rf dist src test';
const PACKAGE = './package.json';
function resetToMain(data) {
    let _data = '';
    if (typeof data !== 'string')
        return _data;
    if (data.startsWith('dist/')) {
        _data = data.slice(5);
    }
    return _data;
}
function main() {
    (0, shelljs_1.exec)(COPY_COMMAND);
    // exec(REMOVE_COMMAND);
    const file = (0, edit_json_file_1.default)(PACKAGE);
    // #region my own
    file.unset('devDependencies');
    file.unset('scripts');
    // #endregion
    // #region Config
    const versions = file.get('version').split('.');
    const versionN = Number.parseInt(versions[versions.length - 1]) + 1;
    versions.pop();
    versions.push(versionN + '');
    const typings = resetToMain(file.get('typings'));
    file.set('typings', typings);
    const _main = resetToMain(file.get('main'));
    file.set('main', _main);
    const version = versions.join('.');
    file.set('version', version);
    // #endregion
    file.save();
}
main();
