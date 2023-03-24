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

  it('should get the portfolio of an account ', async () => {
    const { result } = await SolApi.account.getPortfolio({
      network: 'mainnet',
      address: 'EJpLyTeE8XHG9CeREeHd6pr6hNhaRnTRJx4Z5DPhEJJ6',
    });

    expect(result.nativeBalance.toString()).toBe('902329912');
    expect(result.tokens.length).toBe(2);
    expect(result.tokens.length).toBe(2);

    const token = result.tokens[0];
    expect(token.associatedTokenAddress.toString()).toBe('FaygwmWV2RGQVABXdvaPoa4Kar8EcjpaQcB4czcy4pUJ');
    expect(token.mint.toString()).toBe('EL4YBAq2vnh2oQe454x64f4WJGxrywtUtxhJpv4cx2ks');
    expect(token.amount.toString()).toBe('2');
    expect(token.name).toBe('Cets Ears');
    expect(token.symbol).toBe('goons');

    const nft = result.nfts[0];
    expect(nft.associatedTokenAddress.toString()).toBe('Aymvy5sNtxRpUBFT19nNetsGb4VBpmb6qyPs2ybGPUcr');
    expect(nft.mint.toString()).toBe('9PN8gNqJy5mVnr8PJSaiKULG2inbTZxm4Xwgc2LM6x5Z');
    expect(nft.name).toBe('Nug 5585');
    expect(nft.symbol).toBe('METAWANA');
  });
});
