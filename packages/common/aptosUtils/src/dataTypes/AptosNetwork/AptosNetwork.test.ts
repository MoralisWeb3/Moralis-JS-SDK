import { AptosNetwork } from './AptosNetwork';

describe('AptosNetwork', () => {
  it('creates an instance', () => {
    const network = AptosNetwork.create('mainnet');

    expect(network.network).toEqual('mainnet');
    expect(network.toJSON()).toEqual('mainnet');
    expect(network.toString()).toEqual('mainnet');
    expect(network.format()).toEqual('mainnet');
  });

  it('creates an instance based on MAINNET enum', () => {
    const network = AptosNetwork.MAINNET;

    expect(network.network).toEqual('mainnet');
    expect(network.toJSON()).toEqual('mainnet');
    expect(network.toString()).toEqual('mainnet');
    expect(network.format()).toEqual('mainnet');
  });

  it('creates an instance based on TESTNET enum', () => {
    const network = AptosNetwork.TESTNET;

    expect(network.network).toEqual('testnet');
    expect(network.toJSON()).toEqual('testnet');
    expect(network.toString()).toEqual('testnet');
    expect(network.format()).toEqual('testnet');
  });

  it('creates an instance based on DEVNET enum', () => {
    const network = AptosNetwork.DEVNET;

    expect(network.network).toEqual('devnet');
    expect(network.toJSON()).toEqual('devnet');
    expect(network.toString()).toEqual('devnet');
    expect(network.format()).toEqual('devnet');
  });

  it('creates an mainnet instance based on network number input', () => {
    const network = AptosNetwork.create('1');

    expect(network.network).toEqual('mainnet');
    expect(network.toJSON()).toEqual('mainnet');
    expect(network.toString()).toEqual('mainnet');
    expect(network.format()).toEqual('mainnet');
  });

  it('creates an testnet instance based on network number input', () => {
    const network = AptosNetwork.create('2');

    expect(network.network).toEqual('testnet');
    expect(network.toJSON()).toEqual('testnet');
    expect(network.toString()).toEqual('testnet');
    expect(network.format()).toEqual('testnet');
  });

  it('throws an error when a network is not supported', () => {
    expect(() => AptosNetwork.create('UNKNOWN')).toThrowError('Aptos network is not supported');
  });

  it('throws an error when a network based on id is not supported', () => {
    expect(() => AptosNetwork.create('999')).toThrowError('Aptos network is not supported');
  });

  it('create() does not create a new instance when AptosNetwork passed', () => {
    const network1 = AptosNetwork.create('mainnet');
    const network2 = AptosNetwork.create(network1);

    expect(network1 === network2).toBe(true);
  });

  it('equals() returns proper value', () => {
    const mainet1 = AptosNetwork.create('mainnet');
    const mainet2 = AptosNetwork.create('mainnet');
    const mainet3 = 'mainnet';
    const devnet1 = AptosNetwork.create('devnet');
    const devnet2 = 'devnet';

    expect(mainet1.equals(mainet2)).toBe(true);
    expect(mainet2.equals(mainet1)).toBe(true);
    expect(mainet1.equals(mainet3)).toBe(true);
    expect(devnet1.equals(mainet1)).toBe(false);
    expect(mainet1.equals(devnet1)).toBe(false);
    expect(mainet1.equals(devnet2)).toBe(false);
  });
});
