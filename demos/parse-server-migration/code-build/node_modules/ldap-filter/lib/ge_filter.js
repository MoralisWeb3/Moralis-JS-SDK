// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2015 Patrick Mooney

var util = require('util');
var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function GreaterThanEqualsFilter(options) {
  assert.optionalObject(options);
  if (options) {
    assert.string(options.attribute, 'options.attribute');
    assert.string(options.value, 'options.value');
    this.attribute = options.attribute;
    this.value = options.value;
  }
}
util.inherits(GreaterThanEqualsFilter, helpers.Filter);
Object.defineProperties(GreaterThanEqualsFilter.prototype, {
  type: {
    get: function getType() { return 'ge'; },
    configurable: false
  },
  json: {
    get: function getJson() {
      return {
        type: 'GreaterThanEqualsMatch',
        attribute: this.attribute,
        value: this.value
      };
    },
    configurable: false
  }
});

GreaterThanEqualsFilter.prototype.toString = function toString() {
  return ('(' + helpers.escape(this.attribute) +
          '>=' + helpers.escape(this.value) + ')');
};

GreaterThanEqualsFilter.prototype.matches = function (target, strictAttrCase) {
  assert.object(target, 'target');

  var tv = helpers.getAttrValue(target, this.attribute, strictAttrCase);
  var value = this.value;

  return helpers.testValues(function (v) {
    return value <= v;
  }, tv);
};


///--- Exports

module.exports = GreaterThanEqualsFilter;
