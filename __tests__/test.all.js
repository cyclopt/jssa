const analysis = require('../analysis');
const utilities = require('../utilities/functions_library');

jest.setTimeout(30000);

var project_root_directory = "example_project";

let list_of_files;

beforeAll(async () => {
  await utilities.get_list_of_js_files(project_root_directory).then(paths => {
    list_of_files = paths;
  })
  await analysis.analyze_all(project_root_directory, list_of_files).then(res => {
    analysis_results = res; // JSON Object Containing the analysis results
  })
});

describe('test utilities', () =>{
  test('Get paths of all js files', () => {
    expect(Object.keys(analysis_results).length).toBe(5);
  });
})