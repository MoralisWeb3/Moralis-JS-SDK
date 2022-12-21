import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../common/CollectionNameBuilder';
import { NftTransfersProcessor } from './NftTransfersProcessor';

describe('NftTransfersProcessor', () => {
  const batch: IWebhook = {
    confirmed: false,
    chainId: '0x1',
    abi: [],
    streamId: '6c86e9ed-0a93-4f8f-af4d-929ee8918bbb',
    tag: 'Ape Club',
    retries: 0,
    block: {
      number: '16225662',
      hash: '0x36a8359fa2eaff57364158247dff17d80c053096ad9c54d1c27f4768974f552b',
      timestamp: '1671536351',
    },
    logs: [],
    txs: [],
    txsInternal: [],
    erc20Transfers: [],
    erc20Approvals: [],
    nftTokenApprovals: [],
    nftApprovals: {
      ERC721: [],
      ERC1155: [],
    },
    nftTransfers: [
      {
        operator: null,
        from: '0x0a1ad77312d36459179ad622c2a8a6280cc79419',
        to: '0xc5b4ffe6e645fa7ae5c8bb061870907e5f314c14',
        tokenId: '2947',
        amount: '1',
        transactionHash: '0x8b7ed07563c2e679b9b49e2e0b62d1fe8a37c2f6c6d43a6ed072d1fc9ac15a22',
        logIndex: '362',
        contract: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
        tokenName: 'BoredApeYachtClub',
        tokenSymbol: 'BAYC',
        tokenContractType: 'ERC721',
      },
    ],
    nativeBalances: [],
  };

  it('processes correctly', () => {
    const processor = new NftTransfersProcessor(new CollectionNameBuilder());

    const updates = processor.process(batch);

    expect(updates.length).toEqual(1);
    expect(updates[0].collectionName).toEqual('ApeClub');
  });
});
