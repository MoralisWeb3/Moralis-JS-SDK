import { IWebhook } from '@moralisweb3/streams-typings';
import { parseLog } from './logParser';

const webhookData: Partial<IWebhook> = {
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
  ],
  logs: [
    {
      logIndex: '3',
      transactionHash: '0xa7840a0693ec502b0df42b6e7f75ad7a873dda95ee829cff01272e9e6fd5a37c',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x000000000000000000000000000000000000000000000000000000004a515efa',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x000000000000000000000000b4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      topic2: '0x00000000000000000000000088ff79eb2bc5850f27315415da8685282c7610f9',
      topic3: null,
    },
  ],
};

const webhookDataNoAbi: Partial<IWebhook> = {
  abi: [],
  logs: [
    {
      logIndex: '3',
      transactionHash: '0xa7840a0693ec502b0df42b6e7f75ad7a873dda95ee829cff01272e9e6fd5a37c',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x000000000000000000000000000000000000000000000000000000004a515efa',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x000000000000000000000000b4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      topic2: '0x00000000000000000000000088ff79eb2bc5850f27315415da8685282c7610f9',
      topic3: null,
    },
  ],
};

describe('logDecoder', () => {
  it('should decode logs', () => {
    const decodedLogs: any = parseLog(webhookData as IWebhook);

    expect(decodedLogs[0].from).toEqual('0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc');
    expect(decodedLogs[0].to).toEqual('0x88ff79eB2Bc5850F27315415da8685282C7610F9');
  });

  it('should throw no abi error', () => {
    expect(() => parseLog(webhookDataNoAbi as IWebhook)).toThrowErrorMatchingInlineSnapshot(
      `"[S0001] Cannot decode the logs. No abis found in the provided webhook."`,
    );
  });
});
