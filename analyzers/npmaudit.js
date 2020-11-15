/**
 * This file contains code that runs npm audit analysis
 */

const shell = require("shelljs");

const fileNames = {
	package: "package.json",
	packageLock: "package-lock.json",
};

module.exports = {
	// Perfrorm analysis
	analysis(packageJSON, packageLock, npmExecutablePath) {
		const npmCommand = !npmExecutablePath ? "npm" : npmExecutablePath;

		// Run npmaudit
		const dirBefore = shell.pwd();
		shell.cd(shell.tempdir());
		shell.touch([fileNames.package, fileNames.packageLock]);
		shell.ShellString(packageJSON).to(fileNames.package);
		shell.ShellString(packageLock).to(fileNames.packageLock);
		const audit = shell.exec(`${npmCommand} audit --json`, { silent: true });
		shell.rm("-f", [fileNames.package, fileNames.packageLock]);
		shell.cd(dirBefore);

		if (audit.stderr) {
			return { error: `Audit failed! ${audit.stderr}` };
		}

		return { npmaudit: JSON.parse(audit.stdout) };
	},
};
