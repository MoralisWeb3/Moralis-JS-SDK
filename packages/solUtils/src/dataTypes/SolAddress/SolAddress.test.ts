import { SolAddress } from './SolAddress';

describe('SolAddress', () => {
  const ADDRESS = '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp';

  it('creates an instance', () => {
    const address = SolAddress.create(ADDRESS);

    expect(address.address).toEqual(ADDRESS);
    expect(address.toJSON()).toEqual(ADDRESS);
    expect(address.toString()).toEqual(ADDRESS);
    expect(address.format()).toEqual(ADDRESS);
  });

  it('create() does not create a new instance when SolAddress passed', () => {
    const address1 = SolAddress.create(ADDRESS);
    const address2 = SolAddress.create(address1);

    expect(address1 === address2).toBe(true);
  });

  it('equals() returns correct value', () => {
    const a = SolAddress.create(ADDRESS);
    const b = SolAddress.create(ADDRESS);
    const c = SolAddress.create('9xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp');

    expect(a.equals(b)).toBe(true);
    expect(b.equals(a)).toBe(true);
    expect(c.equals(a)).toBe(false);
    expect(c.equals(b)).toBe(false);
  });
});
