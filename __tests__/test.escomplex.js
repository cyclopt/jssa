const analysis = require("../analysis");
const utilities = require("../utilities/functions_library");

const projectRootDirectory = "example_project";

let analysisResults;
let listOfFiles;

beforeAll(async () => {
	await utilities.get_list_of_js_files(projectRootDirectory).then((paths) => {
		listOfFiles = paths;
	});
	await analysis.analyze_escomplex(listOfFiles).then((res) => {
		analysisResults = res;
	});
});

describe("escomplex analysis", () => {
	it("Number of files analyzed", () => {
		expect(analysisResults.escomplex.reports.length).toBe(listOfFiles.length);
	});
});
