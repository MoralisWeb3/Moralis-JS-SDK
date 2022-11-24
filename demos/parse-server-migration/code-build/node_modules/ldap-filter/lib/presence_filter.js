// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2015 Patrick Mooney

var util = require('util');
var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function PresenceFilter(options) {
  assert.optionalObject(options);
  options = options || {};
  assert.optionalString(options.attribute);

  this.attribute = options.attribute;
}
util.inherits(PresenceFilter, helpers.Filter);
Object.defineProperties(PresenceFilter.prototype, {
  type: {
    get: function getType() { return 'present'; },
    configurable: false
  },
  json: {
    get: function getJson() {
      return {
        type: 'PresenceMatch',
        attribute: this.attribute
      };
    },
    configurable: false
  }
});

PresenceFilter.prototype.toString = function toString() {
  return '(' + helpers.escape(this.attribute) + '=*)';
};

PresenceFilter.prototype.matches = function matches(target, strictAttrCase) {
  assert.object(target, 'target');

  var value = helpers.getAttrValue(target, this.attribute, strictAttrCase);

  return (value !== undefined && value !== null);
};


///--- Exports

module.exports = PresenceFilter;
