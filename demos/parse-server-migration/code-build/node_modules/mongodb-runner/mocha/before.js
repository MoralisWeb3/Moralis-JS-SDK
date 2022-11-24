/* eslint camelcase:0 */
var runner = require('../');
var defaults = require('lodash.defaults');
var running = require('is-mongodb-running');
var debug = require('debug')('mongodb-runner:mocha:before');

/**
 * Start MongoDB on demand before running your tests.
 *
 * @example
 *   describe('my app', function(){
 *     before(require('mongodb-runner/mocha/before');
 *     it('should connect', function(done){
 *       require('mongodb').connect('mongodb://localhost:27017/', done);
 *     });
 *   });
 * @param {Object|Function} [opts] - options or the `done` callback.
 * @return {Function} - Callback for mocha bdd `before` hook.
 */
function mongodb_runner_mocha_before(opts) {
  if (typeof opts === 'function') {
    // So you can just do `before(require('mongodb-runner/mocha/before'));`
    return mongodb_runner_mocha_before({}).apply(this, arguments);
  }
  opts = opts || {};
  defaults(opts, {
    port: 27017,
    timeout: 10000,
    slow: 10000
  });

  return function(done) {
    this.timeout(opts.timeout);
    this.slow(opts.slow);

    debug('checking if mongodb is running...');
    running(function(err, res) {
      if (err) {
        debug('mongodb detection failed so going to try and start one');
        runner({
          port: opts.port,
          action: 'start'
        }, done);
        return;
      }
      if (res && res.length > 0) {
        if (res[0].port === opts.port) {
          process.env.MONGODB_RUNNER_MOCHA_SKIP_STOP = '1';

          debug('mongodb already running on `localhost:%s` '
            + 'so we won\'t start a new one', opts.port);
          done();
          return;
        }

        debug('mongodb already running, but its on '
          + '`localhost:%d` and we need `localhost:%s` for '
          + 'the tests so starting up a new one.', res[0].port, opts.port);
        runner({
          action: 'start',
          port: opts.port
        }, done);
        return;
      }
      debug('no mongodb running so starting one up');
      runner({
        action: 'start',
        port: opts.port
      }, done);
      return;
    });
  };
}

module.exports = mongodb_runner_mocha_before;
