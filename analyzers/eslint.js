/**
 * This file contains code that runs the eslint static analyzer
 */

// Load libraries
const path = require("path");

const { CLIEngine } = require("eslint");

// Basic eslint rules
const cli = new CLIEngine({
	configFile: `${path.join(path.resolve(__dirname), "..")}/cyclopt-eslint.json`,
	resolvePluginsRelativeTo: `${path.join(path.resolve(__dirname), "..")}`,
});

module.exports = {
	// Perfrorm analysis
	analysis(paths) {
		const results = [];
		let totalErrorCount = 0;
		let totalWarningCount = 0;
		let totalFixableErrorCount = 0;
		let totalFixableWarningCount = 0;
		paths.forEach((sourceFilePath) => {
			try {
				const {
					filePath,
					messages,
					errorCount,
					warningCount,
					fixableErrorCount,
					fixableWarningCount } = cli.executeOnFiles(sourceFilePath).results[0];

				totalErrorCount += errorCount;
				totalWarningCount += warningCount;
				totalFixableErrorCount += fixableErrorCount;
				totalFixableWarningCount += fixableWarningCount;

				results.push({
					filePath,
					messages,
					errorCount,
					warningCount,
					fixableErrorCount,
					fixableWarningCount,
				});
			} catch {
				results.push({
					filePath: sourceFilePath,
					messages: [],
					errorCount: 0,
					warningCount: 0,
					fixableErrorCount: 0,
					fixableWarningCount: 0,
					parsingError: true,
				});
			}
		});

		return {
			eslint: {
				results,
				errorCount: totalErrorCount,
				warningCount: totalWarningCount,
				fixableErrorCount: totalFixableErrorCount,
				fixableWarningCount: totalFixableWarningCount,
			},
		};
	},
};
