/**
 * This file contains code that runs sonarjs static analyzer
 */

// Load libraries 
const { analyze } = require("sonarjs");

// Function for logging purposes
function log(message) {
  //console.log(message);
}

function onStart() {
  //console.log("Sonarjs analysis started");
}
 
function onEnd() {
  //console.log("Sonarjs analysis finished");
}

// Run analyzer
async function runSonarJS(project_path, exclusions) {
  const issues = await analyze(project_path, { log, onStart, onEnd, exclusions: exclusions });  
  return issues;
}

module.exports = {
  // Perfrorm analysis
  analysis: function (project_path, exclude = "") {
    return new Promise((resolve, reject) => {
      // Run sonarjs
      issues = runSonarJS(project_path, exclude);
      resolve(issues);
    });
  }
};