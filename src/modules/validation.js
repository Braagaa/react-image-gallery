const R = require('ramda');

const isNotNumber = R.pipe(parseFloat, isNaN);
const isLessThan0 = R.lt(R.__, 0);
const isGreatherThenMax = R.gt;

module.exports = {isNotNumber, isLessThan0, isGreatherThenMax};
