var path = require('path');
var os = require('os');
var untildify = require('untildify');
var debug = require('debug')('mongodb-dbpath');
var mkdirp = require('mkdirp');
var series = require('async').series;

module.exports = function(opts, fn) {
  if (typeof opts === 'string') {
    opts = {
      name: opts
    };
  }
  if (!opts.name) {
    return fn(new Error('Missing required `name` option.'));
  }

  var search = [];
  if (os.platform() === 'win32') {
    search.push(path.resolve(process.env.LOCALAPPDATA || process.env.APPDATA,
      '/mongodb/data/' + opts.name));
  } else {
    search.push(untildify('~/.mongodb/data/' + opts.name));
  }
  search.push(path.resolve(process.cwd(), '/mongodb/data/' + opts.name));

  debug('searching for writeable dbpath in', search);
  series(search.map(function(p) {
    return function(cb) {
      mkdirp(p, function(err) {
        // bit weird but easy way to cheat async error handlers into breakers.
        return !err ? cb(p) : cb();
      });
    };
  }), function(res) {
    if (!res) return fn(new Error('Could not create any of ' + JSON.stringify(search)));
    debug('dbpath is', res);
    fn(null, res);
  });
};
