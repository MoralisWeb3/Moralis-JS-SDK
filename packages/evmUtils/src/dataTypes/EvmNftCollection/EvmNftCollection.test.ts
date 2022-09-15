import { MoralisCore } from '@moralisweb3/core';
import { EvmNftCollection } from './EvmNftCollection';
import { setupEvmUtils } from '../../test/setup';
import { EvmNftCollectionInput } from './types';

const exampleInput: EvmNftCollectionInput = {
  chain: '0x1',
  tokenAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  contractType: 'ERC721',
  name: 'Test NFT',
  symbol: 'TEST',
};

describe('EvmNftCollection', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupEvmUtils();
  });

  beforeEach(() => {
    core.config.reset();
  });

  /**
   * Creation
   */
  it('should create a new EvmNftCollection', () => {
    const collection = EvmNftCollection.create(exampleInput);

    expect(collection.chain.hex).toBe('0x1');
    expect(collection.tokenAddress.checksum).toBe('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
    expect(collection.contractType).toBe('ERC721');
    expect(collection.name).toBe('Test NFT');
    expect(collection.symbol).toBe('TEST');
  });

  it('should throw an error when creating with an invalid contractType', () => {
    expect(() =>
      EvmNftCollection.create({ ...exampleInput, contractType: 'ERC100' }),
    ).toThrowError('[C0005] Invalid NFT contract type provided');
  });

  /**
   * Formatting
   */
  it('should return formatting in json', () => {
    const collection = EvmNftCollection.create(exampleInput);

    const value = collection.toJSON();

    expect(value).toStrictEqual({
      chain: '0x1',
      contractType: 'ERC721',
      name: 'Test NFT',
      symbol: 'TEST',
      tokenAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    });
  });

  it('should return a result object', () => {
    const collection = EvmNftCollection.create(exampleInput);

    const value = collection.result;

    expect(value.chain.equals(exampleInput.chain)).toBeTruthy();
    expect(value.contractType).toBe('ERC721');
    expect(value.name).toBe('Test NFT');
    expect(value.symbol).toBe('TEST');
    expect(value.tokenAddress.equals(exampleInput.tokenAddress)).toBeTruthy();
  });

  /**
   * Methods
   */
  it('should check equality of 2 collections of the same value', () => {
    const collectionA = EvmNftCollection.create(exampleInput);
    const collectionB = EvmNftCollection.create(exampleInput);

    expect(collectionA.equals(collectionB)).toBeTruthy();
  });

  it('should check equality of 2 collectiones of the same value via a static method', () => {
    const collectionA = EvmNftCollection.create(exampleInput);
    const collectionB = EvmNftCollection.create(exampleInput);

    expect(EvmNftCollection.equals(collectionA, collectionB)).toBeTruthy();
  });

  it('should check inequality when chain is different', () => {
    const collectionA = EvmNftCollection.create(exampleInput);
    const collectionB = EvmNftCollection.create({ ...exampleInput, chain: '0x2' });

    expect(collectionA.equals(collectionB)).toBeFalsy();
  });

  it('should check inequality when tokenAddress is different', () => {
    const collectionA = EvmNftCollection.create(exampleInput);
    const collectionB = EvmNftCollection.create({
      ...exampleInput,
      tokenAddress: '0xC969E2CBF0Be089d938256ebE3931c2416D8A109',
    });

    expect(collectionA.equals(collectionB)).toBeFalsy();
  });
});
