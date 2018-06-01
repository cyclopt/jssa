const fs = require('fs');
const walk = require('walk');
const path = require('path');

module.exports = {
  readCode: function (pathToCode) {
    if (fs.lstatSync(pathToCode).isDirectory()) {
      return {
        path: pathToCode,
        code: null,
      };
    }
    return {
      path: pathToCode,
      code: fs.readFileSync(pathToCode).toString().trim(),
    };
  },
  get_list_of_js_files: function (root_dir){

    return new Promise((resolve, reject) => {
      walker = walk.walk(root_dir, { filters: ["node_modules"] });
      var list_of_files = [];
      walker.on("file", function (root, fileStats, next) {
        if(fileStats.name.endsWith('.js')){
          list_of_files.push(root + path.sep + fileStats.name);
        }
        next();
      });
      walker.on("end", function () {
        resolve(list_of_files);
      });
    });
  }
};