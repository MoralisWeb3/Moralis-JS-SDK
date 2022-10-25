import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTContractMetadata', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns a data', async () => {
    const response = await evmApi.nft.getNFTContractMetadata({
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    });
    const result = response?.result!;

    expect(result).toBeDefined();
    expect(result.result.symbol).toBe('BAYC');
    expect(result.result.name).toBe('BoredApeYachtClub');
    expect(result.result.contractType).toBe('ERC721');
  });

  it('returns null when API returns HTTP 404', async () => {
    const response = await evmApi.nft.getNFTContractMetadata({
      address: '0x4044044044044044044044044044044044044040',
    });

    expect(response).toBeNull();
  });
});
