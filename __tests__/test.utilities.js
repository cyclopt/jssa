const utilities = require('../utilities/functions_library');

var project_root_directory = "sample_project";

let list_of_files;

beforeAll(async () => {
  await utilities.get_list_of_js_files(project_root_directory).then(paths => {
    list_of_files = paths;
  })
});

describe('test utilities', () =>{
  test('Get paths of all js files', () => {
    expect(list_of_files.length).toBe(3);
  });
})