const path = require("path");

const analysis = require("../analysis");

const projectRootDirectory = path.join(__dirname, "..");

let analysisResults;

beforeAll(async () => {
	await analysis.analyze_npmaudit(projectRootDirectory).then((res) => {
		analysisResults = res;
	});
});

describe("npm audit analysis", () => {
	it("Found 1 vulnerability", () => {
		expect(analysisResults.npmaudit.actions.length).toBeGreaterThan(1);
	});
});
