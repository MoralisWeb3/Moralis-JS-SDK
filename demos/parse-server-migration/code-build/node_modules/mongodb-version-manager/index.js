var async = require('async');
var fs = require('fs-extra');
var path = require('path');
var versions = require('mongodb-version-list');
var semver = require('semver');
var defaults = require('lodash.defaults');
var config = require('./lib/config');
var activate = require('./lib/activate');
var download = require('./lib/download');
var Model = require('./lib/model');
var resolve = require('./lib/resolve');

// var VERSION = /[0-9]+\.[0-9]+\.[0-9]+([-_\.][a-zA-Z0-9]+)?/;

activate.addToPath(config.CURRENT_BIN_DIRECTORY);

module.exports = exports = function(opts, fn) {
  if (typeof opts === 'function') {
    fn = opts;
    opts = {};
  } else if (typeof opts === 'string') {
    opts = {
      version: opts
    };
  }
  opts.version = opts.version || process.env.MONGODB_VERSION;

  exports.use(opts, fn);
};

exports.resolve = function(opts, done) {
  resolve(opts, function(err, res) {
    if (err) return done(err);

    done(null, new Model(res));
  });
};

var getVersion = require('get-mongodb-version');
exports.current = function(done) {
  var mongod = path.join(config.CURRENT_BIN_DIRECTORY, 'mongod');
  fs.exists(mongod, function(exists) {
    if (!exists) return done(null, null);

    getVersion({path: mongod}, done);
  });
};
exports.config = config;
exports.path = function(fn) {
  fn(null, config.CURRENT_BIN_DIRECTORY);
};

exports.installed = function(fn) {
  fs.readdir(config.ROOT_DIRECTORY, function(err, files) {
    files = files || [];
    if (err) return fn(null, files);

    fn(null, files);
  });
};

exports.available = function(opts, fn) {
  opts = defaults(opts || {}, {
    stable: false,
    unstable: false,
    rc: false,
    range: undefined
  });

  versions(function(err, res) {
    if (err) return fn(err);
    res = res.map(function(v) {
      return semver.parse(v);
    })
      .filter(function(v) {
        if (opts.range) {
          return semver.satisfies(v.version, opts.range);
        }

        v.stable = v.minor % 2 === 0;
        v.unstable = !v.stable;
        v.rc = v.prerelease.length > 0;

        if (!opts.rc && v.rc) return false;
        if (!opts.stable && v.stable) return false;
        if (!opts.unstable && v.unstable) return false;
        return true;
      })
      .map(function(v) {
        return v.version;
      });
    fn(null, res);
  });
};

exports.is = function(s, done) {
  exports.current(function(err, v) {
    if (err) return done(err);

    done(null, semver.satisfies(v, s));
  });
};

exports.install = function(version, done) {
  resolve({
    version: version
  }, function(err, model) {
    if (err) return done(err);

    download(model, done);
  });
};

exports.use = function(opts, done) {
  /* eslint no-shadow:0 */
  resolve(opts, function(err, model) {
    if (err) return done(err);

    // @todo (imlucas) Current needs to take into account
    // enterprise, debug, platform, bits, etc.
    // exports.current(function(err, v) {
    //   if (err) return done(err);
    //
    //   if (model.version === v) {
    //     debug('already using ' + v);
    //     return done(null, model);
    //   }

    async.series([
      download.bind(null, model),
      activate.bind(null, model)
    ], function(err) {
      if (err) return done(err);
      return done(null, model);
    });
  });
};
