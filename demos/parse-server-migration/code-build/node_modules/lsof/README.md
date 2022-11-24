# lsof For Node

A simple `lsof` processor for node. This is handy when debugging long apps. You can load this and
call it from your `status` commands to see how many open file descriptors your process has.


## Install

    npm install lsof

## Build Status

[![Build Status](https://secure.travis-ci.org/davglass/node-lsof.png?branch=master)](http://travis-ci.org/davglass/node-lsof)

## Usage

    var lsof = require('../lib/lsof');

    lsof.counters(function(data) {
        console.log(data);
        /*
        *
        * { pid: 24231
        *   , user: 'davglass'
        *   , open: 12
        *   , types: { dir: 1, reg: 3, chr: 3, pipe: 5 }
        *   }
        *
        */
    });
    

    lsof.raw(function(data) {
        console.log(data);
        /**
        * [ { command: 'node'
        *   , pid: '24231'
        *   , user: 'davglass'
        *   , fd: 'txt'
        *   , type: 'REG'
        *   , device: '14,1'
        *   , 'size/off': '5139784'
        *   , node: '15331212'
        *   , name: '/usr/local/bin/node'
        *   }
        * , { command: 'node'
        *   , pid: '24231'
        *   , user: 'davglass'
        *   , fd: 'txt'
        *   , type: 'REG'
        *   , device: '14,1'
        *   , 'size/off': '1054960'
        *   , node: '7477054'
        *   , name: '/usr/lib/dyld'
        *   }
        * , { command: 'node'
        *   , pid: '24231'
        *   , user: 'davglass'
        *   , fd: 'txt'
        *   , type: 'REG'
        *   , device: '14,1'
        *   , 'size/off': '205565952'
        *   , node: '15630602'
        *   , name: '/private/var/db/dyld/dyld_shared_cache_x86_64'
        *   }
        * , { command: 'node'
        *   , pid: '24231'
        *   , user: 'davglass'
        *   , fd: '0u'
        *   , type: 'CHR'
        *   , device: '16,2'
        *   , 'size/off': '0t183952'
        *   , node: '1355'
        *   , name: '/dev/ttys002'
        *   }
        * ]
        */
    });
    
    // Or, inspect a port in use
    lsof.rawTcpPort(11211, function(data) {
        console.log(data);
        /*
         * [ { state: 'listen',
         *     command: 'memcached',
         *     pid: '183',
         *     user: 'matt',
         *     fd: '28u',
         *     type: 'IPv6',
         *     device: '0xffffff80121a3600',
         *     'size/off': '0t0',
         *     node: 'TCP',
         *     name: 'localhost:11211' },
         *   { state: 'listen',
         *     command: 'memcached',
         *     pid: '183',
         *     user: 'matt',
         *     fd: '29u',
         *     type: 'IPv4',
         *     device: '0xffffff8013f90500',
         *     'size/off': '0t0',
         *     node: 'TCP',
         *    name: 'localhost:11211' } ]
         *
         */
    }


    
