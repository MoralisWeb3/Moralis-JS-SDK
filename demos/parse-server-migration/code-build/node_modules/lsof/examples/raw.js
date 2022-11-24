#!/usr/bin/env node

var lsof = require('../lib/lsof');

lsof.raw(function(data) {
    console.log(data);
});

