import Core from '@moralis/core';
import EvmApi from '@moralis/evm-api';
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

  it('should get logs for an address', async () => {
    const result = await EvmApi.native.getLogsByAddress({
      address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.toJSON()).toEqual(expect.arrayContaining([expect.objectContaining({})]));
  });

  it('should not get logs for an invalid address and return an error code', () => {
    const failedResult = EvmApi.native
      .getLogsByAddress({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.native.getLogsByAddress({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b989',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
