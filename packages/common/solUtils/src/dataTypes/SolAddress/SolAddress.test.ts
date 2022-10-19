import { SolAddress } from './SolAddress';

describe('SolAddress', () => {
  const ADDRESS = '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp'; // account

  const addresses = [
    ADDRESS,
    'JdbMBJNENmKowddNkM7gKKkRXGbjTCVU1hYtUZquLbE', // token account (not on the curve)
    'DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHmZEYC8RTb', // account
    'TLPv2tuSVvn3fSk8RgW3yPddkp5oFivzZV3rA9hQxtX', // program
    '5JQ8Mhdp2wv3HWcfjq9Ts8kwzCAeBADFBDAgBznzRsE4', // program
    'AMM55ShdkoGRB5jVYPjWziwk8m5MpwyDgsMWHaMSQWH6', // program
    '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', // account
    '9QgXqrgdbVU8KcpfskqJpAXKzbaYQJecgMAruSWoXDkM', // stake account (not on the curve)
  ];

  for (const address of addresses) {
    it(`creates an instance for ${address}`, () => {
      const sol = SolAddress.create(address);

      expect(sol.address).toEqual(address);
      expect(sol.toJSON()).toEqual(address);
      expect(sol.toString()).toEqual(address);
      expect(sol.format()).toEqual(address);
    });
  }

  it('create() throws an error when a passed address is invalid', () => {
    expect(() => SolAddress.create('5x')).toThrowError('Invalid Solana address provided');
  });

  it('create() does not create a new instance when SolAddress passed', () => {
    const address1 = SolAddress.create(ADDRESS);
    const address2 = SolAddress.create(address1);

    expect(address1 === address2).toBe(true);
  });

  it('equals() returns correct value', () => {
    const a = SolAddress.create(ADDRESS);
    const b = SolAddress.create(ADDRESS);
    const c = '9xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp';

    expect(a.equals(b)).toBe(true);
    expect(b.equals(a)).toBe(true);
    expect(a.equals(c)).toBe(false);
    expect(b.equals(c)).toBe(false);
  });
});
