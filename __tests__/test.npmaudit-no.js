const analysis = require('../analysis');

var project_root_directory = "example_project";

let analysis_results;

beforeAll(async () => {
  await analysis.analyze_npmaudit(project_root_directory).then(res => {
      analysis_results = res;
  });
});

describe('npm audit analysis', () => {
  it('No package-lock.json found', () => {
    expect(analysis_results.npmaudit.actions).toBe(undefined);
  });
});