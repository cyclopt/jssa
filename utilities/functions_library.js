const fs = require("fs");

const globby = require("globby");

module.exports = {
	readCode(pathToCode) {
		if (fs.lstatSync(pathToCode).isDirectory()) {
			return {
				path: pathToCode,
				ploc: 0,
				lloc: 0,
				code: null,
			};
		}
		const sourceCode = fs.readFileSync(pathToCode).toString();
		const ploc = sourceCode.split("\n").length;
		const lloc = sourceCode.split("\n")
			.map((el) => el === "" || el === "\r")
			.reduce((acc, cur) => acc + cur);
		return {
			path: pathToCode,
			ploc,
			lloc: ploc - lloc,
			code: sourceCode,
		};
	},
	async get_list_of_js_files(rootDir) {
		const jsPaths = await globby(
			[
				`${rootDir}/**/*.js`,
				`!(${rootDir}/node_modules)`,
				`!(${rootDir}/__tests__)`,
				`!(${rootDir}/tests)`,
				`!(${rootDir}/test)`,
				`!(${rootDir}/coverage)`,
			], { dot: true },
		);

		// Exclude eslint configuration file
		const jsPathsFinal = jsPaths.filter((el) => !el.endsWith(".eslintrc.js"));

		return jsPathsFinal;
	},
	removeImportsExports(str) {
		return str.replace(/^import.*$/m, "").replace(/^export.*$/m, "");
	},
	async checkIfEslintrcExists(rootDir) {
		const eslintConfigFiles = await globby(
			[
				`${rootDir}/**/.eslintrc*`,
				`!(${rootDir}/node_modules)`,
				`!(${rootDir}/__tests__)`,
				`!(${rootDir}/tests)`,
				`!(${rootDir}/test)`,
				`!(${rootDir}/coverage)`,
			], { dot: true },
		);

		return eslintConfigFiles;
	},
};
