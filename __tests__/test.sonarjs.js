const analysis = require("../analysis");

const projectRootDirectory = "example_project";

let analysisResults;

jest.setTimeout(30000);

beforeAll(async () => {
	await analysis.analyze_sonarjs(projectRootDirectory).then((res) => {
		analysisResults = res;
	});
});

describe("sonarjs analysis", () => {
	it("Violations found", () => {
		expect(analysisResults.sonarjs.length).toBeGreaterThan(0);
	});
});
