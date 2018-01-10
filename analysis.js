/**
 * This file contains the Cyclopt static analyzer that performs every analysis
 */

// Load libraries
const _ = require('lodash');

// Load analyzers
const escomplex_analysis = require('./analyzers/escomplex');
const eslint_analysis = require('./analyzers/eslint');
const nsp_analysis = require('./analyzers/nsp');
const jsinspect_analysis = require('./analyzers/jsinspect');
const sonarjs_analysis = require('./analyzers/sonarjs');

// Load custom modules
const lib = require('./utilities/functions_library');

function escomplex(list_of_files){

  project_source = _.chain(project_files).map(lib.readCode).reject(['code', null]).value();
  return escomplex_analysis.analysis(project_source);
  
}

function eslint(list_of_files){

    return eslint_analysis.analysis(list_of_files);    
}

function nsp(project, environemnt){
  
    return nsp_analysis.analysis(project, environemnt);    
}

function jsinspect(list_of_files){
    
    return jsinspect_analysis.analysis(list_of_files);    
}

function sonarjs(project){
    
    return sonarjs_analysis.analysis(project);    
}

project_root = "sample_project";
project_files = ["sample_project/index.js", "sample_project/index2.js"];

console.log('---- escomplex ----');
console.log(escomplex(project_files));
console.log('---- eslint ----');
console.log(eslint(project_files).eslint.results[0].messages);
console.log('---- nsp ----');
console.log(nsp(project_root, "WINDOWS"));
var pr_jsinspect = jsinspect(project_files);
Promise.all([pr_jsinspect]).then(values => { 
  console.log('---- jsinspect ----');
  console.log(values[0].result[0]);
});
var pr_sonarjs = sonarjs(project_root);
Promise.all([pr_sonarjs]).then(values => { 
  console.log('---- sonarjs ----');
  console.log(values[0]);
});