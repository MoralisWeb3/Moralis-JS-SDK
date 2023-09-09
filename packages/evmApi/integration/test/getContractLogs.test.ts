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
        topic0: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.events.getContractLogs({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97',
        topic0: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid address provided: 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97"`,
    );
  });

  it('should get logs for a valid address', async () => {
    const result = await evmApi.events.getContractLogs({
      address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b989',
      topic0: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(100);
    expect(result.result?.at(0)?.chain.apiHex).toBe('0x1');
    expect(result).toEqual(expect.objectContaining({}));
  });
});
