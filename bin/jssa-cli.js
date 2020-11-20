#!/usr/bin/env node

const minimist = require("minimist");

const analysis = require("../analysis");

const menus = {
	main: `
    analyze [command] <options>

    
    all ................... run all analyzers
    escomplex ............. run escomplex analyzer
    eslint ................ run eslint analyzer
    jsinspect ............. run jsinspect analyzer
    npmaudit .............. run npmaudit analyzer
    nsp ................... run nsp analyzer
    sonarjs ............... run sonarjs analyzer
    help .................. show help menu for a command`,

	all: `
    analyze all <options>

    --project, -p ..... the project root directory
    --files, -f ....... the list of files to analyze`,

	sonarjs: `
    analyze all <options>

    --project, -p ..... the project root directory`,

	eslint: `
    analyze all <options>

    --files, -f ....... the list of files to analyze`,

	nsp: `
    analyze all <options>

    --project, -p ..... the project root directory`,

	npmaudit: `
    analyze all <options>

    --project, -p ..... the project root directory`,

	jsinspect: `
    analyze all <options>

    --files, -f ....... the list of files to analyze`,

	escomplex: `
    analyze all <options>

    --files, -f ....... the list of files to analyze`,
};

const args = minimist(process.argv.slice(2));

if (args._.length === 1) {
	let listOfFiles;
	let analysisResults;

	switch (args._[0]) {
		case "all":
			if (!(args.f || args.f)) {
				console.log(menus[args._[0]]);
				break;
			}
			if (!(args.p || args.project)) {
				console.log(menus[args._[0]]);
				break;
			}
			listOfFiles = args.f ? args.f.split(",") : args.files.split(",");
			analysis.analyze_all(args.p || args.project, listOfFiles).then((res) => {
				analysisResults = res; // JSON Object Containing the analysis results
				console.log(analysisResults);
			});
			break;
		case "sonarjs":
			analysis.analyze_sonarjs(args.p || args.project).then((res) => {
				analysisResults = res; // JSON Object Containing the analysis results
				console.log(analysisResults);
			});
			break;
		case "eslint":
			listOfFiles = args.f ? args.f.split(",") : args.files.split(",");
			analysis.analyze_eslint(listOfFiles).then((res) => {
				analysisResults = res; // JSON Object Containing the analysis results
				console.log(analysisResults);
			});
			break;
		case "nsp":
			analysis.analyze_nsp(args.p || args.project).then((res) => {
				analysisResults = res; // JSON Object Containing the analysis results
				console.log(analysisResults);
			});
			break;
		case "npmaudit":
			analysis.analyze_npmaudit(args.p || args.project).then((res) => {
				analysisResults = res; // JSON Object Containing the analysis results
				console.log(analysisResults);
			});
			break;
		case "jsinspect":
			listOfFiles = args.f ? args.f.split(",") : args.files.split(",");
			analysis.analyze_jsinspect(listOfFiles).then((res) => {
				analysisResults = res; // JSON Object Containing the analysis results
				console.log(analysisResults);
			});
			break;
		case "escomplex":
			listOfFiles = args.f ? args.f.split(",") : args.files.split(",");
			analysis.analyze_escomplex(listOfFiles).then((res) => {
				analysisResults = res; // JSON Object Containing the analysis results
				console.log(analysisResults);
			});
			break;
		case "help":
			console.log(menus.main);
			break;
		default:
			console.log(`${args._[0]} command does not exist`);
			console.log(menus.main);
	}
} else {
	console.log("Invalid arguments...");
	console.log(menus.main);
}
