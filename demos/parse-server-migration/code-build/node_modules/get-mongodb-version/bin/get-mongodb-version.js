#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
/*eslint no-sync:0*/
var usage = fs.readFileSync(path.resolve(__dirname, '../usage.txt')).toString();
var args = require('minimist')(process.argv.slice(2), {
  boolean: ['debug']
});

var getVersion = require('../');

args.path = args._[0];

if (args.help || args.h) {
  console.error(usage);
  process.exit(1);
}

getVersion(args, function(err, version) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log(version);
});
