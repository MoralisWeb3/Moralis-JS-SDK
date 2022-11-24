var util = require('util');
var isMongodbRunning = require('./');

module.exports = util.promisify(isMongodbRunning);
