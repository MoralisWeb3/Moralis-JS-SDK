// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2015 Patrick Mooney

var util = require('util');
var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function ApproximateFilter(options) {
  assert.optionalObject(options);
  if (options) {
    assert.string(options.attribute, 'options.attribute');
    assert.string(options.value, 'options.value');
    this.attribute = options.attribute;
    this.value = options.value;
  }
}
util.inherits(ApproximateFilter, helpers.Filter);
Object.defineProperties(ApproximateFilter.prototype, {
  type: {
    get: function getType() { return 'approx'; },
    configurable: false
  },
  json: {
    get: function getJson() {
      return {
        type: 'ApproximateMatch',
        attribute: this.attribute,
        value: this.value
      };
    },
    configurable: false
  }
});

ApproximateFilter.prototype.toString = function toString() {
  return ('(' + helpers.escape(this.attribute) +
          '~=' + helpers.escape(this.value) + ')');
};

ApproximateFilter.prototype.matches = function matches() {
  // Consumers must implement this themselves
  throw new Error('approx match implementation missing');
};


///--- Exports

module.exports = ApproximateFilter;
