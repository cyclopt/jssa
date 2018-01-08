/**
 * This file contains code that runs the escomplex static analyzer
 */

// Load libraries 
const escomplex = require('escomplex');

// escomplex properties
const escomplex_properties = { ignoreErrors: true };

module.exports = {
  // Perfrorm analysis
  analysis: function (project_source) {
    return {
      escomplex: escomplex.analyse(project_source, escomplex_properties)
    };
  }
};