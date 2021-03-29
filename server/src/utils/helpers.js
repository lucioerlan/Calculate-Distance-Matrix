/* eslint-disable global-require */
const fs = require('fs');
const util = require('util');

const helper = {
  parse: util.promisify(require('csv-parse')),
  stringify: util.promisify(require('csv-stringify')),
  read: util.promisify(fs.readFile),
  write: util.promisify(fs.writeFile),
};

const GoogleUrl = (row, origin, destination) => {
  return `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${row[origin]}&destinations=${row[destination]}&mode=driving&key=${process.env.GOOGLE_MAPS_API_KEY}`;
};

module.exports = {
  helper,
  GoogleUrl,
};
