var PS = require('../index');
var CP = require('child_process');
var assert = require('assert');
var Path = require('path');
var Sinon = require('sinon');

var serverPath = Path.resolve(__dirname, './node_process_for_test.js');
var UpperCaseArg = '--UPPER_CASE';
var child = null;
var pid = null;

function startProcess() {
  child = CP.fork(serverPath, [UpperCaseArg]);
  pid = child.pid;
}

function killProcess() {
  if (process.kill(pid, 0)) {
    process.kill(pid);
  }
}

var processKill = process.kill;

function mockKill() {
  process.kill = function() {};
}

function restoreKill() {
  process.kill = processKill;
}

describe('test', function () {
  before(function (done) {
    PS.lookup({arguments: 'node_process_for_test'}, function (err, list) {
      var processLen = list.length;
      var killedCount = 0;
      if (processLen) {
        list.forEach(function (item) {
          PS.kill(item.pid, function () {
            killedCount++;
            if (killedCount === processLen) {
              done();
            }
          });
        });
      } else {
        done();
      }
    });
  });

  beforeEach(startProcess);

  describe('#lookup()', function () {

    afterEach(killProcess);

    it('by id', function (done) {
      PS.lookup({pid: pid}, function (err, list) {
        assert.equal(list.length, 1);
        assert.equal(list[0].arguments[0], serverPath);

        done();
      });
    });

    it('by command & arguments', function (done) {
      PS.lookup({command: '.*(node|iojs).*', arguments: 'node_process_for_test'}, function (err, list) {
        assert.equal(list.length, 1);
        assert.equal(list[0].pid, pid);
        assert.equal(list[0].arguments[0], serverPath);
        done();
      });
    });

    it('by arguments, the matching should be case insensitive ', function (done) {
      PS.lookup({arguments: 'UPPER_CASE'}, function (err, list) {
        assert.equal(list.length, 1);
        assert.equal(list[0].pid, pid);
        assert.equal(list[0].arguments[0], serverPath);

        PS.lookup({arguments: 'upper_case'}, function (err, list) {
          assert.equal(list.length, 1);
          assert.equal(list[0].pid, pid);
          assert.equal(list[0].arguments[0], serverPath);
          done();
        });
      });
    });

    it('empty result list should be safe ', function (done) {
      PS.lookup({command: 'NOT_EXIST', psargs: 'l'}, function (err, list) {
        assert.equal(list.length, 0);
        done();
      });
    });

    it('should work correctly with options `aux`', function (done) {
      PS.lookup({command: 'node', psargs: 'aux'}, function (err, list) {
        assert.equal(list.length > 0, true);
        list.forEach(function (row) {
          assert.equal(/^\d+$/.test(row.pid), true);
        });
        done();
      });
    });
  });

  describe('#kill()', function () {

    it('kill', function (done) {
      PS.lookup({pid: pid}, function (err, list) {
        assert.equal(list.length, 1);
        PS.kill(pid, function (err) {
          assert.equal(err, null);
          PS.lookup({pid: pid}, function (err, list) {
            assert.equal(list.length, 0);
            done();
          });
        });
      });
    });

    it('should not throw an exception if the callback is undefined', function (done) {
      assert.doesNotThrow(function () {
        PS.kill(pid);
        PS.kill(pid, function() {
          done();
        });
      });
    });

    it('should force kill when opts.signal is SIGKILL', function (done) {
      PS.lookup({pid: pid}, function (err, list) {
        assert.equal(list.length, 1);
        PS.kill(pid, {signal: 'SIGKILL'}, function (err) {
          assert.equal(err, null);
          PS.lookup({pid: pid}, function (err, list) {
            assert.equal(list.length, 0);
            done();
          });
        });
      });
    });

    it('should throw error when opts.signal is invalid', function (done) {
      PS.lookup({pid: pid}, function (err, list) {
        assert.equal(list.length, 1);
        PS.kill(pid, {signal: 'INVALID'}, function (err) {
          assert.notEqual(err, null);
          PS.kill(pid, function(){
            done();
          });
        });
      });
    });
  });

  describe('#kill() timeout: ', function () {
    it('it should timeout after 30secs by default if the killing is not successful', function(done) {
      mockKill();
      var clock = Sinon.useFakeTimers();
      var killStartDate = Date.now();
      PS.lookup({pid: pid}, function (err, list) {
        assert.equal(list.length, 1);
        PS.kill(pid, function (err) {
          assert.equal(Date.now() - killStartDate >= 30 * 1000, true);
          assert.equal(err.message.indexOf('timeout') >= 0, true);
          restoreKill();
          PS.kill(pid, function(){
            clock.restore();
            done();
          });
        });
        clock.tick(30 * 1000);
      });
    });

    it('it should be able to set option to set the timeout', function(done) {
      mockKill();
      var clock = Sinon.useFakeTimers();
      var killStartDate = Date.now();
      PS.lookup({pid: pid}, function (err, list) {
        assert.equal(list.length, 1);
        PS.kill(pid, { timeout: 5 }, function (err) {
          assert.equal(Date.now() - killStartDate >= 5 * 1000, true);
          assert.equal(err.message.indexOf('timeout') >= 0, true);
          restoreKill();
          PS.kill(pid, function(){
            clock.restore();
            done();
          });
        });
        clock.tick(5 * 1000);
      });
    });
  });
});
