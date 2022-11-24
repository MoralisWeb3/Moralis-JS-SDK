#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
/*eslint no-sync:0*/
var usage = fs.readFileSync(path.resolve(__dirname, '../usage.txt')).toString();
var args = require('minimist')(process.argv.slice(2), {
  boolean: ['debug']
});

if (args.debug) {
  process.env.DEBUG = 'mongodb-dbpath';
}
var dbpath = require('../');
var pkg = require('../package.json');

args.name = args._[0];

if (args.help || args.h || !args.name) {
  console.error(usage);
  process.exit(1);
}
if (args.version) {
  console.error(pkg.version);
  process.exit(1);
}

dbpath(args, function(err, res) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.error(res);
});
