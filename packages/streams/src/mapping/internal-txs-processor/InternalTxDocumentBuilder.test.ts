import { Block, InternalTransaction } from '@moralisweb3/streams-typings';
import { InternalTxDocumentBuilder } from './InternalTxDocumentBuilder';

describe('TxDocumentBuilder', () => {
  it('builds correctly', () => {
    const internalTx: InternalTransaction = {
      from: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      to: '0xd5cd71b64657d77e8e31b95f50a7950f647671ef',
      value: '3687039609867276',
      gas: '22202',
      transactionHash: '0xa9a129f20710ea9d8b11e87a2e68c3682eabf5690aa1d1881d8ac8acd044aa87',
    };
    const block: Block = {
      number: '15766768',
      hash: '0x85eb63e4717089625c30fd50751fc79557c06c5d9d1185222150ce76ef3e7e52',
      timestamp: '1665996863',
    };

    const doc = InternalTxDocumentBuilder.build(internalTx, block, false, '0x20');

    expect(doc).toBeDefined();
    expect(doc.id).toBe('0x51cce9e0ed5373ec3bb3dc7c8bb381e76896f5606cef161745da6554d2a3944d');
    expect(doc.hash).toBe('0xa9a129f20710ea9d8b11e87a2e68c3682eabf5690aa1d1881d8ac8acd044aa87');
    expect(doc.chainId).toBe(32);
    expect(doc.from).toBe('0x7a250d5630b4cf539739df2c5dacb4c659f2488d');
    expect(doc.to).toBe('0xd5cd71b64657d77e8e31b95f50a7950f647671ef');
    expect(doc.value).toBe('3687039609867276');
    expect(doc.gas).toBe(22202);
    expect(doc.blockHash).toBe('0x85eb63e4717089625c30fd50751fc79557c06c5d9d1185222150ce76ef3e7e52');
    expect(doc.blockNumber).toBe(15766768);
    expect(doc.blockTimestamp).toBe(1665996863);
    expect(doc.confirmed).toBe(false);
  });
});
