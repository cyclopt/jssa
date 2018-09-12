const analysis = require('../analysis');

var project_root_directory = "example_project";

let analysis_results;

jest.setTimeout(30000);

beforeAll(async () => {
  await analysis.analyze_sonarjs(project_root_directory).then(res =>{
    analysis_results = res;
  });
});

describe('sonarjs analysis', () =>{
  it('Violations found', () => {
    expect(analysis_results.sonarjs.length).toBeGreaterThan(0);
  });
});