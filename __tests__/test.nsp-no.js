const analysis = require('../analysis');

var project_root_directory = "examples";

let analysis_results;

beforeAll(async () => {
  await analysis.analyze_nsp(project_root_directory).then(res => {
    analysis_results = res;
  }).catch(error => {});
});

describe('nsp analysis', () =>{
  it('Analysis path', () => {
    expect(analysis_results).toBe(undefined);
  });
});