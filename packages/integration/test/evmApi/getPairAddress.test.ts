import Core from '@moralisweb3/core';
import EvmApi from '@moralisweb3/evm-api';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequests';

describe('Moralis EvmApi', () => {
  const server = mockServer;

  beforeAll(() => {
    Core.registerModules([EvmApi]);
    Core.start({
      apiKey: MOCK_API_KEY,
    });

    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should get the liquidity reserves for a given pair address ', async () => {
    const result = await EvmApi.defi.getPairReserves({
      pair_address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    });

    expect(result.toJSON().reserve0).toBe('230919083588823304348382');
    expect(result.toJSON().reserve1).toBe('836367848974112604968');
    expect(result.legacy.reserve0).toBe('230919083588823304348382');
    expect(result.legacy.reserve1).toBe('836367848974112604968');
    expect(result.result.reserve0).toBe('230919083588823304348382');
    expect(result.result.reserve1).toBe('836367848974112604968');
  });

  it('should not get the liquidity reserves for a given pair address ', async () => {
    const failedResult = await EvmApi.defi
      .getPairReserves({
        pair_address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.resolve.resolveAddress({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 400"`);
  });
});
