import { SolApi } from '../../src/SolApi';
import { cleanSolApi, setupSolApi } from '../setup';

describe('Moralis SolApi', () => {
  let SolApi: SolApi;

  beforeAll(() => {
    SolApi = setupSolApi();
  });

  afterAll(() => {
    cleanSolApi();
  });

  it('should get the NFTs of an account ', async () => {
    const result = await SolApi.account.getNFTs({
      network: 'mainnet',
      address: 'EJpLyTeE8XHG9CeREeHd6pr6hNhaRnTRJx4Z5DPhEJJ6',
    });
    const nfts = result.result;

    expect(nfts.length).toBe(2);
    const nft = nfts[0];

    expect(nft.mint.toString()).toBe('9PN8gNqJy5mVnr8PJSaiKULG2inbTZxm4Xwgc2LM6x5Z');
    expect(nft.associatedTokenAddress.toString()).toBe('Aymvy5sNtxRpUBFT19nNetsGb4VBpmb6qyPs2ybGPUcr');
    expect(nft.name).toBe('Nug 5585');
    expect(nft.symbol).toBe('METAWANA');
  });
});
