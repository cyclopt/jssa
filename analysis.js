/**
 * This file contains the Cyclopt static analyzer that performs every analysis
 */

// Load libraries
const _ = require("lodash");
const CommentsExtractor = require("comments-extractor");
const fs = require("fs");
const path = require("path");

// Load analyzers
const escomplexAnalysis = require("./analyzers/escomplex");
const npmauditAnalysis = require("./analyzers/npmaudit");
const jsinspectAnalysis = require("./analyzers/jsinspect");
const sonarjsAnalysis = require("./analyzers/sonarjs");

// Load custom modules
const lib = require("./utilities/functions_library");


function commentsAnalyzer(listOfFiles) {
	const commentsInfo = [];
	listOfFiles.forEach((filePath) => {
		try {
			const extractor = new CommentsExtractor(filePath);
			const info = extractor.extract();

			if ([...info][0][1].length > 0) {
				commentsInfo.push({
					filePath,
					lloc: lib.readCode(filePath).lloc,
					ploc: lib.readCode(filePath).ploc,
					commentsLOC: [...info][0][1]
						.map((el) => el.value.split("\n").length)
						.reduce((acc, cur) => acc + cur),
				});
			} else {
				commentsInfo.push({
					filePath,
					lloc: lib.readCode(filePath).lloc,
					ploc: lib.readCode(filePath).ploc,
					commentsLOC: 0,
				});
			}
		} catch (error) {
			commentsInfo.push({
				filePath,
				lloc: 0,
				ploc: 0,
				commentsLOC: 0,
			});
		}
	});

	return { commentsAnalysis: commentsInfo };
}

function escomplex(listOfFiles) {
	const projectSource = _.chain(listOfFiles).map(lib.readCode).reject(["code", null]).value();

	return escomplexAnalysis.analysis(projectSource);
}

function eslint(listOfFiles) {
	return require("./analyzers/eslint").analysis(listOfFiles);
}

function npmaudit(project) {
	const packageJSONFilepath = path.join(project, "package.json");
	const packageLockFilepath = path.join(project, "package-lock.json");
	if (fs.existsSync(packageJSONFilepath) && fs.existsSync(packageLockFilepath)) {
		const packageJSON = fs.readFileSync(packageJSONFilepath).toString("utf-8");
		const packageLock = fs.readFileSync(packageLockFilepath).toString("utf-8");
		return npmauditAnalysis.analysis(packageJSON, packageLock);
	}
	if (!fs.existsSync(packageJSONFilepath)) {
		return { npmaudit: { error: "package.json not found" } };
	}

	return { npmaudit: { error: "package-lock.json not found" } };
}

function jsinspect(listOfFiles) {
	return jsinspectAnalysis.analysis(listOfFiles);
}

function sonarjs(project) {
	return sonarjsAnalysis.analysis(project);
}

module.exports = {
	analyze_all(projectRoot, listOfFiles) {
		return new Promise((resolve, reject) => {
			const escomplexResults = escomplex(listOfFiles);
			const eslintResults = eslint(listOfFiles);
			const npmauditResults = npmaudit(projectRoot);
			const commentsResults = commentsAnalyzer(listOfFiles);
			jsinspect(listOfFiles).then((jsinspectResults) => {
				sonarjs(projectRoot).then((sonarjsResults) => {
					const results = {};
					results.escomplex = escomplexResults.escomplex;
					results.eslint = eslintResults.eslint;
					results.npm_audit = npmauditResults.npmaudit;
					results.jsinspect = jsinspectResults;
					results.sonarjs = sonarjsResults;
					results.commentsInfo = commentsResults;
					resolve(results);
				})
					.catch((err) => {
						reject(new Error("sonarjs analysis failed", err));
					});
			})
				.catch((err) => {
					reject(new Error("jsinspect analysis failed", err));
				});
		});
	},
	analyze_sonarjs(projectRoot) {
		return new Promise((resolve, reject) => {
			resolve(sonarjs(projectRoot));
			reject(new Error("sonarjs analysis failed"));
		});
	},
	analyze_eslint(listOfFiles) {
		return new Promise((resolve, reject) => {
			resolve(eslint(listOfFiles));
			reject(new Error("eslint analysis failed"));
		});
	},
	analyze_npmaudit(projectRoot) {
		return new Promise((resolve, reject) => {
			resolve(npmaudit(projectRoot));
			reject(new Error("npmaudit analysis failed"));
		});
	},
	analyze_jsinspect(listOfFiles) {
		return new Promise((resolve, reject) => {
			resolve(jsinspect(listOfFiles));
			reject(new Error("jsinspect analysis failed"));
		});
	},
	analyze_escomplex(listOfFiles) {
		return new Promise((resolve, reject) => {
			resolve(escomplex(listOfFiles));
			reject(new Error("escomplex analysis failed"));
		});
	},
	commentsAnalyzer(listOfFiles) {
		return new Promise((resolve, reject) => {
			resolve(commentsAnalyzer(listOfFiles));
			reject(new Error("comments analyzer failed"));
		});
	},
};
