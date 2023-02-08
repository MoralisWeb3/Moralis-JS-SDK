/**
 * Copied (and remove obsolete functionalities) from https://github.com/solana-labs/solana-web3.js/blob/master/test/publickey.test.ts because
 * - We only care about address validation and conversion
 * - Resolving this dependency in UMD gives dependency errors
 */

import { PublicKey } from './PublicKey';

describe('PublicKey', function () {
  test('invalid', () => {
    expect(() => {
      new PublicKey([
        3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
    }).toThrow();

    expect(() => {
      new PublicKey('0x300000000000000000000000000000000000000000000000000000000000000000000');
    }).toThrow();

    expect(() => {
      new PublicKey('0x300000000000000000000000000000000000000000000000000000000000000');
    }).toThrow();

    expect(() => {
      new PublicKey('135693854574979916511997248057056142015550763280047535983739356259273198796800000');
    }).toThrow();

    expect(() => {
      new PublicKey('12345');
    }).toThrow();
  });

  test('toBase58', () => {
    const key = new PublicKey('CiDwVBFgWV9E5MvXWoLgnEgn2hK7rJikbvfWavzAQz3');
    expect(key.toBase58()).toEqual('CiDwVBFgWV9E5MvXWoLgnEgn2hK7rJikbvfWavzAQz3');
    expect(key.toString()).toEqual('CiDwVBFgWV9E5MvXWoLgnEgn2hK7rJikbvfWavzAQz3');

    const key2 = new PublicKey('1111111111111111111111111111BukQL');
    expect(key2.toBase58()).toEqual('1111111111111111111111111111BukQL');
    expect(key2.toString()).toEqual('1111111111111111111111111111BukQL');

    const key3 = new PublicKey('11111111111111111111111111111111');
    expect(key3.toBase58()).toEqual('11111111111111111111111111111111');

    const key4 = new PublicKey([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    expect(key4.toBase58()).toEqual('11111111111111111111111111111111');
  });

  test('toBuffer', () => {
    const key = new PublicKey('CiDwVBFgWV9E5MvXWoLgnEgn2hK7rJikbvfWavzAQz3');
    expect(key.toBuffer()).toHaveLength(32);
    expect(key.toBase58()).toEqual('CiDwVBFgWV9E5MvXWoLgnEgn2hK7rJikbvfWavzAQz3');

    const key2 = new PublicKey('11111111111111111111111111111111');
    expect(key2.toBuffer()).toHaveLength(32);
    expect(key2.toBase58()).toEqual('11111111111111111111111111111111');

    const key3 = new PublicKey(0);
    expect(key3.toBuffer()).toHaveLength(32);
    expect(key3.toBase58()).toEqual('11111111111111111111111111111111');
  });
});
