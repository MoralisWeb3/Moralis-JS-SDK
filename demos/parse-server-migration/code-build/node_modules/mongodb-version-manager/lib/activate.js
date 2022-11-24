var config = require('./config');
var fs = require('fs-extra');
var async = require('async');
var delimiter = require('path').delimiter;
var debug = require('debug')('mongodb-version-manager:activate');

/**
 * Make sure the bin directory for the current version
 * is in `$PATH`.
 * @param {String} directory
 *
 * @todo (imlucas): :axe: env helper from `mongodb-js/mj`
 * and use it here.
 */
function addToPath(directory) {
  var srcs = process.env.PATH.split(delimiter);
  if (srcs.indexOf(directory) === -1) {
    srcs.unshift(directory);
    process.env.PATH = srcs.join(delimiter);
    debug('added `%s` to $PATH and its now `%s`',
      directory, process.env.PATH);
  }
}

module.exports = function(model, done) {
  async.series([function(cb) {
    debug('removing old symlink if it exists...');
    fs.remove(config.CURRENT_DIRECTORY, function() {
      cb();
    });
  }, function(cb) {
    debug('symlinking `%s` -> `%s`...', model.root_directory, config.CURRENT_DIRECTORY);
    fs.symlink(model.root_directory, config.CURRENT_DIRECTORY, cb);
  }
  ], done);
};

module.exports.addToPath = addToPath;
