const moment = require('moment');

function datetimeNow() {
  try {
    const now = moment();
    const dateHourNow = now.format('YYYY-MM-DD HH:mm:ss.SSSSSSSSS');
    return dateHourNow;
  } catch (e) {
    return 0;
  }
}

module.exports = {
  datetimeNow
};
