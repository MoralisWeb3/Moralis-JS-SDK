# ps [![Build Status](https://travis-ci.org/neekey/ps.svg?branch=master)](https://travis-ci.org/neekey/ps) [![Build status](https://ci.appveyor.com/api/projects/status/fhom8ot12b6jxeyt?svg=true)](https://ci.appveyor.com/project/neekey/ps)

A Node.js module for looking up running processes. This module uses [Table-Parser](https://github.com/neekey/table-parser) to parse the output.

Before using this module, you should take look at section [Existing Bugs You Should Know](https://github.com/neekey/ps#user-content-existing-bugs-you-should-know) at the bottom of this doc.

## Install

```bash
$ npm install ps-node
```

## How Does It Work

This module uses different tools to get process list:

- Linux / Mac: use `ps` command. Since the default result from shell command `$ ps` will not contain "command arguments" in linux like "ubuntu", ps-node add arguments `lx` as default. Which means, the default value for option `psargs` is `lx`.
- Win: use command `wmic process get ProcessId,CommandLine` through "cmd", more info about wmic is [here](https://social.technet.microsoft.com/Forums/windowsserver/en-US/ab6c7e6e-4ad4-4237-bab3-0349cd76c094/wmic-command-line-utilities?forum=winservercore). Anyway, there is also another tool name [tasklist](https://technet.microsoft.com/en-us/library/bb491010.aspx) in windows, which can also list all the running processes, but lack of command arguments infomation. But compared to wmic, I think this tool should have a higher performance. You should take a look at the wrapper for this tool [tasklist](https://github.com/sindresorhus/tasklist) by @sindresorhs if you are interested.

## Compatibility

- Should work great in most *nix system.
- Should work on Win10/7 more system versions need to be test.  

Any compatibility issue is welcomed.

## Usage

Lookup process with specified `pid`:

```javascript
var ps = require('ps-node');

// A simple pid lookup
ps.lookup({ pid: 12345 }, function(err, resultList ) {
    if (err) {
        throw new Error( err );
    }

    var process = resultList[ 0 ];

    if( process ){

        console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
    }
    else {
        console.log( 'No such process found!' );
    }
});

```

Or use RegExp to filter `command` and `arguments`:

```javascript
var ps = require('ps-node');

// A simple pid lookup
ps.lookup({
    command: 'node',
    arguments: '--debug',
    }, function(err, resultList ) {
    if (err) {
        throw new Error( err );
    }

    resultList.forEach(function( process ){
        if( process ){

            console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
        }
    });
});

```

Also, you can use `kill` to kill process by `pid`:

```javascript
var ps = require('ps-node');

// A simple pid lookup
ps.kill( '12345', function( err ) {
    if (err) {
        throw new Error( err );
    }
    else {
        console.log( 'Process %s has been killed!', pid );
    }
});
```

Method `kill` also supports a `signal` option to be passed. It's only a wrapper of `process.kill()` with checking of that killing is finished after the method is called.

```javascript
var ps = require('ps-node');

// Pass signal SIGKILL for killing the process without allowing it to clean up
ps.kill( '12345', 'SIGKILL', function( err ) {
    if (err) {
        throw new Error( err );
    }
    else {
        console.log( 'Process %s has been killed without a clean-up!', pid );
    }
});
```

you can use object as the second parameter to pass more options:

```js
ps.kill( '12345', { 
    signal: 'SIGKILL',
    timeout: 10,  // will set up a ten seconds timeout if the killing is not successful
}, function(){});

```

Notice that the nodejs build-in `process.kill()` does not accept number as the signal, you will have to use string format.


You can also pass arguments to `lookup` with `psargs` as arguments for `ps` command（Note that `psargs` is not available in windows):

```javascript
var ps = require('ps-node');

// A simple pid lookup
ps.lookup({
    command: 'node',
    psargs: 'ux'
    }, function(err, resultList ) {
    if (err) {
        throw new Error( err );
    }

    resultList.forEach(function( process ){
        if( process ){
            console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
        }
    });
});

```

Lastly, you can filter a list of items by their PPID by passing a PPID to filter on. You will need to pass in a `psarg` that provides the PPID in the results (`-l` or `-j` for instance).

```javascript
var ps = require('ps-node');

// A simple pid lookup
ps.lookup({
    command: 'mongod',
    psargs: '-l',
    ppid: 82292
    }, function(err, resultList ) {
    if (err) {
        throw new Error( err );
    }

    resultList.forEach(function( process ){
        if( process ){
            console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
        }
    });
});

```

## Existing Bugs You Should Know

I'm still working on these bugs at the moment, before using this module in any serious way, please take a look at them, and take your own risk.

- [multiple-bytes characters may cause parse error](https://github.com/neekey/table-parser/issues/4).
