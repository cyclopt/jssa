/**
 * This file contains code that runs the eslint static analyzer
 */

// Load libraries
const { CLIEngine } = require('eslint');

// Basic eslint rules
const cli = new CLIEngine({
  useEslintrc: false,
  configFile: 'cyclopt-eslint.json',
});

module.exports = {
  // Perfrorm analysis
  analysis: function (paths) {
    return {
      "eslint": cli.executeOnFiles(paths)
    };
  }
};