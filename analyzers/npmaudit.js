/**
 * This file contains code that runs npm audit analysis
 */

const runNpmAudit = require('run-npm-audit');

module.exports = {
  // Perfrorm analysis
  analysis: function (package, packageLock) {
    return new Promise((resolve, reject) => {
      // Run npmaudit
      const npmaudit_report = runNpmAudit({ package, packageLock });
      resolve({"npmaudit": npmaudit_report});
    });
  }
};