/**
 * This file contains the Cyclopt static analyzer that performs every analysis
 */

// Load libraries
const _ = require('lodash');

// Load analyzers
const escomplex_analysis = require('./analyzers/escomplex');
const eslint_analysis = require('./analyzers/eslint');

// Load custom modules
const lib = require('./utilities/functions_library');

function escomplex(list_of_files){

  project_source = _.chain(project_files).map(lib.readCode).reject(['code', null]).value();
  return escomplex_analysis.analysis(project_source);
  
}

function eslint(list_of_files){

    return eslint_analysis.analysis(list_of_files);    
}


project_files = ["sample_project/index.js", "sample_project/index2.js"] 
console.log(escomplex(project_files));
console.log(eslint(project_files).eslint.results[0].messages);