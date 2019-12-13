const fs = require("fs");
const walk = require("walk");
const path = require("path");

module.exports = {
	readCode(pathToCode) {
		if (fs.lstatSync(pathToCode).isDirectory()) {
			return {
				path: pathToCode,
				code: null,
			};
		}

		return {
			path: pathToCode,
			loc: fs.readFileSync(pathToCode).toString().split("\n").length,
			code: fs.readFileSync(pathToCode).toString(),
		};
	},
	get_list_of_js_files(rootDir) {
		return new Promise((resolve, reject) => {
			const walker = walk.walk(rootDir, { filters: ["node_modules"] });
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
};
