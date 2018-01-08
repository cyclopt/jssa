/**
 * This file contains code that runs the eslint static analyzer
 */

// Load libraries
const eslint = require('eslint');

// escomplex properties
const environments = [
  'es6',
];

// Basic eslint rules
const cli = new eslint.CLIEngine({
  envs: environments,
  useEslintrc: false,
  rules: {
    // Warnings
    'no-cond-assign': [1, 'except-parens'],
    'no-extra-semi': 1,
    'no-irregular-whitespace': 1,
    'no-unexpected-multiline': 1,
    'default-case': 1,
    eqeqeq: 1,
    'no-empty-function': 1,
    'no-multi-spaces': 1,
    'no-unused-labels': 1,
    yoda: [1, 'never'],
    'max-depth': 1,
    'max-nested-callbacks': 1,
    'no-trailing-spaces': 1,

    // Errors
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty': 2,
    'no-empty-character-class': 2,
    'no-func-assign': 2,
    'no-invalid-regexp': 2,
    'no-unreachable': 2,
    'use-isnan': 2,
    'no-redeclare': 2,
    'no-self-assign': 2,
    'no-shadow': 2,
    'no-use-before-define': 2,
    'no-unused-vars': 2,
  },
});

module.exports = {
  // Perfrorm analysis
  analysis: function (paths) {
    return {
      "eslint": cli.executeOnFiles(paths)
    };
  }
};