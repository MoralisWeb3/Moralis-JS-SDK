#!/usr/bin/env node
var debug = require('debug')('mongodb-runner:bin:mongodb-runner-worker.js');
var args = require('minimist')(process.argv.slice(2), {});
var startWorker = require('../lib/worker');

debug('Starting...');
startWorker(args, function(err, opts) {
  /* eslint no-console:0 */
  if (err) {
    console.error(
      'mongodb-runner:bin:mongodb-runner-worker.js Unexpected error. Exiting.',
      err
    );
    process.send({
      event: 'error',
      opts: opts
    });
    setTimeout(function() {
      process.exit(1);
    }, 500);
    return;
  }

  debug('MongoDB processes spawned successfully!');

  debug(
    'Remaining alive in the background to await control commands from parent process...'
  );

  function onServerStopped() {
    debug('`%s` stopped', opts.name);
    opts = null;
    debug('goodbye');

    process.exit(0);
  }

  /**
   * When this process receives a SIGTERM, this stops the server processes
   * by calling `mongodb-tools`'s stop function.
   */
  process.on('SIGTERM', function() {
    debug('stopping `%s`...', opts.name);
    opts.server.stop({ signal: 9 }, onServerStopped);
  });
});
