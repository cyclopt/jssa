const fs = require("fs");
const walk = require("walk");
const path = require("path");

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
	get_list_of_js_files(rootDir) {
		return new Promise((resolve) => {
			const walker = walk.walk(rootDir, { filters: ["node_modules", "test"] });
			const listOfFiles = [];
			walker.on("file", (root, fileStats, next) => {
				if (fileStats.name.endsWith(".js")) {
					listOfFiles.push(root + path.sep + fileStats.name);
				}
				next();
			});
			walker.on("end", () => {
				resolve(listOfFiles);
			});
		});
	},
	removeImportsExports(str) {
		return str.replace(/^import.*$/m, "").replace(/^export.*$/m, "");
	},
	checkIfEslintrcExists(rootDir) {
		return new Promise((resolve) => {
			const walker = walk.walk(rootDir, { filters: ["node_modules", "test"] });
			const eslintConfigFiles = [];
			walker.on("file", (root, fileStats, next) => {
				if (fileStats.name.startsWith(".eslintrc")) {
					eslintConfigFiles.push(root + path.sep + fileStats.name);
				}
				next();
			});
			walker.on("end", () => {
				resolve(eslintConfigFiles);
			});
		});
	},
};
