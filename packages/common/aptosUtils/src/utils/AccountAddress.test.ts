/**
 * Copied (and remove obsolete functionalities) from https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/typescript/sdk/src/aptos_types/account_address.test.ts because
 * - We only care about address validation and conversion
 * - Resolving this dependency in UMD gives dependency errors
 */

import { AccountAddress } from './AccountAddress';

const ADDRESS_LONG = '000000000000000000000000000000000000000000000000000000000a550c18';
const ADDRESS_SHORT = 'a550c18';

describe('AccountAddress', () => {
  it('gets created from full hex string', async () => {
    const addr = AccountAddress.fromHex(ADDRESS_LONG);
    expect(Buffer.from(addr.address).toString('hex')).toBe(ADDRESS_LONG);
  });

  it('gets created from short hex string', async () => {
    const addr = AccountAddress.fromHex(ADDRESS_SHORT);
    expect(Buffer.from(addr.address).toString('hex')).toBe(ADDRESS_LONG);
  });

  it('gets created from prefixed full hex string', async () => {
    const addr = AccountAddress.fromHex(`0x${ADDRESS_LONG}`);
    expect(Buffer.from(addr.address).toString('hex')).toBe(ADDRESS_LONG);
  });

  it('gets created from prefixed short hex string', async () => {
    const addr = AccountAddress.fromHex(`0x${ADDRESS_SHORT}`);
    expect(Buffer.from(addr.address).toString('hex')).toBe(ADDRESS_LONG);
  });

  it('gets created from prefixed short hex string with leading 0s', async () => {
    const addr = AccountAddress.fromHex(`0x000${ADDRESS_SHORT}`);
    expect(Buffer.from(addr.address).toString('hex')).toBe(ADDRESS_LONG);
  });

  it('throws exception when initiating from a long hex string', async () => {
    expect(() => {
      AccountAddress.fromHex(`1${ADDRESS_LONG}`);
      // eslint-disable-next-line quotes
    }).toThrow("Hex string is too long. Address's length is 32 bytes.");
  });

  it('throws exception when initiating from a long hex string', async () => {
    expect(() => {
      AccountAddress.fromHex(`1${ADDRESS_LONG}`);
      // eslint-disable-next-line quotes
    }).toThrow("Hex string is too long. Address's length is 32 bytes.");
  });

  it('isValid short with 0x', async () => {
    expect(AccountAddress.isValid(`0x${ADDRESS_SHORT}`)).toBe(true);
  });

  it('isValid short with leading 0s 0x', async () => {
    expect(AccountAddress.isValid(`0x000${ADDRESS_SHORT}`)).toBe(true);
  });

  it('isValid short with leading 0s 0x', async () => {
    expect(AccountAddress.isValid(`0x000${ADDRESS_SHORT}`)).toBe(true);
  });

  it('isValid long with leading 0s without 0x', async () => {
    expect(AccountAddress.isValid(`${ADDRESS_LONG}`)).toBe(true);
  });

  it('isValid long with leading 0s with 0x', async () => {
    expect(AccountAddress.isValid(`0x${ADDRESS_LONG}`)).toBe(true);
  });

  it('not isValid empty string', async () => {
    expect(AccountAddress.isValid('')).toBe(false);
  });

  it('not isValid too long without 0x', async () => {
    expect(AccountAddress.isValid(`00${ADDRESS_LONG}`)).toBe(false);
  });

  it('not isValid too long with 0x', async () => {
    expect(AccountAddress.isValid(`0x00${ADDRESS_LONG}`)).toBe(false);
  });
});
