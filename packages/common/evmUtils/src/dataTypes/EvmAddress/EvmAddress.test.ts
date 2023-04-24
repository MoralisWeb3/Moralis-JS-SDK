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

    expect(address.lowercase).toBe(TEST_ADDRESS_LOWERCASE);
  });

  it('should create a new EvmAddress based on a checksum address', () => {
    const address = EvmAddress.create(TEST_ADDRESS_CHECKSUM);

    expect(address.lowercase).toBe(TEST_ADDRESS_LOWERCASE);
  });

  it('should throw an error when creating with an invalid address', () => {
    expect(() => EvmAddress.create(TEST_INVALID_ADDRESS)).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid address provided: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96000"`,
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

    const value = address.lowercase;

    expect(value).toBe(TEST_ADDRESS_LOWERCASE);
  });

  it('should return formatting in checksum when specified', () => {
    const address = EvmAddress.create(TEST_ADDRESS_LOWERCASE);

    const value = address.checksum;

    expect(value).toBe(TEST_ADDRESS_CHECKSUM);
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
