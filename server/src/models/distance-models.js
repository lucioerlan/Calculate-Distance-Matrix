const db = require('../database/db-config');

const returnDocs = async () => {
  return db('distance').orderBy('created_at', 'desc').limit(8);
};

const createDoc = async (fullname, chooseDistances, docFile) => {
  if (!fullname || !chooseDistances || !docFile) throw new Error('Field not filled!');

  await db('distance').insert({
    fullname,
    chooseDistances,
    docFile,
  });
};

module.exports = {
  returnDocs,
  createDoc,
};
