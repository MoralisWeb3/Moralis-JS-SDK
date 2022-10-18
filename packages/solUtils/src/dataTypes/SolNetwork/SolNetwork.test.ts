import { SolNetwork } from './SolNetwork';

describe('SolNetwork', () => {
  it('creates an instance', () => {
    const network = SolNetwork.create('mainnet');

    expect(network.network).toEqual('mainnet');
    expect(network.toJSON()).toEqual('mainnet');
    expect(network.toString()).toEqual('mainnet');
    expect(network.format()).toEqual('mainnet');
  });

  it('creates an instance based on MAINNET enum', () => {
    const network = SolNetwork.MAINNET;

    expect(network.network).toEqual('mainnet');
    expect(network.toJSON()).toEqual('mainnet');
    expect(network.toString()).toEqual('mainnet');
    expect(network.format()).toEqual('mainnet');
  });

  it('creates an instance based on DEVNET enum', () => {
    const network = SolNetwork.DEVNET;

    expect(network.network).toEqual('devnet');
    expect(network.toJSON()).toEqual('devnet');
    expect(network.toString()).toEqual('devnet');
    expect(network.format()).toEqual('devnet');
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
    const mainet3 = 'mainnet';
    const devnet1 = SolNetwork.create('devnet');
    const devnet2 = 'devnet';

    expect(mainet1.equals(mainet2)).toBe(true);
    expect(mainet2.equals(mainet1)).toBe(true);
    expect(mainet1.equals(mainet3)).toBe(true);
    expect(devnet1.equals(mainet1)).toBe(false);
    expect(mainet1.equals(devnet1)).toBe(false);
    expect(mainet1.equals(devnet2)).toBe(false);
  });
});
