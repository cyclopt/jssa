/**
 * This file contains code that runs the escomplex static analyzer
 */

// Load libraries
const jsinspect = require('jsinspect');
const fs = require('fs');
const stream = require('stream');
const util = require('util');
const Writable = stream.Writable;

var memStore = {};

// Class that implements a writable stream
class WMStrm {

    constructor(key, options) {
        // allow use without new operator
        if (!(this instanceof WMStrm)) {
            return new WMStrm(key, options);
        }
        // init super
        Writable.call(this, options);
        // save key 
        this.key = key; 
        // Create an empty buffer
        memStore[key] = new Buffer(''); 
    }
    _write(chunk, enc, cb) {
        // our memory store stores things in buffers
        var buffer = (Buffer.isBuffer(chunk)) ?
            chunk : // already is Buffer use it
            new Buffer(chunk, enc); // string, convert
        // concat to the buffer already there
        memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
        cb();
    }
}
util.inherits(WMStrm, Writable);

module.exports = {
  // Perfrorm analysis
  analysis: function (list_of_files) {
    return new Promise((resolve, reject) => {
    
      // Create Stream
      var wstream = new WMStrm('output');
    
      // Object to store analysis result
      const analysis_output = {};
      
      // Create inspector
      const inspector = new jsinspect.Inspector(list_of_files, { "threshold": 10 });
      // Create reporter
      const reporter = new jsinspect.reporters.json(inspector, { "writableStream": wstream });
      inspector.run(); // Run inspector
    
      wstream.on('finish', function () {
        analysis_output.jsinspect = JSON.parse(memStore.output.toString());
        resolve(analysis_output);
      });
      wstream.on('error', reject);
    });
  }
};