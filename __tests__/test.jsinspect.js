const analysis = require("../analysis");
const utilities = require("../utilities/functions_library");

const projectRootDirectory = "example_project";

let analysisResults;
let listOfFiles;

beforeAll(async () => {
	await utilities.get_list_of_js_files(projectRootDirectory).then((paths) => {
		listOfFiles = paths;
	});
	await analysis.analyze_jsinspect(listOfFiles).then((res) => {
		analysisResults = res;
	});
});

describe("jsinspect analysis", () => {
	it("Duplicates found", () => {
		expect(analysisResults.jsinspect.length).toBeGreaterThan(0);
	});
});
