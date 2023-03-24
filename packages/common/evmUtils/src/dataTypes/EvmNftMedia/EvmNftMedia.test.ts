import { Core } from '@moralisweb3/common-core';
import { EvmNftMedia } from './EvmNftMedia';
import { setupEvmUtils } from '../../test/setup';
import { EvmNftMediaInput } from './types';

const exampleInput: EvmNftMediaInput = {
  chain: '0x1',
  mediaCollection: {
    low: {
      height: 100,
      width: 100,
      url: 'low_url',
    },
    medium: {
      height: 250,
      width: 250,
      url: 'medium_url',
    },
    high: {
      height: 500,
      width: 500,
      url: 'high_url',
    },
  },
  category: 'image',
  mimetype: 'image/png',
  parentHash: '0x21ba1263dd63696f0d9ede101b00a4e2f4985a854483076c92a3415624fca051',
  status: 'success',
  updatedAt: '2023-03-17T14:12:24.192Z',
  originalMediaUrl: 'original_url',
};

describe('EvmNftMedia', () => {
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
  it('should create a new EvmNftMedia', () => {
    const erc20Mint = EvmNftMedia.create(exampleInput);

    expect(erc20Mint.chain.hex).toBe('0x1');
    expect(erc20Mint.mediaCollection?.low.url).toBe('low_url');
    expect(erc20Mint.mediaCollection?.medium.url).toBe('medium_url');
    expect(erc20Mint.mediaCollection?.high.url).toBe('high_url');
    expect(erc20Mint.category).toBe('image');
    expect(erc20Mint.mimetype).toBe('image/png');
    expect(erc20Mint.parentHash).toBe('0x21ba1263dd63696f0d9ede101b00a4e2f4985a854483076c92a3415624fca051');
    expect(erc20Mint.status).toBe('success');
    expect(erc20Mint.updatedAt?.toISOString()).toBe('2023-03-17T14:12:24.192Z');
    expect(erc20Mint.originalMediaUrl).toBe('original_url');
  });

  /**
   * Formatting
   */
  it('should return formatting in json', () => {
    const erc20Mint = EvmNftMedia.create(exampleInput);

    const value = erc20Mint.toJSON();

    console.log(value);

    expect(value).toStrictEqual({
      chain: '0x1',
      mediaCollection: {
        low: { height: 100, width: 100, url: 'low_url' },
        medium: { height: 250, width: 250, url: 'medium_url' },
        high: { height: 500, width: 500, url: 'high_url' },
      },
      category: 'image',
      mimetype: 'image/png',
      parentHash: '0x21ba1263dd63696f0d9ede101b00a4e2f4985a854483076c92a3415624fca051',
      status: 'success',
      updatedAt: expect.any(Date),
      originalMediaUrl: 'original_url',
    });
  });

  /**
   * Methods
   */
  it('should check equality of 2 erc20Mints of the same value', () => {
    const erc20MintA = EvmNftMedia.create(exampleInput);
    const erc20MintB = EvmNftMedia.create(exampleInput);

    expect(erc20MintA.equals(erc20MintB)).toBeTruthy();
  });

  it('should check equality of 2 erc20Mints of the same value via a static method', () => {
    const erc20MintA = EvmNftMedia.create(exampleInput);
    const erc20MintB = EvmNftMedia.create(exampleInput);

    expect(EvmNftMedia.equals(erc20MintA, erc20MintB)).toBeTruthy();
  });

  it('should check inequality when chain is different', () => {
    const erc20MintA = EvmNftMedia.create(exampleInput);
    const erc20MintB = EvmNftMedia.create({ ...exampleInput, chain: '0x2' });

    expect(erc20MintA.equals(erc20MintB)).toBeFalsy();
  });

  it('should check inequality when originalMediaUrl is different', () => {
    const erc20MintA = EvmNftMedia.create(exampleInput);
    const erc20MintB = EvmNftMedia.create({ ...exampleInput, originalMediaUrl: 'other_url' });

    expect(erc20MintA.equals(erc20MintB)).toBeFalsy();
  });
});
