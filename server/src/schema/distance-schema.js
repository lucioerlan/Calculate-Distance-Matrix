const mongoose = require('mongoose');

const Distance = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  chooseDistances: {
    type: String,
    required: true,
  },
  docFile: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('distance', Distance);
