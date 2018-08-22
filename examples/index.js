const utilities = require('../utilities/functions_library');
const analysis = require('../analysis');

var project_root_directory = "example_project";

utilities.get_list_of_js_files(project_root_directory).then(paths => {
    console.log(paths);
})

analysis.analyze_sonarjs(project_root_directory).then(res =>{
    console.log(res);
});

analysis.analyze_nsp(project_root_directory).then(res =>{
    console.log(res);
});

utilities.get_list_of_js_files(project_root_directory).then(paths => {
    return analysis.analyze_jsinspect(paths).then(res =>{
        console.log(res)
    });
});

utilities.get_list_of_js_files(project_root_directory).then(paths => {
  return analysis.analyze_escomplex(paths).then(res =>{
    console.log(res)
  });
});

utilities.get_list_of_js_files(project_root_directory).then(paths => {
  return analysis.analyze_eslint(paths).then(res =>{
    console.log(res)
  });
});

