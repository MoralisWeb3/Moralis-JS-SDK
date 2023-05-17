import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('reviewContracts', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('sends request correctly', async () => {
    const result = await evmApi.utils.reviewContracts(
      {
        chain: EvmChain.ETHEREUM,
      },
      {
        contracts: [
          {
            reason: 'My reason',
            reportType: 'spam',
            contractType: 'ERC20',
            contractAddress: EvmAddress.create('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'),
          },
        ],
      },
    );

    expect(result.result.message).toEqual('Submission successful');
  });
});
