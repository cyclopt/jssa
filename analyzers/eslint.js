/**
 * This file contains code that runs the eslint static analyzer
 */

// Load libraries
const { CLIEngine } = require("eslint");
const path = require("path");

// Basic eslint rules
const cli = new CLIEngine({
	useEslintrc: false,
	configFile: `${path.join(path.resolve(__dirname), "..")}/cyclopt-eslint.json`,
});

module.exports = {
	// Perfrorm analysis
	analysis(paths) {
		return {
			eslint: cli.executeOnFiles(paths),
		};
	},
};
