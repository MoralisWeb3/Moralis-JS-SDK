import { Block, Transaction } from '@moralisweb3/streams-typings';
import { TxDocumentBuilder } from './TxDocumentBuilder';

describe('TxDocumentBuilder', () => {
  it('builds correctly', () => {
    const tx: Transaction = {
      hash: '0x91e4046c7768132aa614c6e0d4773b8cd20cee1948b2508e570d3ce630415588',
      gas: '207128',
      gasPrice: '8652938136',
      nonce: '4262103',
      input: '0x',
      transactionIndex: '75',
      fromAddress: '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
      toAddress: '0xc2bacad6632903dc03e190bf33a6e8c7ea0881c1',
      value: '10000000000000000',
      type: '2',
      v: '0',
      r: '8522664046905990578164143534491536109331129839629903737002530670138249739539',
      s: '48306749826871999834738509867081969620532520428036344972909508655681719515828',
      receiptCumulativeGasUsed: '6692052',
      receiptGasUsed: '21000',
      receiptContractAddress: null,
      receiptRoot: null,
      receiptStatus: '1',
    };
    const block: Block = {
      number: '15666916',
      hash: '0x1af899d66c7847ba6d1faa4d9ca1b37e4f337232662a8e60163a6718a234d9ff',
      timestamp: '1664791547',
    };

    const doc = TxDocumentBuilder.build(tx, block, false, '0x100');

    expect(doc).toBeDefined();
    expect(doc.id).toBe('0xd5c8346479d45c9ddb2bceed5ba23e44b5f10676494542b7b494401f78c295d4');
    expect(doc.hash).toBe('0x91e4046c7768132aa614c6e0d4773b8cd20cee1948b2508e570d3ce630415588');
    expect(doc.chainId).toBe(256);
    expect(doc.transactionIndex).toBe(75);
    expect(doc.gas).toBe(207128);
    expect(doc.gasPrice).toBe(8652938136);
    expect(doc.nonce).toBe(4262103);
    expect(doc.fromAddress).toBe('0xdfd5293d8e347dfe59e90efd55b2956a1343963d');
    expect(doc.toAddress).toBe('0xc2bacad6632903dc03e190bf33a6e8c7ea0881c1');
    expect(doc.value).toBe('10000000000000000');
    expect(doc.input).toBe('0x');
    expect(doc.type).toBe(2);
    expect(doc.receiptStatus).toBe(1);
    expect(doc.receiptGasUsed).toBe(21000);
    expect(doc.receiptCumulativeGasUsed).toBe(6692052);
    expect(doc.blockHash).toBe('0x1af899d66c7847ba6d1faa4d9ca1b37e4f337232662a8e60163a6718a234d9ff');
    expect(doc.blockTimestamp).toBe(1664791547);
    expect(doc.blockNumber).toBe(15666916);
    expect(doc.confirmed).toBe(false);
    expect(doc.triggers).toBeUndefined();
  });
});
