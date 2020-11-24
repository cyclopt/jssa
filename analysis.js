/**
 * This file contains the Cyclopt static analyzer that performs every analysis
 */

// Load libraries
const fs = require("fs");
const path = require("path");

const _ = require("lodash");
const CommentsExtractor = require("comments-extractor");

// Load analyzers
const { eslintAnalysis, escomplexAnalysis, jsinspectAnalysis, npmauditAnalysis, sonarjsAnalysis } = require("./analyzers");
// Load custom modules
const lib = require("./utilities/functions_library");

function commentsAnalyzer(listOfFiles) {
	const commentsInfo = [];
	listOfFiles.forEach((filePath) => {
		const locInfo = lib.readCode(filePath);

		try {
			const extractor = new CommentsExtractor(filePath);
			const info = extractor.extract();

			if ([...info][0][1].length > 0) {
				commentsInfo.push({
					filePath,
					lloc: locInfo.lloc,
					ploc: locInfo.ploc,
					commentsLOC: [...info][0][1]
						.map((el) => el.value.split("\n").length)
						.reduce((acc, cur) => acc + cur),
				});
			} else {
				commentsInfo.push({
					filePath,
					lloc: locInfo.lloc,
					ploc: locInfo.ploc,
					commentsLOC: 0,
				});
			}
		} catch {
			commentsInfo.push({
				filePath,
				lloc: locInfo.lloc,
				ploc: locInfo.ploc,
				commentsLOC: 0,
			});
		}
	});

	return { commentsAnalysis: commentsInfo };
}

function escomplex(listOfFiles) {
	const projectSource = _.chain(listOfFiles).map((el) => lib.readCode(el)).reject(["code", null]).value();

	return escomplexAnalysis.analysis(projectSource);
}

async function eslint(projectRoot, listOfFiles) {
	// Run eslint

	// Check for already existing eslint configurations that override the cyclopt ones
	const list = await lib.checkIfEslintrcExists(projectRoot);

	const contents = [];
	list.forEach((file) => {
		contents.push(fs.readFileSync(file).toString());
		fs.unlinkSync(file);
	});
	const lintingResults = eslintAnalysis.analysis(listOfFiles);
	// Remove messages that originate from parsing error
	lintingResults.eslint.results.forEach((element) => {
		element.messages = element.messages.filter((el) => !el.fatal);
	});

	// Write back already deleted eslint configurations
	list.forEach((file, index) => {
		fs.writeFileSync(file, contents[index]);
	});
	return lintingResults;
}

function npmaudit(project, npmExecutablePath) {
	const packageJSONFilepath = path.join(project, "package.json");
	const packageLockFilepath = path.join(project, "package-lock.json");
	if (fs.existsSync(packageJSONFilepath) && fs.existsSync(packageLockFilepath)) {
		const packageJSON = fs.readFileSync(packageJSONFilepath).toString("utf-8");
		const packageLock = fs.readFileSync(packageLockFilepath).toString("utf-8");
		return npmauditAnalysis.analysis(packageJSON, packageLock, npmExecutablePath);
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
	analyze_all(projectRoot, listOfFiles, npmExecutablePath) {
		return new Promise((resolve, reject) => {
			const escomplexResults = escomplex(listOfFiles);
			eslint(projectRoot, listOfFiles).then((eslintResults) => {
				const npmauditResults = npmaudit(projectRoot, npmExecutablePath);
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
						.catch((error) => {
							reject(new Error("sonarjs analysis failed", error));
						});
				})
					.catch((error) => {
						reject(new Error("jsinspect analysis failed", error));
					});
			});
		});
	},
	analyze_sonarjs(projectRoot) {
		return new Promise((resolve, reject) => {
			resolve(sonarjs(projectRoot));
			reject(new Error("sonarjs analysis failed"));
		});
	},
	async analyze_eslint(projectRoot, listOfFiles) {
		const results = await eslint(projectRoot, listOfFiles);
		return results;
	},
	analyze_npmaudit(projectRoot, npmExecutablePath) {
		return new Promise((resolve, reject) => {
			resolve(npmaudit(projectRoot, npmExecutablePath));
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
