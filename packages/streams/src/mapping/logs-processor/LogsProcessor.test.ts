import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../core/CollectionNameBuilder';

import { LogsProcessor } from './LogsProcessor';

const batch: IWebhook = {
  confirmed: false,
  chainId: '0x1',
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
  retries: 0,
  block: {
    number: '15695815',
    hash: '0x771a48ac8bc09f19bf6cbeea98095650d988b61238fb14716991e59bdcfc1477',
    timestamp: '1665140723',
  },
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
    {
      logIndex: '19',
      transactionHash: '0xfdfd919547092b1473611c454c6c93e87471f26dea898a8e12c6dda89be4041c',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x0000000000000000000000000000000000000000000000000000000008f0d180',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x0000000000000000000000006ce8f00a80b9fa56d57cc5f49f3398a90463192e',
      topic2: '0x00000000000000000000000040ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf',
      topic3: null,
    },
    {
      logIndex: '23',
      transactionHash: '0x2b518aa06948c3fa84301979ad088517a9e8735d80647aaf1caf77a844a6c61d',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x000000000000000000000000000000000000000000000000000000020b20546f',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x000000000000000000000000397ff1542f962076d0bfe58ea045ffa2d347aca0',
      topic2: '0x000000000000000000000000beefbabeea323f07c59926295205d3b7a17e8638',
      topic3: null,
    },
    {
      logIndex: '53',
      transactionHash: '0xff1a200c2dfd77882d35f96594fe20f031c0bdbeef4de55aa52ea0e523d15568',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x000000000000000000000000000000000000000000000000000000003f83114c',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x000000000000000000000000397ff1542f962076d0bfe58ea045ffa2d347aca0',
      topic2: '0x0000000000000000000000001111111254fb6c44bac0bed2854e76f90643097d',
      topic3: null,
    },
    {
      logIndex: '56',
      transactionHash: '0xff1a200c2dfd77882d35f96594fe20f031c0bdbeef4de55aa52ea0e523d15568',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x000000000000000000000000000000000000000000000000000000003f83114c',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x0000000000000000000000001111111254fb6c44bac0bed2854e76f90643097d',
      topic2: '0x00000000000000000000000054f660940a32ce6cdf833e30926b2523497032ed',
      topic3: null,
    },
    {
      logIndex: '63',
      transactionHash: '0x0bf4e1f42097117f502eba2cf2392d1cb969f26ab0647222637395de2410c026',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x0000000000000000000000000000000000000000000000000000000007641700',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x00000000000000000000000097f16b00d436fcd49d5911e68002f1cd4d5e47c5',
      topic2: '0x000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee57',
      topic3: null,
    },
    {
      logIndex: '64',
      transactionHash: '0x0bf4e1f42097117f502eba2cf2392d1cb969f26ab0647222637395de2410c026',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x0000000000000000000000000000000000000000000000000000000007641700',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee57',
      topic2: '0x000000000000000000000000b3c839dbde6b96d37c56ee4f9dad3390d49310aa',
      topic3: null,
    },
    {
      logIndex: '95',
      transactionHash: '0x560e6161c0d09bb265af281c6964e0316ef0c5357172eb375e6dba15c6b0e09e',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x0000000000000000000000000000000000000000000000000000000000000000',
      topic0: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
      topic1: '0x000000000000000000000000cd231d4ba7b15a4722ac057419d9cd7689e7b8db',
      topic2: '0x00000000000000000000000028cba71583e5f7149e59d59ee9294e204fa24741',
      topic3: null,
    },
    {
      logIndex: '140',
      transactionHash: '0x91fed188f3f3f94f4f00b376561644b1fd3eda11fbcd8d22e397813a2e7fa9c4',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x000000000000000000000000000000000000000000000000000000012a05f200',
      topic0: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
      topic1: '0x0000000000000000000000006ac0bf4b95985636d6f9a5c5e28e611cf8004683',
      topic2: '0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      topic3: null,
    },
    {
      logIndex: '142',
      transactionHash: '0x91fed188f3f3f94f4f00b376561644b1fd3eda11fbcd8d22e397813a2e7fa9c4',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x000000000000000000000000000000000000000000000000000000012a05f200',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x0000000000000000000000006ac0bf4b95985636d6f9a5c5e28e611cf8004683',
      topic2: '0x00000000000000000000000088e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
      topic3: null,
    },
    {
      logIndex: '220',
      transactionHash: '0x161d8c3641b9e648905580f1288fb3e8935136652518eb71a1facdcd4765de3a',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x00000000000000000000000000000000000000000000000000000003ba6b31bc',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x000000000000000000000000cdec510974a17fcf3156efb104990de7f12cbcfe',
      topic2: '0x00000000000000000000000023ddd3e3692d1861ed57ede224608875809e127f',
      topic3: null,
    },
    {
      logIndex: '289',
      transactionHash: '0xaa22a7eef71898b7bf413cfb1941538afc2e7b874d092394c2efd2e6e81c8258',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x00000000000000000000000000000000000000000000000000000001dc3db980',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x0000000000000000000000007d6636635b7c00e59363b544ed518c6c18c2c8eb',
      topic2: '0x00000000000000000000000042261e4c83d41f86cd603513957bb26f9b4c9663',
      topic3: null,
    },
    {
      logIndex: '302',
      transactionHash: '0x2b98a4b51c0860b6eb5a68d8a98c3ca402b8a12e55a8e6095d2ea071ce6aaff8',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x0000000000000000000000000000000000000000000000000000000000d67044',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x000000000000000000000000b4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      topic2: '0x0000000000000000000000001266faebc05d5c96e941a0d715228ba68efada86',
      topic3: null,
    },
  ],
  txs: [],
  txsInternal: [],
  erc20Transfers: [
    {
      transactionHash: '0xa7840a0693ec502b0df42b6e7f75ad7a873dda95ee829cff01272e9e6fd5a37c',
      logIndex: '3',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      to: '0x88ff79eb2bc5850f27315415da8685282c7610f9',
      value: '1246846714',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '1246.846714',
    },
    {
      transactionHash: '0xfdfd919547092b1473611c454c6c93e87471f26dea898a8e12c6dda89be4041c',
      logIndex: '19',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0x6ce8f00a80b9fa56d57cc5f49f3398a90463192e',
      to: '0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf',
      value: '150000000',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '150',
    },
    {
      transactionHash: '0x2b518aa06948c3fa84301979ad088517a9e8735d80647aaf1caf77a844a6c61d',
      logIndex: '23',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
      to: '0xbeefbabeea323f07c59926295205d3b7a17e8638',
      value: '8776602735',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '8776.602735',
    },
    {
      transactionHash: '0xff1a200c2dfd77882d35f96594fe20f031c0bdbeef4de55aa52ea0e523d15568',
      logIndex: '53',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
      to: '0x1111111254fb6c44bac0bed2854e76f90643097d',
      value: '1065554252',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '1065.554252',
    },
    {
      transactionHash: '0xff1a200c2dfd77882d35f96594fe20f031c0bdbeef4de55aa52ea0e523d15568',
      logIndex: '56',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0x1111111254fb6c44bac0bed2854e76f90643097d',
      to: '0x54f660940a32ce6cdf833e30926b2523497032ed',
      value: '1065554252',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '1065.554252',
    },
    {
      transactionHash: '0x0bf4e1f42097117f502eba2cf2392d1cb969f26ab0647222637395de2410c026',
      logIndex: '63',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0x97f16b00d436fcd49d5911e68002f1cd4d5e47c5',
      to: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
      value: '124000000',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '124',
    },
    {
      transactionHash: '0x0bf4e1f42097117f502eba2cf2392d1cb969f26ab0647222637395de2410c026',
      logIndex: '64',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
      to: '0xb3c839dbde6b96d37c56ee4f9dad3390d49310aa',
      value: '124000000',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '124',
    },
    {
      transactionHash: '0x91fed188f3f3f94f4f00b376561644b1fd3eda11fbcd8d22e397813a2e7fa9c4',
      logIndex: '142',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0x6ac0bf4b95985636d6f9a5c5e28e611cf8004683',
      to: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
      value: '5000000000',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '5000',
    },
    {
      transactionHash: '0x161d8c3641b9e648905580f1288fb3e8935136652518eb71a1facdcd4765de3a',
      logIndex: '220',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0xcdec510974a17fcf3156efb104990de7f12cbcfe',
      to: '0x23ddd3e3692d1861ed57ede224608875809e127f',
      value: '16012489148',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '16012.489148',
    },
    {
      transactionHash: '0xaa22a7eef71898b7bf413cfb1941538afc2e7b874d092394c2efd2e6e81c8258',
      logIndex: '289',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0x7d6636635b7c00e59363b544ed518c6c18c2c8eb',
      to: '0x42261e4c83d41f86cd603513957bb26f9b4c9663',
      value: '7990000000',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '7990',
    },
    {
      transactionHash: '0x2b98a4b51c0860b6eb5a68d8a98c3ca402b8a12e55a8e6095d2ea071ce6aaff8',
      logIndex: '302',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      to: '0x1266faebc05d5c96e941a0d715228ba68efada86',
      value: '14053444',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '14.053444',
    },
  ],
  erc20Approvals: [
    {
      transactionHash: '0x560e6161c0d09bb265af281c6964e0316ef0c5357172eb375e6dba15c6b0e09e',
      logIndex: '95',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      owner: '0xcd231d4ba7b15a4722ac057419d9cd7689e7b8db',
      spender: '0x28cba71583e5f7149e59d59ee9294e204fa24741',
      value: '0',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '0',
    },
    {
      transactionHash: '0x91fed188f3f3f94f4f00b376561644b1fd3eda11fbcd8d22e397813a2e7fa9c4',
      logIndex: '140',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      owner: '0x6ac0bf4b95985636d6f9a5c5e28e611cf8004683',
      spender: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      value: '5000000000',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '5000',
    },
  ],
  nftApprovals: {
    ERC1155: [],
    ERC721: [],
  },
  nftTransfers: [],
  tag: 'Some Tag',
  streamId: 'ba3b3c52-3dd3-4eb7-a2b7-4b61d3439c5e',
  nativeBalances: [],
  nftTokenApprovals: [],
};

