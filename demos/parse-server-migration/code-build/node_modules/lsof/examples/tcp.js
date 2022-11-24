#!/usr/bin/env node

var lsof = require('../lib/lsof');

// What is running on port 11211?
lsof.rawTcpPort(11211, function(data) {
    console.log(data);
});
