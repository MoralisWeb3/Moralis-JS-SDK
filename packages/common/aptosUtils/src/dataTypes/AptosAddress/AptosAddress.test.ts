import { AptosAddress } from './AptosAddress';

describe('AptosAddress', () => {
  describe('equals()', () => {
    it('returns true for comparison the same address but with trimmed leading 0s', () => {
      const a = AptosAddress.create('0000357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b');
      const b = AptosAddress.create('0x0000357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b');
      const c = AptosAddress.create('0x357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b');

      expect(a.equals(b)).toBe(true);
      expect(b.equals(c)).toBe(true);
    });

    it('returns false for different addresses', () => {
      const a = AptosAddress.create('0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90');
      const b = AptosAddress.create('0x1d8727df513fa2a8785d0834e40b34223daff1affc079574082baadb74b66ee4');

      expect(a.equals(b)).toBe(false);
    });

    it('static equals() method return proper value', () => {
      expect(AptosAddress.equals('0x1', '0x1')).toBe(true);
      expect(AptosAddress.equals('0x1', '0x0000000000000000000000000000000000000000000000000000000000000001')).toBe(
        true,
      );
      expect(AptosAddress.equals('0x1', '0x2')).toBe(false);
      expect(AptosAddress.equals('0x1', '0x00002')).toBe(false);
    });
  });

  describe('normalization', () => {
    it('returns normalized address', () => {
      expect(AptosAddress.create('0x1').address).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      );
      expect(AptosAddress.create('1').address).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      );
    });

    it('util methods returns proper value', () => {
      const foo = AptosAddress.create('0x1');

      expect(foo.address).toBe('0x0000000000000000000000000000000000000000000000000000000000000001');
      expect(foo.format()).toBe('0x0000000000000000000000000000000000000000000000000000000000000001');
      expect(foo.toJSON()).toBe('0x0000000000000000000000000000000000000000000000000000000000000001');
    });
  });

  describe('shortening', () => {
    it('returns shortened address', () => {
      expect(AptosAddress.create('0x0000000000000000000000000000000000000000000000000000000000000001').short).toBe(
        '0x1',
      );
      expect(AptosAddress.create('0000357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b').short).toBe(
        '0x357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
      );
    });

    it('does not shorten address if it has a full length', () => {
      expect(AptosAddress.create('0x1d8727df513fa2a8785d0834e40b34223daff1affc079574082baadb74b66ee4').short).toBe(
        '0x1d8727df513fa2a8785d0834e40b34223daff1affc079574082baadb74b66ee4',
      );
    });
  });

  describe('errors', () => {
    it('throws an error when address is invalid', () => {
      expect(() => AptosAddress.create('invalid')).toThrowError('[C0005] Invalid address provided');
      expect(() =>
        AptosAddress.create(
          '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c',
        ),
      ).toThrowError('[C0005] Invalid address provided');
    });
  });
});
