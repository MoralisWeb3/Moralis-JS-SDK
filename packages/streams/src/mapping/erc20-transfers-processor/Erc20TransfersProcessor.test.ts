import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../common/CollectionNameBuilder';
import { Erc20TransfersProcessor } from './Erc20TransfersProcessor';

describe('Erc20TransfersProcessor', () => {
  const batch: IWebhook = {
    confirmed: true,
    chainId: '0x1',
    abi: [],
    streamId: 'c8269eb2-d279-4fbc-88ac-bfbc1762e329',
    tag: 'USDC Transfers',
    retries: 0,
    block: {
      number: '16225618',
      hash: '0x93fd1cbdeeda4443926fc1a1ec8cd2485e7e0faedb9c5c1f9abb4899ff43ee5f',
      timestamp: '1671535823',
    },
    logs: [],
    txs: [],
    txsInternal: [],
    erc20Transfers: [
      {
        transactionHash: '0x05efbdf28b473564c8dc3741c6fe74ba6c66f7c892e2af1e86d03bbc159c4bfd',
        logIndex: '27',
        contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0x3a5cc8689d1b0cef2c317bc5c0ad6ce88b27d597',
        to: '0x376b325655a63ee1ea8530f48d68e99bad5796a8',
        value: '7166502282',
        tokenName: 'USD Coin',
        tokenSymbol: 'USDC',
        tokenDecimals: '6',
        valueWithDecimals: '7166.502282',
      },
      {
        transactionHash: '0x0ad848a2031fa60c1d9321395b3e2517630ee7cd20e08b84e70cad6fbef977e8',
        logIndex: '98',
        contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0xfa103c21ea2df71dfb92b0652f8b1d795e51cdef',
        to: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        value: '326091230000',
        tokenName: 'USD Coin',
        tokenSymbol: 'USDC',
        tokenDecimals: '6',
        valueWithDecimals: '326091.23',
      },
    ],
    erc20Approvals: [],
    nftApprovals: {
      ERC721: [],
      ERC1155: [],
    },
    nftTransfers: [],
    nftTokenApprovals: [],
    nativeBalances: [],
  };

  it('processes correctly', () => {
    const processor = new Erc20TransfersProcessor(new CollectionNameBuilder());

    const updates = processor.process(batch);

    expect(updates.length).toEqual(2);
    expect(updates[0].collectionName).toEqual('UsdcTransfers');
  });
});
