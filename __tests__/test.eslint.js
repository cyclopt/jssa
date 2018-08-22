const analysis = require('../analysis');
const utilities = require('../utilities/functions_library');

var project_root_directory = "example_project";

let analysis_results;
let list_of_files;

beforeAll(async () => {
  await utilities.get_list_of_js_files(project_root_directory).then(paths => {
    list_of_files = paths;
  })
  await analysis.analyze_eslint(list_of_files).then(res =>{
    analysis_results = res;
  });
});

describe('eslint analysis', () =>{
  it('Number of files analyzed', () => {
    expect(analysis_results.eslint.results.length).toBe(list_of_files.length);
  });
  it('Count errors and warnings', () => {
    expect(analysis_results.eslint.errorCount).toBeGreaterThan(0);
  });
  it('Number of errors', () => {
    expect(analysis_results.eslint.errorCount).toBe(4);
  });
});