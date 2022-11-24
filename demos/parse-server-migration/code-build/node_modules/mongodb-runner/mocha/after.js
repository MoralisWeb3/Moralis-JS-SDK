/* eslint camelcase:0 */
var runner = require('../');
var defaults = require('lodash.defaults');
var debug = require('debug')('mongodb-runner:mocha:after');

/**
* Stop MongoDB on demand after running your tests.
*
* @example
*   describe('my app', function(){
*     before(require('mongodb-runner/mocha/before'));
*     after(require('mongodb-runner/mocha/after'));
*     it('should connect', function(done){
*       require('mongodb').connect('mongodb://localhost:27017/', done);
*     });
*   });
* @param {Object|Function} [opts] - options or the `done` callback.
* @return {Function} - Callback for mocha bdd `after` hook.
 */
function mongodb_runner_mocha_after(opts) {
  if (typeof opts === 'function') {
    // So you can just do `after(require('mongodb-runner/mocha/after'));`
    return mongodb_runner_mocha_after({}).apply(this, arguments);
  }
  opts = opts || {};
  defaults(opts, {
    port: 27017
  });

  return function(done) {
    if (process.env.MONGODB_RUNNER_MOCHA_SKIP_STOP) {
      debug('not stopping mongodb as it was not started by mocha/before');
      delete process.env.MONGODB_RUNNER_MOCHA_SKIP_STOP;
      done();
      return;
    }
    debug('stopping mongodb...');
    runner({
      port: opts.port,
      action: 'stop'
    }, done);
  };
}

module.exports = mongodb_runner_mocha_after;
