import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getContractLogs', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get logs for an address', async () => {
    const result = await evmApi.events.getContractLogs({
      address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b989',
      chain: 137, // Polygon
      fromDate: '2022-03-05T13:45:42.000Z',
      toDate: '2022-03-05T13:45:42.000Z',
      topic0: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
      topic1: '0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a',
      topic2: '0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391',
      topic3: '0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(100);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get logs for an invalid address and return an error code', async () => {
    const failedResult = await evmApi.events
      .getContractLogs({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97',
        chain: 56, // Goerli
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.events.getContractLogs({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
