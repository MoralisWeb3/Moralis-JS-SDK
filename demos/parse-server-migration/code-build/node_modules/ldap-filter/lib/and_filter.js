// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2015 Patrick Mooney
// Copyright 2016 Joyent, Inc.

var util = require('util');
var assert = require('assert-plus');

var helpers = require('./helpers');

///--- Internal

function toJSON(filter) {
  return filter.json;
}

///--- API

function AndFilter(options) {
  assert.optionalObject(options);
  options = options || {};
  assert.optionalArrayOfObject(options.filters, 'options.filters');

  this.filters = options.filters ? options.filters.slice() : [];
}
util.inherits(AndFilter, helpers.Filter);
Object.defineProperties(AndFilter.prototype, {
  type: {
    get: function getType() { return 'and'; },
    configurable: false
  },
  json: {
    get: function getJson() {
      return {
        type: 'And',
        filters: this.filters.map(toJSON)
      };
    },
    configurable: false
  }
});

AndFilter.prototype.toString = function toString() {
  var str = '(&';
  this.filters.forEach(function (f) {
    str += f.toString();
  });
  str += ')';

  return str;
};

AndFilter.prototype.matches = function matches(target, strictAttrCase) {
  assert.object(target, 'target');

  if (this.filters.length === 0) {
    /* true per RFC4526 */
    return true;
  }

  for (var i = 0; i < this.filters.length; i++) {
    if (!this.filters[i].matches(target, strictAttrCase))
      return false;
  }

  return true;
};

AndFilter.prototype.addFilter = function addFilter(filter) {
  assert.object(filter, 'filter');

  this.filters.push(filter);
};


///--- Exports

module.exports = AndFilter;
