var downcache = require('downcache');
var cheerio = require('cheerio');
var semver = require('semver');
var fs = require('fs-extra');
var path = require('path');
var cacheDir = require('os').tmpdir();
var debug = require('debug')('mongodb-version-list');

var VERSION_REGEX = /[0-9]+\.[0-9]+\.[0-9]+([-_\.][a-zA-Z0-9]+)?/;

// expire versions cache page every hour
var CACHE_TIME = 60 * 60 * 1000;

var CACHE_FILE = path.resolve(cacheDir + '/dl.mongodb.org/dl/src/index.html');

var cacheCleanup = function(opts, done) {
  if (typeof opts === 'function') {
    done = opts;
    opts = {};
  }

  fs.exists(CACHE_FILE, function(exists) {
    if (!exists) {
      debug('no cache file');
      return done();
    }
    fs.stat(CACHE_FILE, function(err, stats) {
      if (err) return done(err);

      if (!stats) {
        debug('no stats for cache file');
        return done();
      }

      debug('cache last modified %d', stats.mtime);
      if (Date.now() - stats.mtime.getTime() >= CACHE_TIME) {
        debug('cache is expired');
        return fs.unlink(CACHE_FILE, done);
      }
      debug('using cached versions html');
      done();
    });
  });
};

module.exports = function(opts, done) {
  if (typeof opts === 'function') {
    done = opts;
    opts = {};
  }

  debug('getting versions list');
  debug('versions cache %s/dl.mongodb.org/dl/src', cacheDir);
  cacheCleanup(function(err) {
    if (err) return done(err);

    downcache('http://dl.mongodb.org/dl/src/', {
      dir: cacheDir
    }, function(err2, res, body) {
      if (err2) return done(err2);

      var $ = cheerio.load(body);
      var versions = {};
      var $links = $('tr a');

      debug('extracting from %d links in table', $links.length);
      $links.map(function() {
        var url = $(this).attr('href');
        var matches = VERSION_REGEX.exec(url);
        if (!matches) return;

        versions[
          matches[0]
            .replace(/\.zip|\.tar|\.tgz/, '')
            .replace('_', '-')
            .replace('.rc', '-rc')
        ] = 1;
      });
      debug('filtering out pre 2.2 versions');
      versions = Object.keys(versions).filter(semver.lt.bind(null, '2.2.0'));
      versions.sort(semver.rcompare);
      debug('%d versions of mongodb are available', versions.length);
      done(null, versions);
    });
  });
};
