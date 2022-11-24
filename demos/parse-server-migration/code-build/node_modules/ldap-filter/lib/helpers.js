// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var assert = require('assert-plus');


///--- API

/**
 * RFC 2254 Escaping of filter strings
 *
 * Raw                     Escaped
 * (o=Parens (R Us))       (o=Parens \28R Us\29)
 * (cn=star*)              (cn=star\2A)
 * (filename=C:\MyFile)    (filename=C:\5cMyFile)
 *
 * Use substr_filter to avoid having * ecsaped.
 *
 * @author [Austin King](https://github.com/ozten)
 */
function _escape(inp) {
  var esc = '';
  var i;
  if (typeof (inp) === 'string') {
    for (i = 0; i < inp.length; i++) {
      switch (inp[i]) {
        case '*':
          esc += '\\2a';
          break;
        case '(':
          esc += '\\28';
          break;
        case ')':
          esc += '\\29';
          break;
        case '\\':
          esc += '\\5c';
          break;
        case '\0':
          esc += '\\00';
          break;
        default:
          esc += inp[i];
          break;
      }
    }
    return esc;

  } else {
    assert.buffer(inp, 'input must be string or Buffer');
    for (i = 0; i < inp.length; i++) {
      if (inp[i] < 16) {
        esc += '\\0' + inp[i].toString(16);
      } else {
        esc += '\\' + inp[i].toString(16);
      }
    }
    return esc;
  }
}


/**
 * Check value or array with test function.
 *
 * @param {Function} rule test function.
 * @param value value or array of values.
 * @param {Boolean} allMatch require all array values to match. default: false
 */
function testValues(rule, value, allMatch) {
  if (Array.isArray(value)) {
    var i;
    if (allMatch) {
      // Do all entries match rule?
      for (i = 0; i < value.length; i++) {
        if (!rule(value[i])) {
          return false;
        }
      }
      return true;
    } else {
      // Do any entries match rule?
      for (i = 0; i < value.length; i++) {
        if (rule(value[i])) {
          return true;
        }
      }
      return false;
    }
  } else {
    return rule(value);
  }
}


/**
 * Fetch value for named object attribute.
 *
 * @param {Object} obj object to fetch value from
 * @param {String} attr name of attribute to fetch
 * @param {Boolean} strictCase attribute name is case-sensitive. default: false
 */
function getAttrValue(obj, attr, strictCase) {
  assert.object(obj);
  assert.string(attr);
  // Check for exact case match first
  if (obj.hasOwnProperty(attr)) {
    return obj[attr];
  } else if (strictCase) {
    return undefined;
  }

  // Perform case-insensitive enumeration after that
  var lower = attr.toLowerCase();
  var result;
  Object.getOwnPropertyNames(obj).some(function (name) {
    if (name.toLowerCase() === lower) {
      result = obj[name];
      return true;
    }
    return false;
  });
  return result;
}


/**
 * Filter base class
 */
function Filter() {
}


/**
 * Depth-first filter traversal
 */
Filter.prototype.forEach = function forEach(cb) {
  if (this.filter) {
    // not
    this.filter.forEach(cb);
  } else if (this.filters) {
    // and/or
    this.filters.forEach(function (item) {
      item.forEach(cb);
    });
  }
  cb(this);
};

/**
 * Depth-first map traversal.
 */
Filter.prototype.map = function map(cb) {
  var child;
  if (this.filter) {
    child = this.filter.map(cb);
    if (child === null) {
      // empty NOT not allowed
      return null;
    } else {
      this.filter = child;
    }
  } else if (this.filters) {
    child = this.filters.map(function (item) {
      return item.map(cb);
    }).filter(function (item) {
      return (item !== null);
    });
    if (child.length === 0) {
      // empty and/or not allowed
      return null;
    } else {
      this.filters = child;
    }
  }
  return cb(this);
};


///--- Exports

module.exports = {
  escape: _escape,
  testValues: testValues,
  getAttrValue: getAttrValue,
  Filter: Filter
};
