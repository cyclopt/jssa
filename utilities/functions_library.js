const fs = require('fs');

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
  }
};