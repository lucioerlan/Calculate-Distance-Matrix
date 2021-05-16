const Distance = require('../schema/distance-schema');

const GetAll = async () => {
  return Distance.find().sort([['createdAt', 'descending']]);
};

const Store = async (fullname, chooseDistances, docFile) => {
  if (!docFile) throw new Error('docFile not filled!');

  return Distance.create({
    fullname,
    chooseDistances,
    docFile,
  });
};

module.exports = {
  GetAll,
  Store,
};
