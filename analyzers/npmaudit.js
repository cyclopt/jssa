/**
 * This file contains code that runs npm audit analysis
 */

const runNpmAudit = require('run-npm-audit');

module.exports = {
  // Perfrorm analysis
  analysis: function (packageJSON, packageLock) {
    return new Promise((resolve, reject) => {
      // Run npmaudit
      const npmaudit_report = runNpmAudit({ 'package': packageJSON, 'packageLock': packageLock });
      resolve({"npmaudit": npmaudit_report});
    });
  }
};