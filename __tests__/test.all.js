const analysis = require("../analysis");
const utilities = require("../utilities/functions_library");

jest.setTimeout(30000);

const projectRootDirectory = "example_project";
let listOfFiles;
let analysisResults;

beforeAll(async () => {
	await utilities.get_list_of_js_files(projectRootDirectory).then((paths) => {
		listOfFiles = paths;
	});
	await analysis.analyze_all(projectRootDirectory, listOfFiles).then((res) => {
		analysisResults = res; // JSON Object Containing the analysis results
	});
});

describe("test full analysis", () => {
	test("Get analysis results", () => {
		expect(Object.keys(analysisResults).length).toBe(6);
	});
});
