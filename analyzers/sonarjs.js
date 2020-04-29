/**
 * This file contains code that runs sonarjs static analyzer
 */

// Load libraries
const { analyze } = require("sonarjs");

// Function for logging purposes
function log(message) {
	console.log(message);
}

function onStart() {
	console.log("Sonarjs analysis started");
}

function onEnd() {
	console.log("Sonarjs analysis finished");
}

// Run analyzer
async function runSonarJS(projectPath, exclusions) {
	const issues = await analyze(projectPath, { log, onStart, onEnd, exclusions });
	return { sonarjs: issues };
}

module.exports = {
	// Perfrorm analysis
	analysis(projectPath, exclude = "") {
		return new Promise((resolve) => {
			// Run sonarjs
			const issues = runSonarJS(projectPath, exclude);
			resolve(issues);
		});
	},
};
