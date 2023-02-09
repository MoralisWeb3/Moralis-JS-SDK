/**
 * Copied (and remove obsolete functionalities) from https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/typescript/sdk/src/hex_string.test.ts because
 * - We only care about address validation and conversion, this is a dependency for AccountAddress
 * - Resolving this dependency in UMD gives dependency errors
 */

import { HexString } from './HexString';

const withoutPrefix = '007711b4d0';
const withPrefix = `0x${withoutPrefix}`;

function validate(hexString: HexString) {
  expect(hexString.hex()).toBe(withPrefix);
  expect(hexString.toString()).toBe(withPrefix);
  expect(`${hexString}`).toBe(withPrefix);
  expect(hexString.noPrefix()).toBe(withoutPrefix);
}

test('from/to Uint8Array', () => {
  const hs = new HexString(withoutPrefix);
  expect(HexString.fromUint8Array(hs.toUint8Array()).hex()).toBe(withPrefix);
});

test('accepts input without prefix', () => {
  const hs = new HexString(withoutPrefix);
  validate(hs);
});

test('accepts input with prefix', () => {
  const hs = new HexString(withPrefix);
  validate(hs);
});

test('ensures input when string', () => {
  const hs = HexString.ensure(withoutPrefix);
  validate(hs);
});

test('ensures input when HexString', () => {
  const hs1 = new HexString(withPrefix);
  const hs = HexString.ensure(hs1);
  validate(hs);
});

test('short address form correct', () => {
  const hs1 = new HexString(withoutPrefix);
  expect(hs1.toShortString()).toBe('0x7711b4d0');
  const hs2 = new HexString('0x2185b82cef9bc46249ff2dbc56c265f6a0e3bdb7b9498cc45e4f6e429530fdc0');
  expect(hs2.toShortString()).toBe('0x2185b82cef9bc46249ff2dbc56c265f6a0e3bdb7b9498cc45e4f6e429530fdc0');
});
