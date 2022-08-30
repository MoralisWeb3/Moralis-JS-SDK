import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns a metadata', async () => {
    const response = await evmApi.token.getTokenIdMetadata({
      chain: '0x89',
      address: '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
      tokenId: '113461209507512867518933452141320285231135646094834536306130710983923277496520',
    });
    const result = response?.result.result!;

    expect(result).toBeDefined();
    expect(result.name).toEqual('OpenSea Collections');
    expect(result.contractType).toEqual('ERC1155');
    expect(result.symbol).toEqual('OPENSTORE');
    expect(result.ownerOf?.lowercase).toEqual('0x86d2b5f4af69458a22d69a7347b2133854933ba4');
  });

  it('returns null when API returns HTTP 404', async () => {
    const response = await evmApi.token.getTokenIdMetadata({
      address: '0x4044044044044044044044044044044044044040',
      tokenId: '0',
    });

    expect(response).toBeNull();
  });
});
