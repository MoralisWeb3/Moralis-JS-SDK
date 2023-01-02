import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../common/CollectionNameBuilder';
import { TxsProcessor } from './TxsProcessor';

const batch: IWebhook = {
  confirmed: false,
  chainId: '0x1',
  abi: [],
  retries: 0,
  block: {
    number: '15696081',
    hash: '0x9c3932399ae5b425e81c16b61cd527d6300082a9c8e4c276db3081460b5e646f',
    timestamp: '1665143927',
  },
  logs: [],
  txs: [
    {
      hash: '0xb94e25c6907c753fcd046ba36b95cd9eec15a4843607c3ff87f45b98c5293645',
      gas: '207128',
      gasPrice: '7288122076',
      nonce: '4289830',
      input:
        '0xa9059cbb000000000000000000000000ad98dec1d73c09a12b81c16dedd90c0a8a03682800000000000000000000000000000000000000000000003c4fa4cb806161c000',
      transactionIndex: '38',
      fromAddress: '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
      toAddress: '0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206',
      value: '0',
      type: '2',
      v: '1',
      r: '64538019474906420811295350502897238449661938464225305515979147407366116831170',
      s: '10718135606581849754509921163526511868200012476577348382484516618973216691114',
      receiptCumulativeGasUsed: '2632519',
      receiptGasUsed: '52487',
      receiptContractAddress: null,
      receiptRoot: null,
      receiptStatus: '1',
    },
    {
      hash: '0x016f82df5bb05188fe00e5e9b11b68a830898b4a5403671ae79fd049f19483a6',
      gas: '207128',
      gasPrice: '7288122076',
      nonce: '4289831',
      input:
        '0xa9059cbb0000000000000000000000003c77eae09ffd1f3fe857a2c8fa4a36ddcba3e755000000000000000000000000000000000000000000000000000000000362b300',
      transactionIndex: '41',
      fromAddress: '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
      toAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      value: '0',
      type: '2',
      v: '1',
      r: '18561203549462965384619437500420904478230644993644522205793218440961750463538',
      s: '26339235603347869000913182429117335400121947312504648590472646624428804989463',
      receiptCumulativeGasUsed: '2779925',
      receiptGasUsed: '63197',
      receiptContractAddress: null,
      receiptRoot: null,
      receiptStatus: '1',
    },
    {
      hash: '0xf5db9667a130cefed66c2617ef6e36bbebeec22fb5dc489188dd6d630eae520d',
      gas: '207128',
      gasPrice: '7288122076',
      nonce: '4289832',
      input: '0x',
      transactionIndex: '45',
      fromAddress: '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
      toAddress: '0x225e5444f67aea8eef93a49046a2a813f75c37e6',
      value: '71348490000000000',
      type: '2',
      v: '0',
      r: '77968559538229211287527738410611582872919079253133065181840806520047253155548',
      s: '30953370743478203461278091867739471110266432453462233258707690109034018562240',
      receiptCumulativeGasUsed: '2894449',
      receiptGasUsed: '21000',
      receiptContractAddress: null,
      receiptRoot: null,
      receiptStatus: '1',
    },
    {
      hash: '0x849572d6a1cad43061894e38b60b410108e7beb809358200befc75668c7278d5',
      gas: '207128',
      gasPrice: '7288122076',
      nonce: '4289833',
      input:
        '0xa9059cbb00000000000000000000000021d01291867fc0f0b9a3fde458b8cf4adcb245960000000000000000000000000000000000000000000010692b696884e5121c00',
      transactionIndex: '47',
      fromAddress: '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
      toAddress: '0x7420b4b9a0110cdc71fb720908340c03f9bc03ec',
      value: '0',
      type: '2',
      v: '0',
      r: '13669456909385815475383308339656995316617376836527050720134288100409117781602',
      s: '47620834695764436165872449721956560965570145671771472844801055415916529176252',
      receiptCumulativeGasUsed: '2992398',
      receiptGasUsed: '51864',
      receiptContractAddress: null,
      receiptRoot: null,
      receiptStatus: '1',
    },
  ],
  txsInternal: [],
  erc20Transfers: [],
  erc20Approvals: [],
  nftApprovals: {
    ERC1155: [],
    ERC721: [],
  },
  nativeBalances: [],
  nftTokenApprovals: [],
  nftTransfers: [],
  tag: 'Transaction',
  streamId: 'ba3b3c52-3dd3-4eb7-a2b7-4b61d3439c5e',
};

describe('TxsProcessor', () => {
  it('builds correctly', () => {
    const processor = new TxsProcessor(new CollectionNameBuilder());

    const updates = processor.process(batch);

    expect(updates.length).toBe(4);
    expect(updates[0].collectionName).toBe('Transaction');
  });
});
