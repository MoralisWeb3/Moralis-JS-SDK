import { Core } from '@moralisweb3/common-core';
import { EvmAddress } from './EvmAddress';
import { setupEvmUtils } from '../../test/setup';

const TEST_ADDRESS_CHECKSUM = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const TEST_ADDRESS_CHECKSUM2 = '0x766fd99F7D249E275b4CF9baE422D50cC3223869';
const TEST_ADDRESS_LOWERCASE = TEST_ADDRESS_CHECKSUM.toLowerCase();
const TEST_INVALID_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96000';

describe('EvmAddress', () => {
  let core: Core;

  beforeAll(() => {
    core = setupEvmUtils();
  });

  beforeEach(() => {
    core.config.reset();
  });

  /**
   * Creation
   */
  it('should create a new EvmAddress based on a lowercased address', () => {
    const address = EvmAddress.create(TEST_ADDRESS_LOWERCASE);

    expect(address.format()).toBe(TEST_ADDRESS_LOWERCASE);
  });

  it('should create a new EvmAddress based on a checksum address', () => {
    const address = EvmAddress.create(TEST_ADDRESS_CHECKSUM);

    expect(address.format()).toBe(TEST_ADDRESS_LOWERCASE);
  });

  it('should throw an error when creating with an invalid address', () => {
    expect(() => EvmAddress.create(TEST_INVALID_ADDRESS)).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid address provided"`,
    );
  });

  it('should return the same EvmAddress on calling create with an EvmAddress', () => {
    const addressA = EvmAddress.create(TEST_ADDRESS_CHECKSUM);
    const addressB = EvmAddress.create(addressA);

    expect(addressA).toBe(addressB);
  });

  /**
   * Formatting
   */
  it('should return formatting in lowercase when specified', () => {
    const address = EvmAddress.create(TEST_ADDRESS_CHECKSUM);

    const value = address.format('lowercase');

    expect(value).toBe(TEST_ADDRESS_LOWERCASE);
  });

  it('should return formatting in checksum when specified', () => {
    const address = EvmAddress.create(TEST_ADDRESS_LOWERCASE);

    const value = address.format('checksum');

    expect(value).toBe(TEST_ADDRESS_CHECKSUM);
  });

  it('should format in lowercase by default', () => {
    const address = EvmAddress.create(TEST_ADDRESS_CHECKSUM);

    const value = address.format();

    expect(value).toBe(TEST_ADDRESS_LOWERCASE);
  });

  it('should format in checksum by default if specified in the config', () => {
    core.config.set('formatEvmAddress', 'checksum');
    const address = EvmAddress.create(TEST_ADDRESS_LOWERCASE);
    const value = address.format();

    expect(value).toBe(TEST_ADDRESS_CHECKSUM);
  });

  it('should throw an error when trying to format in an unknown way', () => {
    // Should not happen when using correct typescript / correct types
    const address = EvmAddress.create(TEST_ADDRESS_LOWERCASE);

    //@ts-ignore
    expect(() => address.format('')).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Cannot format address, invalid config.formatAddress"`,
    );
  });

  /**
   * Methods
   */
  it('should check equality of 2 addresses of the same value', () => {
    const addressA = EvmAddress.create(TEST_ADDRESS_LOWERCASE);
    const addressB = EvmAddress.create(TEST_ADDRESS_CHECKSUM);

    expect(addressA.equals(addressB)).toBeTruthy();
  });

  it('should check equality of 2 addresses of the same value via a static method', () => {
    const addressA = EvmAddress.create(TEST_ADDRESS_LOWERCASE);
    const addressB = EvmAddress.create(TEST_ADDRESS_CHECKSUM);

    expect(EvmAddress.equals(addressA, addressB)).toBeTruthy();
  });

  it('should check inequality of 2 addresses of different value', () => {
    const addressA = EvmAddress.create(TEST_ADDRESS_LOWERCASE);
    const addressB = EvmAddress.create(TEST_ADDRESS_CHECKSUM2);

    expect(addressA.equals(addressB)).toBeFalsy();
  });
});
