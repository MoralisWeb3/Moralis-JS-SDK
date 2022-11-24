var vows = require('vows'),
    assert = require('assert'),
    lsof = require('../lib/lsof.js'),
    net = require('net');

// Create a known listening socket
var testPort = 65478;
var server = net.createServer(function (socket) {
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});
server.listen(testPort, '127.0.0.1');

// Create a Test Suite
vows.describe('lsof - raw tcp').addBatch({
	'raw tcp': {
		topic: function() {
            lsof.rawTcpPort(testPort, this.callback);
		},
	    'contains key: command': function(topic) {
		    assert.isString(topic[0]['command']);
		    assert.equal('node', topic[0]['command']);
	    },
		'contains key: pid': function(topic) {
			assert.match(topic[0]['pid'], /^[0-9]+$/);
			assert.equal(process.pid, topic[0]['pid']);
		},
		'contains key: user': function(topic) {
			assert.isString(topic[0]['user']);
		},
		'contains key: fd': function(topic) {
			assert.isString(topic[0]['fd']);
		},
		'contains key: type': function(topic) {
			assert.isString(topic[0]['type']);
		},
		'contains key: device': function(topic) {
			assert.isString(topic[0]['device']);
		},
		'contains key: size/off': function(topic) {
			assert.isString(topic[0]['size/off']);
		},
		'contains key: node': function(topic) {
			assert.isString(topic[0]['node']);
		},
		'contains key: name': function(topic) {
			assert.isString(topic[0]['name']);
		},
		'contains the state for a listening socket': function(topic) {
			assert.isString(topic[0]['state']);
			assert.equal('listen', topic[0]['state']);
		}
	}
}).export(module, { error: false });
