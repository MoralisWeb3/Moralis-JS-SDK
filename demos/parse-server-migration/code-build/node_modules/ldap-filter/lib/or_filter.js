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

function OrFilter(options) {
  assert.optionalObject(options);
  options = options || {};
  assert.optionalArrayOfObject(options.filters);

  this.filters = options.filters ? options.filters.slice() : [];
}
util.inherits(OrFilter, helpers.Filter);
Object.defineProperties(OrFilter.prototype, {
  type: {
    get: function getType() { return 'or'; },
    configurable: false
  },
  json: {
    get: function getJson() {
      return {
        type: 'Or',
        filters: this.filters.map(toJSON)
      };
    },
    configurable: false
  }
});

OrFilter.prototype.toString = function toString() {
  var str = '(|';
  this.filters.forEach(function (f) {
    str += f.toString();
  });
  str += ')';

  return str;
};

OrFilter.prototype.matches = function matches(target, strictAttrCase) {
  assert.object(target, 'target');

  for (var i = 0; i < this.filters.length; i++) {
    if (this.filters[i].matches(target, strictAttrCase))
      return true;
  }

  return false;
};

OrFilter.prototype.addFilter = function addFilter(filter) {
  assert.object(filter, 'filter');

  this.filters.push(filter);
};


///--- Exports

module.exports = OrFilter;
