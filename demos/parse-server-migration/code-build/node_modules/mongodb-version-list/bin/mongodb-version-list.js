#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
/* eslint no-sync:0 */
var usage = fs.readFileSync(path.resolve(__dirname, '../usage.txt')).toString();
var args = require('minimist')(process.argv.slice(2), {
  boolean: ['debug']
});

if (args.debug) {
  process.env.DEBUG = 'mongodb-version-list';
}
var getList = require('../');
var pkg = require('../package.json');

if (args.help || args.h) {
  console.error(usage);
  process.exit(1);
}
if (args.version) {
  console.error(pkg.version);
  process.exit(1);
}

getList(args, function(err, versions) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log(JSON.stringify(versions));
});
