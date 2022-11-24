// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2015 Patrick Mooney

var util = require('util');
var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function LessThanEqualsFilter(options) {
  assert.optionalObject(options);
  if (options) {
    assert.string(options.attribute, 'options.attribute');
    assert.string(options.value, 'options.attribute');
    this.attribute = options.attribute;
    this.value = options.value;
  }
}
util.inherits(LessThanEqualsFilter, helpers.Filter);
Object.defineProperties(LessThanEqualsFilter.prototype, {
  type: {
    get: function getType() { return 'le'; },
    configurable: false
  },
  json: {
    get: function getJson() {
      return {
        type: 'LessThanEqualsMatch',
        attribute: this.attribute,
        value: this.value
      };
    },
    configurable: false
  }
});

LessThanEqualsFilter.prototype.toString = function toString() {
  return ('(' + helpers.escape(this.attribute) +
          '<=' + helpers.escape(this.value) + ')');
};

LessThanEqualsFilter.prototype.matches = function (target, strictAttrCase) {
  assert.object(target, 'target');

  var tv = helpers.getAttrValue(target, this.attribute, strictAttrCase);
  var value = this.value;

  return helpers.testValues(function (v) {
    return value >= v;
  }, tv);
};


///--- Exports

module.exports = LessThanEqualsFilter;
