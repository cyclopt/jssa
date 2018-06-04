const analysis = require('../analysis');

var project_root_directory = "sample_project";

let analysis_results;

beforeAll(async () => {
  await analysis.analyze_nsp(project_root_directory, "WINDOWS").then(res =>{
    analysis_results = res;
  });
});

describe('nsp analysis', () =>{
  it('Analysis path', () => {
    expect(analysis_results.path).toBe(project_root_directory);
  });
  it('Violations found', () => {
    expect(analysis_results.nsp.length).toBeGreaterThan(0);
  });
});