#!/usr/bin/env node

/* eslint no-sync:0, no-console:0, no-octal-escape:0, no-path-concat:0 */
var fs = require('fs');
var docopt = require('docopt').docopt;
var pkg = require('../package.json');
var path = require('path');

var docoptString = fs.readFileSync(path.join(__dirname, 'm.docopt'), 'utf-8');
docoptString = docoptString.replace(/[\r]/g, '');
var argv = docopt(docoptString, {
  version: pkg.version
});

if (argv['--debug']) {
  process.env.DEBUG = '*';
}

var mvm = require('../');
var difference = require('lodash.difference');
var chalk = require('chalk');
var figures = require('figures');
var debug = require('debug')('mongodb-version-manager');
var cmd;

function printVersions(versions, fn) {
  mvm.current(function(err, current) {
    if (err) return fn(err);

    console.log(
      versions
        .map(function(v) {
          if (v === current) {
            return ' \033[32mο ' + v + '\033[0m \033[90m \033[0m';
          }
          return '   ' + v + '\033[90m \033[0m';
        })
        .join('\n')
    );

    fn();
  });
}

var abortIfError = function(err) {
  if (err) {
    console.error(
      chalk.bold.red(figures.cross),
      ' Error:',
      chalk.bold.red(err.message)
    );

    console.error('We apologize for this issue and welcome your bug reports.');
    console.error(
      'Please visit: https://github.com/mongodb-js/version-manager/issues'
    );
    console.error();
    console.error('Try running your command again with debugging on:');
    console.error('   m ' + cmd + ' --debug');
    console.error();
    if (typeof err.stack !== 'undefined') {
      console.error(chalk.bold('Stack Trace'));
      err.stack.split('\n').map(function(line) {
        console.error('  ', chalk.gray(line));
      });
    }
    return process.exit(1);
  }
};

var commands = {
  available: function() {
    var title = '';
    if (!argv['--rc'] && !argv['--stable'] && !argv['--unstable']) {
      argv['--all'] = true;
    }
    if (argv['--all']) {
      argv['--stable'] = true;
      argv['--unstable'] = true;
      argv['--rc'] = true;
      title = 'All';
    } else {
      var includes = [];
      if (argv['--stable']) {
        includes.push('Stable');
      }
      if (argv['--unstable']) {
        includes.push('Unstable');
      }
      if (argv['--rc']) {
        includes.push('Release Candidates');
      }
      title = includes.join('|');
    }

    if (argv['<range>']) {
      title = 'All versions matching ' + argv['<range>'];
    }
    
    var opts = {
      stable: argv['--stable'],
      unstable: argv['--unstable'],
      rc: argv['--rc'],
      pokemon: argv['--pokemon'],
      range: argv['<range>']
    };

    mvm.installed(function(err, installed) {
      /* eslint no-shadow:0 */
      abortIfError(err);

      mvm.available(opts, function(err, versions) {
        abortIfError(err);

        if (!versions || versions.length === 0) {
          return abortIfError(new Error('No available versions?'));
        }

        if (opts.pokemon) {
          console.log(title + " versions you haven't installed yet:");
          versions = difference(versions, installed);
        }
        printVersions(versions, function(err) {
          abortIfError(err);
        });
      });
    });
  },
  path: function() {
    mvm.path(function(err, p) {
      abortIfError(err);
      console.log(p);
    });
  },
  use: function(opts) {
    mvm.use(opts, function(err) {
      abortIfError(err);
      mvm.current(function(err, v) {
        abortIfError(err);
        console.log('switched to ' + v);
      });
    });
  },
  list: function() {
    mvm.installed(function(err, versions) {
      abortIfError(err);

      if (versions.length > 0) {
        return printVersions(versions, function(err) {
          if (err) return console.log(err) && process.exit(1);
        });
      }

      console.log('0 versions installed.  Run one of:');

      mvm.resolve(
        [
          {
            version: 'unstable'
          },
          {
            version: 'stable'
          }
        ],
        function(err, data) {
          abortIfError(err);

          if (!data || !data.stable || data.unstable) {
            return abortIfError(new Error('Unknown error'));
          }

          console.log(
            '    m use stable; # installs MongoDB v' + data.stable.version
          );
          console.log(
            '    m use unstable; # installs MongoDB v' + data.unstable.version
          );
        }
      );
    });
  }
};

var opts = {
  version: argv['<version>'],
  branch: argv['--branch'],
  distro: argv['--distro'],
  enterprise: argv['--enterprise'],
  range: argv['<range>']
};

cmd = Object.keys(commands).filter(function(name) {
  return argv[name] === true;
})[0];

if (!cmd) {
  cmd = argv['<version>'] ? 'use' : 'list';
}

debug('cmd is `%s` with opts `%j`', cmd, opts);

commands[cmd](opts);
