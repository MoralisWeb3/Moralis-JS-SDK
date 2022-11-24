var vows = require('vows'),
    assert = require('assert'),
    lsof = require('../lib/lsof.js');

// Create a Test Suite
vows.describe('lsof').addBatch({
	'counters': {
		topic: function() {
            lsof.counters(this.callback);
		},
		'contains a pid': function(topic) {
			assert.isNumber(topic['pid']);
			assert.equal(process.pid, topic['pid']);
		},
		'contains a user': function(topic) {
			assert.isString(topic['user']);
		},
		'contains an open count': function(topic) {
			assert.isNumber(topic['open']);
		},
		'contains a complete types object': function(topic) {
			assert.isNumber(topic['types']['dir']);
			assert.isNumber(topic['types']['reg']);
			assert.isNumber(topic['types']['chr']);
			//assert.isNumber(topic['types']['pipe']); //Pipes are only reported on Mac's
		}
    },
	'counters with pid': {
		topic: function() {
            lsof.counters(process.pid, this.callback);
		},
		'contains a pid': function(topic) {
			assert.isNumber(topic['pid']);
			assert.equal(process.pid, topic['pid']);
		},
		'contains a user': function(topic) {
			assert.isString(topic['user']);
		},
		'contains an open count': function(topic) {
			assert.isNumber(topic['open']);
		},
		'contains a complete types object': function(topic) {
			assert.isNumber(topic['types']['dir']);
			assert.isNumber(topic['types']['reg']);
			assert.isNumber(topic['types']['chr']);
			//assert.isNumber(topic['types']['pipe']); //Pipes are only reported on Mac's
		}
    }
}).export(module, { error: false });
