import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../common/CollectionNameBuilder';
import { Erc20ApprovalsProcessor } from './Erc20ApprovalsProcessor';

describe('Erc20ApprovalsProcessor', () => {
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
    erc20Transfers: [],
    erc20Approvals: [
      {
        transactionHash: '0xf2e553a1942d07a2fbf187525cd108c0f977a99acf703573830b90af9b06a10b',
        logIndex: '152',
        contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        owner: '0xb5ef4d598fc62dfe154efbcafcb25d9c9db90e8c',
        spender: '0xc92e8bdf79f0507f65a392b0ab4667716bfe0110',
        value: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        tokenName: 'USD Coin',
        tokenSymbol: 'USDC',
        tokenDecimals: '6',
        valueWithDecimals: '1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+71',
      },
    ],
    nftApprovals: {
      ERC721: [],
      ERC1155: [],
    },
    nftTokenApprovals: [],
    nftTransfers: [],
    nativeBalances: [],
  };

  it('processes correctly', () => {
    const processor = new Erc20ApprovalsProcessor(new CollectionNameBuilder());

    const updates = processor.process(batch);

    expect(updates.length).toEqual(1);
    expect(updates[0].collectionName).toEqual('UsdcTransfers');
  });
});
