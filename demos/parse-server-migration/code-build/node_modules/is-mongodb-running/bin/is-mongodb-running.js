#!/usr/bin/env node

/* eslint no-sync:0 */
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var figures = require('figures');

var usage = fs.readFileSync(path.resolve(__dirname, '../usage.txt')).toString();
var args = require('minimist')(process.argv.slice(2), {
  boolean: ['debug', 'json']
});

if (args.debug) {
  process.env.DEBUG = 'is-mongodb-running';
}
var lookup = require('../promise');
var pkg = require('../package.json');

if (args.help || args.h) {
  console.error(usage); // eslint-disable-line no-console
  process.exit(1);
}
if (args.version) {
  console.error(pkg.version); // eslint-disable-line no-console
  process.exit(1);
}

lookup(args).then(function(res) {
  if (args.json) {
    console.log(JSON.stringify(res, null, 2)); // eslint-disable-line no-console
  } else {
    if (res.length === 0) {
      console.log('☹ No MongoDB instances running'); // eslint-disable-line no-console
      return;
    }
    console.log(chalk.green(figures.tick), // eslint-disable-line no-console
      ' Yep!', res.length, 'MongoDB instance(s) running:');
    res.map(function(d, i) {
      console.log('  ', i + 1 + '.', // eslint-disable-line no-console
        'port',
        chalk.bold(d.port),
        'with pid',
        chalk.bold(d.pid));
    });
  }
}).catch(function(err) {
  if (args.json) {
    err = JSON.stringify(err, null, 2);
  }
  console.error(chalk.red(figures.cross), err.message); // eslint-disable-line no-console
  console.error(chalk.gray(err.stack)); // eslint-disable-line no-console
  process.exit(1);
});
