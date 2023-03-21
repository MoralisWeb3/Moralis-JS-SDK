import { Core } from '@moralisweb3/common-core';
import { Erc20Mint } from './Erc20Mint';
import { setupEvmUtils } from '../../test/setup';
import { Erc20MintInput } from './types';

const exampleInput: Erc20MintInput = {
  chain: '0x1',
  toWallet: '0x09f4fc6081026c85070886599e83f599ecf82405',
  contractAddress: '0xa0e8fed3426391fdb446516799c4d6248e2b2860',
  blockHash: '0xa5f87d4341642b89e3ccb81449e3083032c36fface2c2042941b8bd9afe83f79',
  blockNumber: '16868690',
  blockTimestamp: '2023-03-20T11:48:59.000Z',
  transactionHash: '0xb7b4d321e2ab26c1cde1a2ef49413e21b65dcc663d6de8f75ddbdd868b98b4bf',
  transactionIndex: 4,
  logIndex: 25,
  value: '100000000000000000000000000000',
};

describe('Erc20Mint', () => {
  let core: Core;

  beforeAll(() => {
    core = setupEvmUtils();
  });

  beforeEach(() => {
    core.config.reset();
  });

  /**
   * Creation
   */
  it('should create a new Erc20Mint', () => {
    const erc20Mint = Erc20Mint.create(exampleInput);

    expect(erc20Mint.chain.hex).toBe('0x1');
    expect(erc20Mint.toWallet.lowercase).toBe('0x09f4fc6081026c85070886599e83f599ecf82405');
    expect(erc20Mint.contractAddress.lowercase).toBe('0xa0e8fed3426391fdb446516799c4d6248e2b2860');
    expect(erc20Mint.blockNumber.toString()).toBe('16868690');
    expect(erc20Mint.blockTimestamp.toISOString()).toBe('2023-03-20T11:48:59.000Z');
    expect(erc20Mint.transactionHash).toBe('0xb7b4d321e2ab26c1cde1a2ef49413e21b65dcc663d6de8f75ddbdd868b98b4bf');
    expect(erc20Mint.transactionIndex).toBe(4);
    expect(erc20Mint.logIndex).toBe(25);
    expect(erc20Mint.value.toString()).toBe('100000000000000000000000000000');
  });

  /**
   * Formatting
   */
  it('should return formatting in json', () => {
    const erc20Mint = Erc20Mint.create(exampleInput);

    const value = erc20Mint.toJSON();

    expect(value).toStrictEqual({
      chain: '0x1',
      toWallet: '0x09f4fc6081026c85070886599e83f599ecf82405',
      contractAddress: '0xa0e8fed3426391fdb446516799c4d6248e2b2860',
      blockHash: '0xa5f87d4341642b89e3ccb81449e3083032c36fface2c2042941b8bd9afe83f79',
      blockNumber: '16868690',
      blockTimestamp: new Date('2023-03-20T11:48:59.000Z'),
      transactionHash: '0xb7b4d321e2ab26c1cde1a2ef49413e21b65dcc663d6de8f75ddbdd868b98b4bf',
      transactionIndex: 4,
      logIndex: 25,
      value: '100000000000000000000000000000',
    });
  });

  /**
   * Methods
   */
  it('should check equality of 2 erc20Mints of the same value', () => {
    const erc20MintA = Erc20Mint.create(exampleInput);
    const erc20MintB = Erc20Mint.create(exampleInput);

    expect(erc20MintA.equals(erc20MintB)).toBeTruthy();
  });

  it('should check equality of 2 erc20Mints of the same value via a static method', () => {
    const erc20MintA = Erc20Mint.create(exampleInput);
    const erc20MintB = Erc20Mint.create(exampleInput);

    expect(Erc20Mint.equals(erc20MintA, erc20MintB)).toBeTruthy();
  });

  it('should check inequality when chain is different', () => {
    const erc20MintA = Erc20Mint.create(exampleInput);
    const erc20MintB = Erc20Mint.create({ ...exampleInput, chain: '0x2' });

    expect(erc20MintA.equals(erc20MintB)).toBeFalsy();
  });
});
