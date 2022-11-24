// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2015 Patrick Mooney

var util = require('util');
var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function ExtensibleFilter(options) {
  assert.optionalObject(options);
  options = options || {};
  assert.optionalString(options.rule, 'options.rule');
  assert.optionalString(options.matchType, 'options.matchType');
  assert.optionalString(options.attribute, 'options.attribute');
  assert.optionalString(options.value, 'options.value');

  if (options.matchType !== undefined) {
    this.matchType = options.matchType;
  } else {
    this.matchType = options.attribute;
  }
  this.dnAttributes = options.dnAttributes || false;
  this.rule = options.rule;
  this.value = (options.value !== undefined) ? options.value : '';
}
util.inherits(ExtensibleFilter, helpers.Filter);
Object.defineProperties(ExtensibleFilter.prototype, {
  type: {
    get: function getType() { return 'ext'; },
    configurable: false
  },
  json: {
    get: function getJson() {
      return {
        type: 'ExtensibleMatch',
        matchRule: this.rule,
        matchType: this.matchType,
        matchValue: this.value,
        dnAttributes: this.dnAttributes
      };
    },
    configurable: false
  },
  matchingRule: {
    get: function getRule() { return this.rule; },
    configurable: false
  },
  matchValue: {
    get: function getValue() { return this.value; },
    configurable: false
  },
  attribute: {
    get: function getAttribute() { return this.matchType; },
    set: function setAttribute(val) { this.matchType = val; },
    configurable: false
  }
});

ExtensibleFilter.prototype.toString = function toString() {
  var str = '(';

  if (this.matchType)
    str += this.matchType;

  str += ':';

  if (this.dnAttributes)
    str += 'dn:';

  if (this.rule)
    str += this.rule + ':';

  return (str + '=' + this.value + ')');
};

ExtensibleFilter.prototype.matches = function matches() {
  // Consumers must implement this themselves
  throw new Error('ext match implementation missing');
};


///--- Exports

module.exports = ExtensibleFilter;
