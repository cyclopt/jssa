const path = require("path");

const analysis = require("../analysis");

const projectRootDirectory = path.join(__dirname, "..", "example_project");

let analysisResults;

beforeAll(async () => {
	await analysis.analyze_npmaudit(projectRootDirectory).then((res) => {
		analysisResults = res;
	});
});

describe("npm audit analysis", () => {
	it("No package-lock.json found", () => {
		expect(analysisResults.npmaudit.actions).toBe(undefined);
	});
});
