import { LogDocumentBuilder } from './LogDocumentBuilder';
import { BigNumber } from '@ethersproject/bignumber';
import { Block, Log } from '@moralisweb3/streams-typings';
import { ParsedLog } from './LogParser';

describe('LogDocumentBuilder', () => {
  it('builds row correctly', () => {
    const log: Log = {
      logIndex: '56',
      transactionHash: '0xb8f5496884cc69154cc38d133b6ace6923f9430e829e2f2cd1bc07bde9306388',
      address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
      data: '0x0000000000000000000000000000000000000000000edd1be4934b422c1c0000',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x0000000000000000000000006d17cc023df5156efbc726946ce5d04fe484ef39',
      topic2: '0x00000000000000000000000034189c75cbb13bdb4f5953cda6c3045cfca84a9e',
      topic3: null,
    };
    const parsedLog: ParsedLog = {
      name: 'Transfer',
      params: {
        from: {
          value: '0x6D17CC023Df5156EFBC726946cE5d04fE484eF39',
          type: 'address',
        },
        to: {
          value: '0x34189c75Cbb13Bdb4F5953CDa6c3045CFcA84a9e',
          type: 'address',
        },
        value: {
          value: BigNumber.from('0x0edd1be4934b422c1c0000'),
          type: 'uint256',
        },
      },
    };
    const block: Block = {
      number: '15631019',
      hash: '0x76f9e7f08bc0c4f0621fc12af6730352578a8f980a06baffda8615235574fc75',
      timestamp: '1664358227',
    };

    const doc = LogDocumentBuilder.build(log, parsedLog, block, true, '0x1');

    expect(doc.id).toBe('0x16b85919120eab4e52fb2d23d71a389ce6fdbd57016600d24033c8d00e9bd5a9');
    expect(doc.address).toBe('0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce');
    expect(doc.blockHash).toBe('0x76f9e7f08bc0c4f0621fc12af6730352578a8f980a06baffda8615235574fc75');
    expect(doc.blockNumber).toBe(15631019);
    expect(doc.blockTimestamp).toBe(1664358227);
    expect(doc.confirmed).toBe(true);
    expect(doc.logIndex).toBe(56);
    expect(doc.name).toBe('Transfer');
    expect(doc.chainId).toBe(1);
    expect(doc['from']).toBe('0x6d17cc023df5156efbc726946ce5d04fe484ef39');
    expect(doc['to']).toBe('0x34189c75cbb13bdb4f5953cda6c3045cfca84a9e');
    expect(doc['value']).toBe('17969119000000000000000000');
  });
});
