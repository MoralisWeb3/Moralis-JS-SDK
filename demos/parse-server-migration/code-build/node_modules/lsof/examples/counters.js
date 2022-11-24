#!/usr/bin/env node

var lsof = require('../lib/lsof');

lsof.counters(function(data) {
    console.log(data);
});
