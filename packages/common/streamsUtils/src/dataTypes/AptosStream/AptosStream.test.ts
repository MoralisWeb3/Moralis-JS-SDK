import { AptosStream } from './AptosStream';
import { mockAptosStream } from './AptosStream.mock';

const testsInputs = Object.entries(mockAptosStream).map(([name, input]) => ({ name, input }));

describe('AptosStream', () => {
  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const stream = AptosStream.create(input);
    const output = stream.format();

    expect(stream).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Simple', () => {
    const input = mockAptosStream.SIMPLE;
    let stream: AptosStream;

    beforeAll(() => {
      stream = AptosStream.create(input);
    });

    it('should return correct values for all getters', () => {
      expect(stream.webhookUrl).toBe('https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f');
      expect(stream.description).toBe('mock response');
      expect(stream.tag).toBe('tag');
      expect(stream.allAddresses).toBe(false);
      expect(stream.id).toBe('3fa85f64-5717-4562-b3fc-2c963f66afa6');
      expect(stream.status).toBe('active');
      expect(stream.statusMessage).toBe('Stream is active');
      expect(stream.network.map((network) => network.network)).toStrictEqual(['mainnet']);
      expect(stream.demo).toBe(false);
      expect(stream.includeChanges).toBe(false);
      expect(stream.includeEvents).toBe(false);
      expect(stream.includePayload).toBe(false);
      expect(stream.isErrorSince).toBe(null);
      expect(stream.events).toStrictEqual([]);
      expect(stream.functions).toStrictEqual([]);
      expect(stream.amountOfAddresses).toBe(1);
    });

    it('should parse the values to JSON correctly', () => {
      const json = stream.toJSON();

      expect(json).toStrictEqual({
        webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
        description: 'mock response',
        tag: 'tag',
        allAddresses: false,
        status: 'active',
        statusMessage: 'Stream is active',
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        network: ['mainnet'],
        demo: false,
        includeChanges: false,
        includeEvents: false,
        includePayload: false,
        isErrorSince: null,
        events: [],
        functions: [],
        amountOfAddresses: 1,
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = stream.format();

      expect(json).toStrictEqual({
        webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
        description: 'mock response',
        tag: 'tag',
        allAddresses: false,
        status: 'active',
        statusMessage: 'Stream is active',
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        network: ['mainnet'],
        demo: false,
        includeChanges: false,
        includeEvents: false,
        includePayload: false,
        isErrorSince: null,
        events: [],
        functions: [],
        amountOfAddresses: 1,
      });
    });
  });
});
