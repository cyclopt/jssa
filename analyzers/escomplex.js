/**
 * This file contains code that runs the escomplex static analyzer
 */

// Load libraries
const escomplex = require("escomplex");

// escomplex properties
const escomplexProperties = { ignoreErrors: true };

module.exports = {
	// Perfrorm analysis
	analysis(projectSource) {
		return {
			escomplex: escomplex.analyse(projectSource, escomplexProperties),
		};
	},
};
