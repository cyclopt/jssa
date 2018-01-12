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
  
  // Get the absolute path of the jssa installed directory. If spaces are contained in the path, then they need to be escaped.
  var jssaAbsPath = __dirname.replace(' ', '\" \"');
  return nsp_analysis.analysis(jssaAbsPath, project, environemnt);    
}

function jsinspect(list_of_files){
    
  return jsinspect_analysis.analysis(list_of_files);    
}

function sonarjs(project){
    
  return sonarjs_analysis.analysis(project);    
}

module.exports = {
  analyze_all: function (project_root, list_of_files, environemnt){
    return new Promise((resolve, reject) => {
      escomplex_results = escomplex(list_of_files);
      eslint_results = eslint(list_of_files);
      nsp_results = nsp(project_root, environemnt);
      jsinspect(list_of_files).then(jsinspect_results => {
        sonarjs(project_root).then(sonarjs_results => {
          var results = {};
          results.escomplex = escomplex_results.escomplex;
          results.eslint = eslint_results.eslint;
          results.nsp = nsp_results.nsp;
          results.jsinspect = jsinspect_results;
          results.sonarjs = sonarjs_results;
          resolve(results);
        })
        .catch(err =>{
          reject("sonarjs analysis failed");
        });
      })
      .catch(err =>{
        reject("jsinspect analysis failed");
      });
    });
  }
};