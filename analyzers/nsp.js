/**
 * This file contains code that runs the nsp analyzer
 */

// Load libraries
const shell = require('shelljs');

module.exports = {
  // Perfrorm analysis
  analysis: function (pathToPackage, environment = 'LINUX') {
    // Check for environment
    switch(environment){
      case 'LINUX':
        var command_output = shell.exec(`./node_modules/.bin/nsp check ${pathToPackage} --reporter json`, { silent: true }).stdout;
        break;
      case 'WINDOWS':
        var command_output = shell.exec(`node_modules\\.bin\\nsp.cmd check ${pathToPackage} --reporter json`, { silent: true }).stdout;
        break;
      default:
        return {
          path: pathToPackage,
          "nsp": []
        };  
    }
    
    // Create return object
    const nspAnalysis = JSON.parse(command_output);
    if (nspAnalysis) {
      return {
        path: pathToPackage,
        "nsp": nspAnalysis
      };
    }
    return {
      path: pathToPackage,
      "nsp": []
    };
  }
};