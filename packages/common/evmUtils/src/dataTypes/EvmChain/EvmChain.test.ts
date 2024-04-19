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

  it('returns correct chain ID', () => {
    expect(EvmChain.ETHEREUM.apiHex).toBe('0x1');
    expect(EvmChain.GOERLI.apiHex).toBe('0x5');
    expect(EvmChain.SEPOLIA.apiHex).toBe('0xaa36a7');
    expect(EvmChain.BSC.apiHex).toBe('0x38');
    expect(EvmChain.BSC_TESTNET.apiHex).toBe('0x61');
    expect(EvmChain.POLYGON.apiHex).toBe('0x89');
    expect(EvmChain.MUMBAI.apiHex).toBe('0x13881');
    expect(EvmChain.FANTOM.apiHex).toBe('0xfa');
    expect(EvmChain.FANTOM_TESTNET.apiHex).toBe('0xfa2');
    expect(EvmChain.AVALANCHE.apiHex).toBe('0xa86a');
    expect(EvmChain.AVALANCHE_TESTNET.apiHex).toBe('0xa869');
    expect(EvmChain.CRONOS.apiHex).toBe('0x19');
    expect(EvmChain.RONIN.apiHex).toBe('0x7e4');
    expect(EvmChain.ARBITRUM.apiHex).toBe('0xa4b1');
    expect(EvmChain.ARBITRUM_TESTNET.apiHex).toBe('0x66eed');
    expect(EvmChain.OPTIMISM.apiHex).toBe('0xa');
    expect(EvmChain.PALM.apiHex).toBe('0x2a15c308d');
    expect(EvmChain.CHILIZ.apiHex).toBe('0x15b38');
    expect(EvmChain.CHILIZ_TESTNET.apiHex).toBe('0x15b32');
    expect(EvmChain.GNOSIS.apiHex).toBe('0x64');
    expect(EvmChain.GNOSIS_TESTNET.apiHex).toBe('0x27d8');
    expect(EvmChain.BASE.apiHex).toBe('0x2105');
    expect(EvmChain.BASE_TESTNET.apiHex).toBe('0x14a33');
    expect(EvmChain.HOLESKY.apiHex).toBe('0x4268');
    expect(EvmChain.POLYGON_AMOY.apiHex).toBe('0x13882');
    expect(EvmChain.LINEA.apiHex).toBe('0xe708');
    expect(EvmChain.MOONBEAM.apiHex).toBe('0x504');
  });

  describe('metadata', () => {
    const notSupportedChains = ['0x7e4', '0x15b32', '0x4268'];
    const supportedChains = EvmChain.values().filter((chain) => !notSupportedChains.includes(chain.apiHex));

    for (const chain of supportedChains) {
      it(`returns metadata for ${chain.apiHex}`, () => {
        expect(chain.name).toBeDefined();
        expect((chain.rpcUrls as string[]).length > 0).toBeTruthy();
        expect(chain.currency).toBeDefined();
        expect(chain.currency?.decimals).toBeDefined();
        expect(chain.currency?.name).toBeDefined();
        expect(chain.currency?.symbol).toBeDefined();
        expect(chain.explorer).toBeDefined();
        expect(chain.explorer?.url).toBeDefined();
      });
    }

    it('returns correct metadata for Ethereum', () => {
      const chain = EvmChain.create('0x1');

      expect(chain.name).toBe('Ethereum Mainnet');
      expect(chain.rpcUrls).toContain('https://api.mycryptoapi.com/eth');
      expect(chain.currency).toStrictEqual({
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      });
    });
  });
});
