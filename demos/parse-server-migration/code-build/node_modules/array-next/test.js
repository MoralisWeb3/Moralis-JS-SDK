var assert = require('assert');
var next = require('./array-next');


var arr = ['a', 'b', 'c'];

// if none specified next should return first
assert.equal(next(arr), 'a');

// next item in array
assert.equal(next(arr, 'a'), 'b');

// next item + loop
assert.equal(next(arr, 'c'), 'a');

console.log('passed');
