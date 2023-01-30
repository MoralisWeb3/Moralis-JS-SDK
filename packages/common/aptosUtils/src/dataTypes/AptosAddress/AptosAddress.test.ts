import { AptosAddress } from './AptosAddress';

describe('AptosAddress', () => {
  const ADDRESS = '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b'; // account

  const validAddresses = [
    ADDRESS,
    '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c',
    '0000357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b', // no 0x
    '0x357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b', // shorter, completes leading 0s
    '0x0000357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
  ];

  const invalidAddresses = [
    'invalid',
    '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c', // super long
  ];

  for (const address of validAddresses) {
    it(`creates an instance for ${address}`, () => {
      const aptos = AptosAddress.create(address);

      expect(aptos.address).toEqual(address);
      expect(aptos.toJSON()).toEqual(address);
      expect(aptos.toString()).toEqual(address);
      expect(aptos.format()).toEqual(address);
    });
  }

  for (const address of invalidAddresses) {
    it('create() throws an error when a passed address is invalid', () => {
      expect(() => AptosAddress.create(address)).toThrowError(`[C0005] Invalid address provided: ${address}`);
    });
  }

  it('create() does not create a new instance when AptosAddress passed', () => {
    const address1 = AptosAddress.create(ADDRESS);
    const address2 = AptosAddress.create(address1);

    expect(address1 === address2).toBe(true);
  });

  it('equals() returns correct value', () => {
    const a = AptosAddress.create(ADDRESS);
    const b = AptosAddress.create(ADDRESS);
    const c = '0x0000357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b';

    expect(a.equals(b)).toBe(true);
    expect(b.equals(a)).toBe(true);
    expect(a.equals(c)).toBe(false);
    expect(b.equals(c)).toBe(false);
  });

  it('should check equality of 2 addresses of the same value via a static method', () => {
    const addressA = AptosAddress.create(ADDRESS);
    const addressB = AptosAddress.create(ADDRESS);

    expect(AptosAddress.equals(addressA, addressB)).toBeTruthy();
  });

  it('should check inequality of 2 addresses of different value', () => {
    const addressA = AptosAddress.create(ADDRESS);
    const addressB = AptosAddress.create(validAddresses[1]);

    expect(addressA.equals(addressB)).toBeFalsy();
  });
});
