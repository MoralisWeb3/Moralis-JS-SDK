var vows = require('vows'),
    assert = require('assert'),
    lsof = require('../lib/lsof.js');

// Create a Test Suite
vows.describe('lsof - raw').addBatch({
	'raw': {
		topic: function() {
            lsof.raw(this.callback);
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
		}
    }
}).export(module, { error: false });
