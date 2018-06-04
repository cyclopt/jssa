const analysis = require('../analysis');

var project_root_directory = "sample_project";

let analysis_results;

beforeAll(async () => {
  await analysis.analyze_sonarjs(project_root_directory).then(res =>{
    analysis_results = res;
  });
});

describe('nsp analysis', () =>{
  it('Violations found', () => {
    expect(analysis_results.length).toBeGreaterThan(0);
  });
});