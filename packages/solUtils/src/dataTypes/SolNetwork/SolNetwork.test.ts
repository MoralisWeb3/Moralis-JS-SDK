import { SolNetwork } from './SolNetwork';

describe('SolNetwork', () => {
  it('creates an instance', () => {
    const network = SolNetwork.create('mainnet');

    expect(network.network).toEqual('mainnet');
    expect(network.toJSON()).toEqual('mainnet');
    expect(network.toString()).toEqual('mainnet');
    expect(network.format()).toEqual('mainnet');
  });

  it('throws an error when a network is not supported', () => {
    expect(() => SolNetwork.create('UNKNOWN')).toThrowError('Solana network is not supported');
  });

  it('create() does not create a new instance when SolAddress passed', () => {
    const network1 = SolNetwork.create('mainnet');
    const network2 = SolNetwork.create(network1);

    expect(network1 === network2).toBe(true);
  });

  it('equals() returns proper value', () => {
    const mainet1 = SolNetwork.create('mainnet');
    const mainet2 = SolNetwork.create('mainnet');
    const devnet = SolNetwork.create('devnet');

    expect(mainet1.equals(mainet2)).toBe(true);
    expect(mainet2.equals(mainet1)).toBe(true);
    expect(devnet.equals(mainet1)).toBe(false);
    expect(mainet1.equals(devnet)).toBe(false);
  });
});