describe('LogsProcessor', () => {
  const processor = new LogsProcessor(new CollectionNameBuilder());

  it('processes correctly', () => {
    const updates = processor.process(batch);

    expect(updates.length).toEqual(13);

    const update0 = updates[0];
    expect(update0.collectionName).toEqual('SomeTag');
    expect(update0.document.name).toEqual('Transfer');
    expect(update0.document.chainId).toEqual(1);
    expect(update0.document['from']).toEqual('0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc');
    expect(update0.document['to']).toEqual('0x88ff79eb2bc5850f27315415da8685282c7610f9');
    expect(update0.document['value']).toEqual('1246846714');

    const update8 = updates[8];
    expect(update8.collectionName).toEqual('SomeTag');
    expect(update8.document.name).toEqual('Approval');
    expect(update0.document.chainId).toEqual(1);
    expect(update8.document['spender']).toEqual('0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45');
    expect(update8.document['owner']).toEqual('0x6ac0bf4b95985636d6f9a5c5e28e611cf8004683');
    expect(update8.document['value']).toEqual('5000000000');
  });

  it('returns empty array when no abi', () => {
    const batchWithNoAbi: IWebhook = Object.assign({}, batch, {
      abi: [],
    });

    const updates = processor.process(batchWithNoAbi);

    expect(updates.length).toEqual(0);
  });
});
