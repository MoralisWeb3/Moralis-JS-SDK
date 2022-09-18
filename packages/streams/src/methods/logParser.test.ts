import { parseLog } from './logParser';

const simpleWebhookData = {
  abis: {
    '84d871ff-e14b-4f13-9ae1-ba1e543fbdd9': {
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
  },
  logs: [
    {
      log_index: '26',
      transaction_hash: '0xb671cab71d93c9854c9860fcddc57259a440f7fee074fb71c61bc4bee7c731ac',
      transaction_index: '21',
      transaction_value: '0',
      address: '0x29f6d2381f82e6d52ad54f403daff421fdb3bda2',
      data: '0x0000000000000000000000000000000000000000000000000000000000000001',
      topic0: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
      topic1: '0x000000000000000000000000992eccc191d6f74e8be187ed6b6ac196b08314f7',
      topic2: '0x0000000000000000000000001e0049783f008a0085193e00003d00cd54003c71',
      topic3: null,
      tag: 'testEvent',
      streamType: 'contract',
      streamId: '84d871ff-e14b-4f13-9ae1-ba1e543fbdd9',
    },
  ],
};

const multipleDataWebhookData = {
  abis: {
    '84d871ff-e14b-4f13-9ae1-ba1e543fbdd9': {
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    '1ad1fccc-d279-46a0-8980-1d91afd6ba67': {
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
  },
  logs: [
    {
      log_index: '26',
      transaction_hash: '0xb671cab71d93c9854c9860fcddc57259a440f7fee074fb71c61bc4bee7c731ac',
      transaction_index: '21',
      transaction_value: '0',
      address: '0x29f6d2381f82e6d52ad54f403daff421fdb3bda2',
      data: '0x0000000000000000000000000000000000000000000000000000000000000001',
      topic0: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
      topic1: '0x000000000000000000000000992eccc191d6f74e8be187ed6b6ac196b08314f7',
      topic2: '0x0000000000000000000000001e0049783f008a0085193e00003d00cd54003c71',
      topic3: null,
      tag: 'testEvent',
      streamType: 'contract',
      streamId: '84d871ff-e14b-4f13-9ae1-ba1e543fbdd9',
    },
    {
      log_index: '26',
      transaction_hash: '0xb671cab71d93c9854c9860fcddc57259a440f7fee074fb71c61bc4bee7c731ac',
      transaction_index: '21',
      transaction_value: '0',
      address: '0x29f6d2381f82e6d52ad54f403daff421fdb3bda2',
      data: '0x0000000000000000000000000000000000000000000000000000000000000001',
      topic0: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
      topic1: '0x000000000000000000000000992eccc191d6f74e8be187ed6b6ac196b08314f7',
      topic2: '0x0000000000000000000000001e0049783f008a0085193e00003d00cd54003c71',
      topic3: null,
      tag: 'testEvent2',
      streamType: 'contract',
      streamId: '1ad1fccc-d279-46a0-8980-1d91afd6ba67',
    },
    {
      log_index: '26',
      transaction_hash: '0xb671cab71d93c9854c9860fcddc57259a440f7fee074fb71c61bc4bee7c731ac',
      transaction_index: '21',
      transaction_value: '0',
      address: '0x29f6d2381f82e6d52ad54f403daff421fdb3bda2',
      data: '0x0000000000000000000000000000000000000000000000000000000000000001',
      topic0: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
      topic1: '0x000000000000000000000000992eccc191d6f74e8be187ed6b6ac196b08314f7',
      topic2: '0x0000000000000000000000001e0049783f008a0085193e00003d00cd54003c71',
      topic3: null,
      tag: 'testEvent2',
      streamType: 'contract',
      streamId: '1ad1fccc-d279-46a0-8980-1d91afd6ba67',
    },
    {
      log_index: '26',
      transaction_hash: '0xb671cab71d93c9854c9860fcddc57259a440f7fee074fb71c61bc4bee7c731ac',
      transaction_index: '21',
      transaction_value: '0',
      address: '0x29f6d2381f82e6d52ad54f403daff421fdb3bda2',
      data: '0x0000000000000000000000000000000000000000000000000000000000000001',
      topic0: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
      topic1: '0x000000000000000000000000992eccc191d6f74e8be187ed6b6ac196b08314f7',
      topic2: '0x0000000000000000000000001e0049783f008a0085193e00003d00cd54003c71',
      topic3: null,
      tag: 'testEvent3',
      streamType: 'contract',
      streamId: 'c558a80a-f319-4c10-95d4-4282ef745b4b',
    },
  ],
};

describe('logDecoder', () => {
  it('should decode logs', () => {
    const decodedLogs: any = parseLog({ webhookData: simpleWebhookData, tag: 'testEvent' });

    expect(decodedLogs[0].from).toEqual('0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7');
    expect(decodedLogs[0].to).toEqual('0x1E0049783F008A0085193E00003D00cd54003c71');
    expect(decodedLogs[0].value).toEqual('1');
  });

  it('should decode multiple logs', () => {
    const decodedLogs: any = parseLog({ webhookData: multipleDataWebhookData, tag: 'testEvent2' });

    expect(decodedLogs[0].owner).toEqual('0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7');
    expect(decodedLogs[0].spender).toEqual('0x1E0049783F008A0085193E00003D00cd54003c71');
    expect(decodedLogs[0].value).toEqual('1');
    expect(decodedLogs[1].owner).toEqual('0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7');
    expect(decodedLogs[1].spender).toEqual('0x1E0049783F008A0085193E00003D00cd54003c71');
    expect(decodedLogs[1].value).toEqual('1');
  });

  it('should throw no tag error', () => {
    expect(() => parseLog({ webhookData: simpleWebhookData, tag: 'wrongTag' })).toThrowErrorMatchingInlineSnapshot(
      `"[S0001] Cannot decode the logs. No stream found for tag wrongTag."`,
    );
  });

  it('should throw no abi error', () => {
    expect(() =>
      parseLog({ webhookData: multipleDataWebhookData, tag: 'testEvent3' }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"[S0001] Cannot decode the logs. No abi found  for c558a80a-f319-4c10-95d4-4282ef745b4b."`,
    );
  });
});
