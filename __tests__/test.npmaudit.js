const path = require('path');

const analysis = require('../analysis');

const project_root_directory = path.join(__dirname, '..');

let analysis_results;

beforeAll(async () => {
  await analysis.analyze_npmaudit(project_root_directory).then(res => {
      analysis_results = res;
  });
});

describe('npm audit analysis', () => {
  it('Found 1 vulnerability', () => {
    expect(analysis_results.npmaudit.actions.length).toBe(1);
  });
});