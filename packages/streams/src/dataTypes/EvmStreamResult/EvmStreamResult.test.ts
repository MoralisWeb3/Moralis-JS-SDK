import { setupStreams } from '../../test/setup';
import { EvmStreamResult } from './EvmStreamResult';
import { initialWebhookResponse } from './mockData/testData';

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
});
