/**
 * This file contains the Cyclopt static analyzer that performs every analysis
 */

// Load libraries
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

// Load analyzers
const escomplex_analysis = require('./analyzers/escomplex');
const npmaudit_analysis = require('./analyzers/npmaudit');
const jsinspect_analysis = require('./analyzers/jsinspect');
const sonarjs_analysis = require('./analyzers/sonarjs');

// Load custom modules
const lib = require('./utilities/functions_library');

function escomplex(list_of_files){

  project_source = _.chain(list_of_files).map(lib.readCode).reject(['code', null]).value();
  return escomplex_analysis.analysis(project_source);

}

function eslint(list_of_files){

  return require('./analyzers/eslint').analysis(list_of_files);
}

function npmaudit(project){
  const packageJSONFilepath = path.join(project, 'package.json')
  const packageLockFilepath = path.join(project, 'package-lock.json')
  if(fs.existsSync(packageJSONFilepath) && fs.existsSync(packageLockFilepath)){
    const packageJSON = JSON.stringify(require(packageJSONFilepath));
    const packageLock = JSON.stringify(require(packageLockFilepath));
    return npmaudit_analysis.analysis(packageJSON, packageLock);
  } else {
    if(!fs.existsSync(packageJSONFilepath)){
      return {"npmaudit": {"error": "package.json not found"}};
    }
    else {
      return {"npmaudit": {"error": "package-lock.json not found"}};
    }

  }

}

function jsinspect(list_of_files){

  return jsinspect_analysis.analysis(list_of_files);
}

function sonarjs(project){

  return sonarjs_analysis.analysis(project);
}

module.exports = {
  analyze_all: function (project_root, list_of_files){
    return new Promise((resolve, reject) => {
      escomplex_results = escomplex(list_of_files);
      eslint_results = eslint(list_of_files);
      npm_audit_results = npmaudit(project_root);
      jsinspect(list_of_files).then(jsinspect_results => {
        sonarjs(project_root).then(sonarjs_results => {
          var results = {};
          results.escomplex = escomplex_results.escomplex;
          results.eslint = eslint_results.eslint;
          results.npm_audit = npm_audit_results.npmaudit;
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
  },
  analyze_sonarjs: function(project_root){
    return new Promise((resolve, reject) => {
      resolve(sonarjs(project_root));
    });
  },
  analyze_eslint: function(list_of_files){
    return new Promise((resolve, reject) => {
      resolve(eslint(list_of_files));
    });
  },
  analyze_npmaudit: function(project_root){
    return new Promise((resolve, reject) => {
      resolve(npmaudit(project_root));
    });
  },
  analyze_jsinspect: function(list_of_files){
    return new Promise((resolve, reject) => {
      resolve(jsinspect(list_of_files));
    });
  },
  analyze_escomplex: function(list_of_files){
    return new Promise((resolve, reject) => {
      resolve(escomplex(list_of_files));
    });
  }
};