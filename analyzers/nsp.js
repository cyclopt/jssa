/**
 * This file contains code that runs the nsp analyzer.
 * nsp analyzer performs analysis using package.json
 * 
 */

// Load libraries
const shell = require('shelljs');

module.exports = {
  // Perfrorm analysis
  analysis: function (jssaAbsPath, pathToPackage, environment = 'LINUX') {
    // Check for environment
    switch(environment){
      case 'LINUX':
        var command_output = shell.exec(`${jssaAbsPath}/node_modules/.bin/nsp check ${pathToPackage} --reporter json`, { silent: true }).stdout;
        break;
      case 'WINDOWS':
        var command_output = shell.exec(`${jssaAbsPath}\\node_modules\\.bin\\nsp.cmd check ${pathToPackage} --reporter json`, { silent: true }).stdout;
        break;
      default:
        return {
          path: pathToPackage,
          "nsp": []
        };  
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
      }
      return {
        path: pathToPackage,
        "nsp": []
      };
    }
    else{
      return {
        path: pathToPackage,
        "nsp": []
      };
    }
  }
};