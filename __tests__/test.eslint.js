const analysis = require("../analysis");
const utilities = require("../utilities/functions_library");

const projectRootDirectory = "example_project";

let analysisResults;
let lisoOfFiles;

beforeAll(async () => {
	await utilities.get_list_of_js_files(projectRootDirectory).then((paths) => {
		lisoOfFiles = paths;
	});
	await analysis.analyze_eslint(projectRootDirectory, lisoOfFiles).then((res) => {
		analysisResults = res;
	});
});

describe("eslint analysis", () => {
	it("Number of files analyzed", () => {
		expect(analysisResults.eslint.results.length).toBe(lisoOfFiles.length);
	});
	it("Count errors and warnings", () => {
		expect(analysisResults.eslint.errorCount).toBeGreaterThan(0);
	});
	it("Number of errors", () => {
		expect(analysisResults.eslint.errorCount).toBeGreaterThan(200);
	});
});
