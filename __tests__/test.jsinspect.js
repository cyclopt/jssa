const analysis = require('../analysis');
const utilities = require('../utilities/functions_library');

var project_root_directory = "sample_project";

let analysis_results;
let list_of_files;

beforeAll(async () => {
  await utilities.get_list_of_js_files(project_root_directory).then(paths => {
    list_of_files = paths;
  })
  await analysis.analyze_jsinspect(list_of_files).then(res =>{
    analysis_results = res;
  });
});

describe('nsp analysis', () =>{
  it('Duplicates found', () => {
    expect(analysis_results.jsinspect.length).toBeGreaterThan(0);
  });
});