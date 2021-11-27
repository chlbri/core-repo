/* eslint-disable @typescript-eslint/no-var-requires */
// const { exec } = require('shelljs');

module.exports = function () {
  return {
    autoDetect: true,
    teardown() {
      require('shelljs').exec('jest --clearCache');
    },
    runMode: 'onsave',
    trace: true,
  };
};
