"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.fromDecimalToHex = fromDecimalToHex;
exports.fromHexToDecimal = fromHexToDecimal;

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-int"));

function fromDecimalToHex(number) {
  if (typeof number !== "number") throw "The input provided should be a number";
  return "0x".concat(number.toString(16));
}

function fromHexToDecimal(hex) {
  if (typeof hex !== "string") throw "The input provided should be a string";
  return (0, _parseInt2.default)(hex, 16);
} // module.exports = {
//   fromDecimalToHex,
//   fromHexToDecimal,
// };