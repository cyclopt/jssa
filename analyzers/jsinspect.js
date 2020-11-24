/* eslint-disable new-cap */
/**
 * This file contains code that runs the escomplex static analyzer
 */

// Load libraries
const stream = require("stream");
const { inherits } = require("util");

const jsinspect = require("jsinspect");

const Writable = stream.Writable;

const memStore = {};

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
		memStore[key] = new Buffer.alloc(0);
	}

	_write(chunk, enc, cb) {
		// our memory store stores things in buffers
		const buffer = (Buffer.isBuffer(chunk))
			? chunk // already is Buffer use it
			: Buffer.from(chunk, enc); // string, convert
		// concat to the buffer already there
		memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
		cb();
	}
}
inherits(WMStrm, Writable);

module.exports = {
	// Perfrorm analysis
	analysis(listOfFiles) {
		return new Promise((resolve, reject) => {
			// Create Stream
			const wstream = new WMStrm("output");

			// Object to store analysis result
			const analysisOutput = {};

			// Create inspector
			const inspector = new jsinspect.Inspector(listOfFiles, { threshold: 25 });
			// Create reporter
			// eslint-disable-next-line no-unused-vars
			const reporter = new jsinspect.reporters.json(inspector, { writableStream: wstream });
			inspector.run(); // Run inspector

			wstream.on("finish", () => {
				try {
					analysisOutput.jsinspect = JSON.parse(memStore.output.toString());
					resolve(analysisOutput);
				} catch {
					// TODO (Handle cases where the buffer is more than 256MB. In those cases toString() function fails)
					analysisOutput.jsinspect = JSON.parse("[]");
					resolve(analysisOutput);
				}
			});
			wstream.on("error", reject);
		});
	},
};
