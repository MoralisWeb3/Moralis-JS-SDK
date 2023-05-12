import { EvmChain } from './EvmChain';

describe('EvmChain', () => {
  /**
   * Creation
   */
  it('should create a new EvmChain based on a number', () => {
    const chain = EvmChain.create(45);

    expect(chain.toJSON()).toBe('0x2d');
    expect(chain.decimal).toBe(45);
    expect(chain.apiHex).toBe('0x2d');
  });

  it('should create a new EvmChain based on a hex-string', () => {
    const chain = EvmChain.create('0x2d');

    expect(chain.toJSON()).toBe('0x2d');
    expect(chain.decimal).toBe(45);
    expect(chain.apiHex).toBe('0x2d');
  });

  it('should create a new EvmChain based on a decimal-string', () => {
    const chain = EvmChain.create('45');

    expect(chain.toJSON()).toBe('0x2d');
    expect(chain.decimal).toBe(45);
    expect(chain.apiHex).toBe('0x2d');
  });

  it('should throw an error when creating a chain with unknown name', () => {
    expect(() => EvmChain.create('bitcoin')).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'"`,
    );
  });

  it('should throw an error when creating a chain incomplete hex-string', () => {
    expect(() => EvmChain.create('0x')).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'"`,
    );
  });
  it('should throw an error when creating a chain zero hex-string', () => {
    expect(() => EvmChain.create('0x0')).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'"`,
    );
  });

  it('should throw an error when creating 0', () => {
    expect(() => EvmChain.create(0)).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'"`,
    );
  });

  it('should create a new EvmChain based on an exported enum', () => {
    const chain = EvmChain.MUMBAI;

    expect(chain.toJSON()).toBe('0x13881');
    expect(chain.decimal).toBe(80001);
    expect(chain.apiHex).toBe('0x13881');
  });

  it('should return the same EvmChain on calling create with an EvmChain', () => {
    const chainA = EvmChain.create('0x1');
    const chainB = EvmChain.create(chainA);

    expect(chainA).toBe(chainB);
  });

  it('should return the same EvmChain on calling create with an EvmChain', () => {
    const chainA = EvmChain.create('0x1');
    const chainB = EvmChain.create(chainA);

    expect(chainA).toBe(chainB);
  });

  /**
   * Methods
   */
  it('should check equality of 2 chains of the same id', () => {
    const chainA = EvmChain.create('0x2d');
    const chainB = EvmChain.create(45);

    expect(chainA.equals(chainB)).toBeTruthy();
  });

  it('should check equality of 2 chains of the same id via a static method', () => {
    const chainA = EvmChain.create('0x2d');
    const chainB = EvmChain.create(45);

    expect(EvmChain.equals(chainA, chainB)).toBeTruthy();
  });

  it('should check inequality of 2 chains of the same id', () => {
    const chainA = EvmChain.create('0x2d');
    const chainB = EvmChain.create(46);

    expect(chainA.equals(chainB)).toBeFalsy();
  });

  /**
   * External data
   */
  it('should get the chain name', () => {
    const chain = EvmChain.create('0x1');

    expect(chain.name).toBe('Ethereum Mainnet');
    expect(chain.rpcUrls).toStrictEqual([
      'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
      'wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}',
      'https://api.mycryptoapi.com/eth',
      'https://cloudflare-eth.com',
      'https://ethereum.publicnode.com',
    ]);
    expect(chain.currency).toStrictEqual({
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    });
  });
});
