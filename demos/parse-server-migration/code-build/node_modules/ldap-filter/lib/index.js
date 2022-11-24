// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.
// Copyright 2016 Joyent, Inc.

var assert = require('assert-plus');

var helpers = require('./helpers.js');

var AndFilter = require('./and_filter');
var ApproximateFilter = require('./approx_filter');
var EqualityFilter = require('./equality_filter');
var ExtensibleFilter = require('./ext_filter');
var GreaterThanEqualsFilter = require('./ge_filter');
var LessThanEqualsFilter = require('./le_filter');
var NotFilter = require('./not_filter');
var OrFilter = require('./or_filter');
var PresenceFilter = require('./presence_filter');
var SubstringFilter = require('./substr_filter');


///--- Globals

/* JSSTYLED */
var attrRegex = /^[-_a-zA-Z0-9]+/;
var hexRegex = /^[a-fA-F0-9]{2}$/;


///--- Internal

function escapeValue(str)
{
  var cur = 0;
  var len = str.length;
  var out = '';

  while (cur < len) {
    var c = str[cur];

    switch (c) {
    case '(':
      /*
       * Although '*' characters should be escaped too, we ignore them here in
       * case downstream ExtensibleFilter consumers wish to perform their own
       * value-add parsing after the fact.
       *
       * Handling unescaped ')' is not needed since such occurances will parse
       * as premature (and likely) unbalanced parens in the filter expression.
       */
      throw new Error('illegal unescaped char: ' + c);

    case '\\':
      /* Parse a \XX hex escape value */
      var val = str.substr(cur + 1, 2);
      if (val.match(hexRegex) === null) {
        throw new Error('invalid escaped char');
      }
      out += String.fromCharCode(parseInt(val, 16));
      cur += 3;
      break;

    default:
      /* Add one regular char */
      out += c;
      cur++;
      break;
    }
  }

  return out;
}

function escapeSubstr(str)
{
  var fields = str.split('*');
  var out = {};
  assert.ok(fields.length > 1, 'wildcard missing');

  out.initial = escapeValue(fields.shift());
  out.final = escapeValue(fields.pop());
  out.any = fields.map(escapeValue);
  return out;
}

function parseExt(attr, str)
{
  var fields = str.split(':');
  var res = {
    attribute: attr
  };
  var out;

  /* Having already parsed the attr, the first entry should be empty */
  assert.ok(fields.length > 1, 'invalid ext filter');
  fields.shift();

  if (fields[0].toLowerCase() === 'dn') {
    res.dnAttributes = true;
    fields.shift();
  }
  if (fields.length !== 0 && fields[0][0] !== '=') {
    res.rule = fields.shift();
  }
  if (fields.length === 0 || fields[0][0] !== '=') {
    /* With matchType, dnAttribute, and rule consumed, the := must be next */
    throw new Error('missing := in ext filter');
  }

  /*
   * Trim the leading = (from the :=)  and reinsert any extra ':' charachters
   * which may have been present in the value field.
   */
  str = fields.join(':').substr(1);
  res.value = escapeValue(str);
  out = new ExtensibleFilter(res);

  /*
   * Some extensible filters (such as caseIgnoreSubstringsMatch) operate with
   * values formatted with the substring syntax.  In order to prevent ambiguity
   * between '*' characters which are not escaped and any which are, we attempt
   * substring-style parsing on any value which contains the former.
   */
  if (str.indexOf('*') !== -1) {
    var subres = escapeSubstr(str);
    out.initial = subres.initial;
    out.any = subres.any;
    out.final = subres.final;
  }

  return out;
}

function parseExpr(str)
{
  var attr, match, remain;

  if (str[0] === ':') {
    /*
     * An extensible filter can have no attribute name.
     * (Only valid when using dn and * matching-rule evaluation)
     */
    attr = '';
    remain = str;
  } else if ((match = str.match(attrRegex)) !== null) {
    attr = match[0];
    remain = str.substr(attr.length);
  } else {
    throw new Error('invalid attribute name');
  }

  if (remain === '=*') {
    return new PresenceFilter({
      attribute: attr
    });
  } else if (remain[0] === '=') {
    remain = remain.substr(1);
    if (remain.indexOf('*') !== -1) {
      var val = escapeSubstr(remain);
      return new SubstringFilter({
        attribute: attr,
        initial: val.initial,
        any: val.any,
        final: val.final
      });
    } else {
      return new EqualityFilter({
        attribute: attr,
        value: escapeValue(remain)
      });
    }
  } else if (remain[0] === '>' && remain[1] === '=') {
    return new GreaterThanEqualsFilter({
      attribute: attr,
      value: escapeValue(remain.substr(2))
    });
  } else if (remain[0] === '<' && remain[1] === '=') {
    return new LessThanEqualsFilter({
      attribute: attr,
      value: escapeValue(remain.substr(2))
    });
  } else if (remain[0] === '~' && remain[1] === '=') {
    return new ApproximateFilter({
      attribute: attr,
      value: escapeValue(remain.substr(2))
    });
  } else if (remain[0] === ':') {
    return parseExt(attr, remain);
  }
  throw new Error('invalid expression');
}

function parseFilter(str, start)
{
  var cur = start;
  var len = str.length;
  var res, end, output, children = [];

  if (str[cur++] !== '(') {
      throw new Error('missing paren');
  }

  if (str[cur] === '&') {
    cur++;
    do {
      res = parseFilter(str, cur);
      children.push(res.filter);
      cur = res.end + 1;
    } while (cur < len && str[cur] !== ')');

    output = new AndFilter({filters: children});
  } else if (str[cur] === '|') {
    cur++;
    do {
      res = parseFilter(str, cur);
      children.push(res.filter);
      cur = res.end + 1;
    } while (cur < len && str[cur] !== ')');

    output = new OrFilter({filters: children});
  } else if (str[cur] === '!') {
    res = parseFilter(str, cur + 1);
    output = new NotFilter({filter: res.filter});
    cur = res.end + 1;
    assert.equal(str[cur], ')', 'unbalanced parens');
  } else {
    end = str.indexOf(')', cur);
    assert.notEqual(end, -1, 'unbalanced parens');

    output = parseExpr(str.substr(cur, end - cur));
    cur = end;
  }
  if (cur >= len) {
    throw new Error('unbalanced parens');
  }
  return {
    end: cur,
    filter: output
  };
}


///--- Exports

module.exports = {
  parse: function (str) {
    assert.string(str, 'input must be string');
    assert.ok(str.length > 0, 'input string cannot be empty');

    /* Wrap the input in parens if it was not already */
    if (str.charAt(0) !== '(') {
      str = '(' + str + ')';
    }
    var parsed = parseFilter(str, 0);

    var lastIdx = str.length - 1;
    if (parsed.end < lastIdx) {
      throw new Error('unbalanced parens');
    }

    return parsed.filter;
  },

  // Helper utilties for writing custom matchers
  testValues: helpers.testValues,
  getAttrValue: helpers.getAttrValue,

  // Filter definitions
  AndFilter: AndFilter,
  ApproximateFilter: ApproximateFilter,
  EqualityFilter: EqualityFilter,
  ExtensibleFilter: ExtensibleFilter,
  GreaterThanEqualsFilter: GreaterThanEqualsFilter,
  LessThanEqualsFilter: LessThanEqualsFilter,
  NotFilter: NotFilter,
  OrFilter: OrFilter,
  PresenceFilter: PresenceFilter,
  SubstringFilter: SubstringFilter
};
