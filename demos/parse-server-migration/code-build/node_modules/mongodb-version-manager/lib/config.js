var path = require('path');
var fs = require('fs-extra');
var untildify = require('untildify');

exports = {};

var dest;
var modulePath = path.join(process.cwd(), 'node_modules', 'mongodb-version-manager');
if (process.env.MONGODB_VERSIONS) {
  dest = untildify(process.env.MONGODB_VERSIONS);
} else {
  try {
    /* eslint no-sync:0 */
    var isLocal = fs.statSync(modulePath).isDirectory();
    if (isLocal) {
      dest = path.join(modulePath, '.mongodb');
    } else {
      dest = untildify('~/.mongodb/versions');
    }
  } catch (err) {
    dest = untildify('~/.mongodb/versions');
  }
}
fs.mkdirsSync(dest);

exports.cache = path.resolve(dest);

// expire versions cache page every hour
exports.expire = 60 * 60 * 1000;

exports.ROOT_DIRECTORY = path.join(exports.cache);
exports.CURRENT_DIRECTORY = path.join(exports.ROOT_DIRECTORY, 'mongodb-current');
exports.CURRENT_BIN_DIRECTORY = path.join(exports.CURRENT_DIRECTORY, 'bin');

module.exports = exports;
