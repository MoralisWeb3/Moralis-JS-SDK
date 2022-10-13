import { setupStreams } from '../../test/setup';
import { EvmStreamResult } from './EvmStreamResult';
import { initialWebhookResponse, nativeTxWebhookResponse } from './mockData/testData';

describe('EvmStreamResult', () => {
  beforeAll(() => {
    setupStreams();
  });

  it('should create a new EvmStreamResult succesfully based on the initial test webhook', () => {
    const result = EvmStreamResult.create(initialWebhookResponse.data);

    expect(result.chain.hex).toBe('0x1');

    expect(result.block.number).toBe('0');
    expect(result.block.hash).toBe('');
    expect(result.block.timestamp).toEqual(new Date('1999-12-31T23:00:00.000Z'));

    // Formatted results
    expect(result.format().confirmed).toBe(true);
    expect(result.format().retries).toBe(0);

    expect(result.format().block).toStrictEqual({
      chain: '0x1',
      hash: '',
      number: '0',
      timestamp: new Date('1999-12-31T23:00:00.000Z'),
    });
    expect(result.format().chain).toBe('0x1');
  });

  it('should create a new EvmStreamResult succesfully based on a native transaction webhook', () => {
    const result = EvmStreamResult.create(nativeTxWebhookResponse.data);

    expect(result.block.number).toBe('7755624');
    expect(result.chain.hex).toBe('0x5');
    expect(result.confirmed).toBe(true);
    expect(result.retries).toBe(0);
    expect(result.txs[0]).toBeDefined();
    expect(result.txs[0].hash).toBe('0x6076852ed3e7f7c4f5b45552966a7049026b425865ba9ae8ef7f8fc918ea4ba2');
  });
});
