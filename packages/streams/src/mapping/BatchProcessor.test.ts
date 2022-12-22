import { IWebhook } from '@moralisweb3/streams-typings';
import { BatchProcessor } from './BatchProcessor';

describe('BatchProcessor', () => {
  const batch: IWebhook = {
    confirmed: true,
    chainId: '0x1',
    abi: [],
    streamId: 'c8269eb2-d279-4fbc-88ac-bfbc1762e329',
    tag: 'Simple test',
    retries: 0,
    block: {
      number: '16225618',
      hash: '0x93fd1cbdeeda4443926fc1a1ec8cd2485e7e0faedb9c5c1f9abb4899ff43ee5f',
      timestamp: '1671535823',
    },
    logs: [],
    txs: [],
    txsInternal: [],
    erc20Transfers: [],
    erc20Approvals: [],
    nftApprovals: {
      ERC721: [],
      ERC1155: [],
    },
    nftTokenApprovals: [],
    nftTransfers: [],
    nativeBalances: [],
  };

  it('creates an instance correctly and do not crash when process() method called', () => {
    const processor = BatchProcessor.create();

    const res = processor.process(batch);

    expect(res.erc20Approvals().length).toEqual(0);
    expect(res.erc20Transfers().length).toEqual(0);
    expect(res.internalTxs().length).toEqual(0);
    expect(res.logs().length).toEqual(0);
    expect(res.nftApprovals().length).toEqual(0);
    expect(res.nftTransfers().length).toEqual(0);
    expect(res.txs().length).toEqual(0);
  });
});
