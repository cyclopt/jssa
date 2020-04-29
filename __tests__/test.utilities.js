const utilities = require("../utilities/functions_library");

const projectRootDirectory = "example_project";

let listOfFiles;

beforeAll(async () => {
	await utilities.get_list_of_js_files(projectRootDirectory).then((paths) => {
		listOfFiles = paths;
	});
});

describe("test utilities", () => {
	test("Get paths of all js files", () => {
		expect(listOfFiles.length).toBe(5);
	});
});
