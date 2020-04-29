/**
 * This file contains code that runs npm audit analysis
 */

const runNpmAudit = require("run-npm-audit");

module.exports = {
	// Perfrorm analysis
	analysis(packageJSON, packageLock) {
		return new Promise((resolve) => {
			// Run npmaudit
			const npmauditReport = runNpmAudit({ package: packageJSON, packageLock });
			resolve({ npmaudit: npmauditReport });
		});
	},
};
