import { MoralisStreams } from '../../src/MoralisStreams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Create stream', () => {
  let StreamApi: MoralisStreams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should create a stream ', async () => {
    const result = await StreamApi.add({
      chains: ['0x3'],
      tag: 'test-1',
      description: 'Minimal body that works',
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      networkType: 'evm',
      includeNativeTxs: true,
    });

    expect(result).toBeDefined();
    expect(result.result.tag).toEqual('test-1');
  });

  it('should default to evm networkType', async () => {
    const result = await StreamApi.add({
      chains: ['0x3'],
      tag: 'test-1',
      description: 'Minimal body that works',
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      includeNativeTxs: true,
    });

    expect(result).toBeDefined();
    expect(result.result.tag).toEqual('test-1');
  });

  it('should create a stream with advanced options', async () => {
    const result = await StreamApi.add({
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      description: 'Body With advanced options',
      tag: 'test-2',
      chains: ['0x3'],
      advancedOptions: [
        {
          topic0: 'SomeEvent(address,uint256)',
          filter: { eq: ['myCoolTopic', '0x0000000000000000000000000000000000000000'] },
          includeNativeTxs: true,
        },
      ],
      topic0: ['SomeEvent(address,uint256)'],
    });

    expect(result).toBeDefined();
    expect(result.result.tag).toEqual('test-2');
  });

  it('should create a stream with all provided params', async () => {
    const result = await StreamApi.add({
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      description: 'Body with all params filled',
      tag: 'test-3',
      topic0: ['SomeEvent(address,uint256)'],
      chains: ['0x3'],
      networkType: 'evm',
      advancedOptions: [
        {
          topic0: 'SomeEvent(address,uint256)',
          filter: { eq: ['myCoolTopic', '0x0000000000000000000000000000000000000000'] },
          includeNativeTxs: true,
        },
      ],
      abi: [],
      allAddresses: true,
      includeContractLogs: true,
      includeInternalTxs: true,
      includeNativeTxs: true,
    });

    expect(result).toBeDefined();
    expect(result.result.tag).toEqual('test-3');
  });

  it('should throw an error when invalid chainId is provided', async () => {
    expect(
      StreamApi.add({
        chains: ['invalid_chain'],
        tag: 'test',
        description: 'test',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        networkType: 'evm',
      }),
    ).rejects.toThrowError(
      `[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'`,
    );
  });

  it('should throw an error when invalid webhook is provided', async () => {
    expect(
      StreamApi.add({
        chains: ['0x3'],
        tag: 'test-3',
        description: 'test',
        webhookUrl: 'https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        networkType: 'evm',
      }),
    ).rejects.toThrowError(
      `[C0006] Request failed, Bad Request(400): Could not POST to https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. Please check your webhook URL.`,
    );
  });
});
