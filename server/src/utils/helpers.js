const fs = require('fs');
const util = require('util');

const helper = {
  parse: util.promisify(require('csv-parse')),
  stringify: util.promisify(require('csv-stringify')),
  read: util.promisify(fs.readFile),
  write: util.promisify(fs.writeFile),
};

module.exports = {
  helper
};
