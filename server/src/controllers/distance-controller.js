const _ = require('lodash');
const path = require('path');
const request = require('request-promise-native');
const { helper, GoogleUrl } = require('../utils/helpers');
const Util = require('../utils/Utils');
const { returnDocs, createDoc } = require('../models/distance-models');

const util = new Util();

/**
 * The DistanceController.
 *
 * @method index get eight document
 * @method prepare prepare for the document
 * @method store create document as a result
 */


class DistanceController {
  constructor() {
    this.store = this.store.bind(this);
  }

  async index(req, res) {
    try {
      const result = await returnDocs();

      if (result) {
        util.setSuccess(200, result);
      } else {
        util.setError(400, 'no data!');
      }

      return util.send(res);
    } catch (err) {
      util.setError(500, err);
      return util.send(res);
    }
  }

  async store(req, res) {
    try {
      const { fullname, chooseDistances } = req.body;
      const { filename: docFile } = req.file;

      const raw = await helper.read(
        path.join(`${process.env.FOLDER_PATH}/${docFile}`)
      );

      const rows = await helper.parse(raw, { relax: true });

      const headers = rows.shift();

      for (const row of rows) {
        const origin = headers.indexOf('Origin');
        const destination = headers.indexOf('Destination');

        this.prepare(
          row,
          docFile,
          chooseDistances,
          origin,
          destination,
          rows
        );
      }

      util.setSuccess(200, createDoc(fullname, chooseDistances, docFile));
      req.io.emit('post');

      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  async prepare(row, docFile, chooseDistances, origin, destination, rows) {
    
    const options = {
      method: 'GET',
      url: GoogleUrl(row, origin, destination),
      json: true,
      resolveWithFullResponse: true,
    };

    request(options, async (error, response) => {
      if (error) throw new Error(error);

      const resultado = _.get(
        response,
        `body.rows[0].elements[0].${chooseDistances}`
      );
      row.push(resultado);

      const output = await helper.stringify(rows);
      helper.write(`${process.env.FOLDER_PATH}/${docFile}`, output);
    });

  }
}

module.exports = DistanceController;
