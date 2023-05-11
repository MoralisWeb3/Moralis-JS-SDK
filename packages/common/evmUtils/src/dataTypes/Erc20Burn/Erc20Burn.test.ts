import { Erc20Burn } from './Erc20Burn';
import { Erc20BurnInput } from './types';

const exampleInput: Erc20BurnInput = {
  chain: '0x1',
  fromWallet: '0x09f4fc6081026c85070886599e83f599ecf82405',
  contractAddress: '0xa0e8fed3426391fdb446516799c4d6248e2b2860',
  blockHash: '0xa5f87d4341642b89e3ccb81449e3083032c36fface2c2042941b8bd9afe83f79',
  blockNumber: '16868690',
  blockTimestamp: '2023-03-20T11:48:59.000Z',
  transactionHash: '0xb7b4d321e2ab26c1cde1a2ef49413e21b65dcc663d6de8f75ddbdd868b98b4bf',
  transactionIndex: 4,
  logIndex: 25,
  value: '100000000000000000000000000000',
  tokenName: 'Test Token',
  tokenSymbol: 'TST',
  tokenLogo: 'https://example.com/logo.png',
  tokenDecimals: 18,
};

describe('Erc20Burn', () => {
  /**
   * Creation
   */
  it('should create a new Erc20Burn', () => {
    const erc20Mint = Erc20Burn.create(exampleInput);

    expect(erc20Mint.chain.hex).toBe('0x1');
    expect(erc20Mint.fromWallet.lowercase).toBe('0x09f4fc6081026c85070886599e83f599ecf82405');
    expect(erc20Mint.contractAddress.lowercase).toBe('0xa0e8fed3426391fdb446516799c4d6248e2b2860');
    expect(erc20Mint.blockNumber.toString()).toBe('16868690');
    expect(erc20Mint.blockTimestamp.toISOString()).toBe('2023-03-20T11:48:59.000Z');
    expect(erc20Mint.transactionHash).toBe('0xb7b4d321e2ab26c1cde1a2ef49413e21b65dcc663d6de8f75ddbdd868b98b4bf');
    expect(erc20Mint.transactionIndex).toBe(4);
    expect(erc20Mint.logIndex).toBe(25);
    expect(erc20Mint.value.toString()).toBe('100000000000000000000000000000');
    expect(erc20Mint.tokenName).toBe('Test Token');
    expect(erc20Mint.tokenSymbol).toBe('TST');
    expect(erc20Mint.tokenLogo).toBe('https://example.com/logo.png');
    expect(erc20Mint.tokenDecimals).toBe(18);
  });

  /**
   * Formatting
   */
  it('should return formatting in json', () => {
    const erc20Mint = Erc20Burn.create(exampleInput);

    const value = erc20Mint.toJSON();

    expect(value).toStrictEqual({
      chain: '0x1',
      fromWallet: '0x09f4fc6081026c85070886599e83f599ecf82405',
      contractAddress: '0xa0e8fed3426391fdb446516799c4d6248e2b2860',
      blockHash: '0xa5f87d4341642b89e3ccb81449e3083032c36fface2c2042941b8bd9afe83f79',
      blockNumber: '16868690',
      blockTimestamp: new Date('2023-03-20T11:48:59.000Z'),
      transactionHash: '0xb7b4d321e2ab26c1cde1a2ef49413e21b65dcc663d6de8f75ddbdd868b98b4bf',
      transactionIndex: 4,
      logIndex: 25,
      value: '100000000000000000000000000000',
      tokenName: 'Test Token',
      tokenSymbol: 'TST',
      tokenLogo: 'https://example.com/logo.png',
      tokenDecimals: 18,
    });
  });

  /**
   * Methods
   */
  it('should check equality of 2 erc20Mints of the same value', () => {
    const erc20MintA = Erc20Burn.create(exampleInput);
    const erc20MintB = Erc20Burn.create(exampleInput);

    expect(erc20MintA.equals(erc20MintB)).toBeTruthy();
  });

  it('should check equality of 2 erc20Mints of the same value via a static method', () => {
    const erc20MintA = Erc20Burn.create(exampleInput);
    const erc20MintB = Erc20Burn.create(exampleInput);

    expect(Erc20Burn.equals(erc20MintA, erc20MintB)).toBeTruthy();
  });

  it('should check inequality when chain is different', () => {
    const erc20MintA = Erc20Burn.create(exampleInput);
    const erc20MintB = Erc20Burn.create({ ...exampleInput, chain: '0x2' });

    expect(erc20MintA.equals(erc20MintB)).toBeFalsy();
  });
});
