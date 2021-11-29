/* eslint-disable @typescript-eslint/no-var-requires */
// const { exec } = require('shelljs');

module.exports = function () {
  return {
    autoDetect: true,
    teardown() {
      require('./node_modules/shelljs').exec('jest --clearCache');
    },
    tests: ['test/**/*.ts'],
    files: [
      './node_modules/@core_chlbri/test-machine/**/*.js',
      './node_modules/@core_chlbri/test-machine/**/*.d.ts',
      './src/**/*.ts',
    ],
    setup: () => {
      return require('./node_modules/@core_chlbri/test-machine');
    },
    runMode: 'onsave',
    trace: true,
    testFramework: 'jest',
    debug: true,
  };
};
