const db = require("../database/db-config");
const { helper } = require("../utils/helpers");
const _ = require("lodash");
const path = require("path");
const request = require("request-promise-native");


const getFiles = async (req, res) => {
  const result = await db("distance").orderBy("created_at", "desc").limit(4);

  try {
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


const processFiles = async (req, res) => {
  const { fullname, chooseDistances } = req.body;
  const { filename: image } = req.file;

  const raw = await helper.read(
    path.join(`${process.env.FOLDER_PATH}/` + image)
  );

  const data = await helper.parse(raw, { relax: true });
  const headers = data.shift();

  for (let row of data) {
    
    const origin = headers.indexOf("Origin");
    const destination = headers.indexOf("Destination");

    const response = await request({
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${row[origin]}&destinations=${row[destination]}&mode=driving&key=${process.env.GOOGLE_MAPS_API_KEY}`,
      json: true,
      resolveWithFullResponse: true,
    });

    if (response.statusCode === 200) {
      let resultado = _.get(
        response,
        `body.rows[0].elements[0].${chooseDistances}`
      );
      row.push(resultado);
    }
    const output = await helper.stringify(data);
    helper.write(`${process.env.FOLDER_PATH}/` + image, output);
  }

  const result = await db("distance").insert({
    fullname,
    chooseDistances,
    fileName: image,
  });

  try {
    req.io.emit("post", result);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  processFiles,
  getFiles,
};
