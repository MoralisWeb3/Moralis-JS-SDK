import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../common/CollectionNameBuilder';
import { InternalTxsProcessor } from './InternalTxsProcessor';

describe('InternalTxsProcessor', () => {
  const batch: IWebhook = {
    confirmed: true,
    chainId: '0x1',
    abi: [],
    streamId: '554c0507-94a8-4c99-bce3-d99b04210801',
    tag: 'Uniswap Deployer',
    retries: 0,
    block: {
      number: '15766768',
      hash: '0x85eb63e4717089625c30fd50751fc79557c06c5d9d1185222150ce76ef3e7e52',
      timestamp: '1665996863',
    },
    logs: [],
    txs: [],
    txsInternal: [
      {
        from: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
        to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        value: '50000000000000000',
        gas: '607563',
        transactionHash: '0x84337d2d7aacd6324a9d1b2070099de10af84a8bf815864a38e8ce517fc82651',
      },
      {
        from: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
        to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        value: '180000000000000000',
        gas: '116327',
        transactionHash: '0x0ab569b93b477c0e944e3dff31b0e13a7161c723dcd79ca22c3d3c6287a3e4ab',
      },
      {
        from: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
        value: '9405305756444464',
        gas: '2300',
        transactionHash: '0x7fbc05b12369e364a827352cfd741a7ecd4cf655c21e6039de45aa8c03fc4548',
      },
    ],
    erc20Transfers: [],
    erc20Approvals: [],
    nftApprovals: {
      ERC1155: [],
      ERC721: [],
    },
    nftTransfers: [],
    nativeBalances: [],
    nftTokenApprovals: [],
  };

  it('processes correctly', () => {
    const processor = new InternalTxsProcessor(new CollectionNameBuilder());

    const updates = processor.process(batch);

    expect(updates.length).toEqual(3);
    expect(updates[0].collectionName).toEqual('UniswapDeployer');
  });
});
