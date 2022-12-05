import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getPairAddress', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get pair data for a given pair address ', async () => {
    const result = await evmApi.defi.getPairAddress({
      token0Address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      token1Address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      exchange: 'pancakeswapv1',
      chain: 56,
    });

    expect(result.result.pairAddress?.checksum).toEqual('0x1B96B92314C44b159149f7E0303511fB2Fc4774f');
    expect(result.result.token0.token.contractAddress.checksum).toEqual('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c');
    expect(result.result.token0.token.name).toEqual('Wrapped BNB');
    expect(result.result.token0.token.symbol).toEqual('WBNB');
    expect(result.result.token0.blockNumber).toEqual('8242108');
    expect(result.result.token1.token.contractAddress.checksum).toEqual('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');
    expect(result.result.token1.token.name).toEqual('BUSD Token');
    expect(result.result.token1.token.symbol).toEqual('BUSD');
    expect(result.result.token1.blockNumber).toEqual('8242108');
  });
});
