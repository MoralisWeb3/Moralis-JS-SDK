var which = require('which');
var exec = require('child_process').exec;
var startsWith = require('lodash.startswith');

function configure(opts, done) {
  if (opts.db) return done(null, opts);

  if (opts.path) {
    if (
      startsWith(opts.path, 'mongodb://') ||
      startsWith(opts.path, 'localhost')
    ) {
      if (!startsWith('mongodb://', opts.path)) {
        opts.path = 'mongodb://' + opts.path;
      }
      opts.uri = opts.path;
    }
  }

  if (opts.uri) {
    opts.close_connection = true;
    try {
      var mongodb = require('mongodb');
    } catch (e) {
      console.error(
        'get-mongodb-version: Failed to load MongoDB driver. Cannot lookup version by URI.',
        e
      );
      return done(e);
    }

    return mongodb(opts.uri, function(err, db) {
      if (err) return done(err);
      opts.db = db;
      done(null, opts);
    });
  }

  if (!opts.path) {
    return which('mongod', function(err, mongod_bin) {
      if (err) return done(err);

      if (!mongod_bin) {
        return done(new Error('No mongod in path.'));
      }
      done(null, opts);
    });
  }
  done(null, opts);
}

function fromPath(opts, done) {
  exec(opts.path + ' --version', function(err, stdout) {
    if (err) return done(err);

    var shellVersion = stdout
      .toString('utf-8')
      .split('\n')[0]
      .split(',')[0]
      .replace('db version v', '');

    done(null, shellVersion);
  });
}

function fromDB(opts, done) {
  opts.db.admin().serverInfo(function(err, res) {
    if (err) return done(err);

    if (opts.close_connection) {
      opts.db.close();
    }
    done(null, res.version);
  });
}

module.exports = function(opts, done) {
  configure(opts, function(err, opts) {
    if (err) return done(err);

    if (opts.db) return fromDB(opts, done);

    return fromPath(opts, done);
  });
};
