import { Block, INFTTransfer } from '@moralisweb3/streams-typings';
import { NftTransferDocumentBuilder } from './NftTransferDocumentBuilder';

describe('NftTransferDocumentBuilder', () => {
  it('builds correctly', () => {
    const transfer: INFTTransfer = {
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
    };
    const block: Block = {
      number: '16225662',
      hash: '0x36a8359fa2eaff57364158247dff17d80c053096ad9c54d1c27f4768974f552b',
      timestamp: '1671536351',
    };

    const doc = NftTransferDocumentBuilder.build(transfer, block, false, '0x20');

    expect(doc).toBeDefined();
    expect(doc.id).toBe('0xd84181ba9678a7d408354a2524e896363ae0ff47aa95599739772ba0088b6156');
    expect(doc.transactionHash).toBe('0x8b7ed07563c2e679b9b49e2e0b62d1fe8a37c2f6c6d43a6ed072d1fc9ac15a22');
    expect(doc.contract).toBe('0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d');
    expect(doc.logIndex).toBe('362');
    expect(doc.operator).toBe(null);
    expect(doc.from).toBe('0x0a1ad77312d36459179ad622c2a8a6280cc79419');
    expect(doc.to).toBe('0xc5b4ffe6e645fa7ae5c8bb061870907e5f314c14');
    expect(doc.tokenId).toBe('2947');
    expect(doc.amount).toBe('1');
    expect(doc.tokenContractType).toBe('ERC721');
    expect(doc.tokenName).toBe('BoredApeYachtClub');
    expect(doc.tokenSymbol).toBe('BAYC');
    expect(doc.blockHash).toBe('0x36a8359fa2eaff57364158247dff17d80c053096ad9c54d1c27f4768974f552b');
    expect(doc.blockTimestamp).toBe(1671536351);
    expect(doc.blockNumber).toBe(16225662);
    expect(doc.confirmed).toBe(false);
    expect(doc.chainId).toBe(32);
  });
});
