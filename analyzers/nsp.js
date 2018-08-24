/**
 * This file contains code that runs the nsp analyzer.
 * nsp analyzer performs analysis using package.json
 * 
 */

// Load libraries
const shell = require('shelljs');

module.exports = {
  // Perfrorm analysis
  analysis: function (pathToPackage, silent=true) {
    // Check for environment
    const isWin = process.platform === "win32";
    if(isWin) {
      var command_output = shell.exec(`node_modules\\.bin\\nsp.cmd check ${pathToPackage} --reporter json`, { silent }).stdout;
    } else {
      var command_output = shell.exec(`node_modules/.bin/nsp check ${pathToPackage} --reporter json`, { silent }).stdout;
    }
    
    // If shell command output does not exist, it means that there was no package.json found on the project path 
    if(command_output){
      // Create return object
      const nspAnalysis = JSON.parse(command_output);
      if (nspAnalysis) {
        return {
          path: pathToPackage,
          "nsp": nspAnalysis
        };
      } else {
        throw new Error('nsp analysis could not be parsed');
      }
    } else {
      throw new Error('no nsp command or no package.json found');
    }
  }
};