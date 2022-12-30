import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getDateToBlock', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the closest block of the provided date ', async () => {
    const result = await evmApi.block.getDateToBlock({
      date: '2022-12-29T08:39:51.000Z',
      chain: 5,
    });

    expect(result).toBeDefined();
    expect(result.result.block).toBe(16289278);
    expect(result.result.date.toISOString()).toBe('2022-12-29T08:39:51.000Z');
    expect(result.result.timestamp).toBe(1672303191);
    expect(result.result.hash).toBe('0x14bd58cd566c0bc637c03328fab8347913eea246e46f9b0017fcf837f7ba18de');
    expect(result.result.parentHash).toBe('0x36c2287d83188f60b6990ad6026716750a02f410de8b9eb15581bb46a623d0a0');
    expect(result.result.blockTimestamp).toBe('2022-12-29T08:39:35.000Z');
  });
});
