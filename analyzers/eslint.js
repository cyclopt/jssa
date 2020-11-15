/**
 * This file contains code that runs the eslint static analyzer
 */

// Load libraries
const { CLIEngine } = require("eslint");
const path = require("path");

// Basic eslint rules
const cli = new CLIEngine({
	configFile: `${path.join(path.resolve(__dirname), "..")}/cyclopt-eslint.json`,
	resolvePluginsRelativeTo: `${path.join(path.resolve(__dirname), "..")}`,
});

module.exports = {
	// Perfrorm analysis
	analysis(paths) {
		return {
			eslint: cli.executeOnFiles(paths),
		};
	},
};
