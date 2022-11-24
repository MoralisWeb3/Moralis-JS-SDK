var async = require('async');
var chalk = require('chalk');
var fs = require('fs-extra');
var tildify = require('tildify');
var figures = require('figures');
var dl = require('download');
var debug = require('debug')('mongodb-version-manager:download');

function download(model, done) {
  debug('downloading artifact from `%s` to `%s`...',
    model.url, tildify(model.directory));

  var quiet = process.env.silent;
  var options = {
    extract: true,
    strip: 1,
    retries: 3
    // filename: model.filename,
    // output: model.directory

  };
  debug(model.url, model.root_directory, options);
  dl(model.url, model.root_directory, options).then(function() {
    debug('successfully downloaded MongoDB version v%s to %s',
      model.version, model.root_directory);
    if (!quiet) {
      console.log(chalk.bold.green(figures.tick),
        ' Downloaded MongoDB', model.version);
    }
    done();
  })
  .catch(function(err) {
    debug('error downloading!', err);
    console.error(err);
    done(err);

    // debug('removing incomplete artifact from `%s`',
    //   model.root_directory);
    //
    // fs.unlink(model.root_directory, function() {
    //   done(err);
    // });
  });
}

module.exports = function(model, done) {
  debug('downloading', model.serialize({
    props: true,
    derived: true
  }));
  async.series([
    function(cb) {
      fs.stat(model.bin_directory, function(err) {
        if (err) {
          cb();
        } else {
          cb(new Error('already exists'));
        }
      });
    },
    download.bind(null, model)
  ], function(err, results) {
    if (err && err.message === 'already exists') {
      debug('already have artifact at `%s`', model.bin_directory);
      return done();
    }
    if (err) {
      return done(err);
    }
    done();
  });
};
