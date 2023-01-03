import { Block, INFTApproval } from '@moralisweb3/streams-typings';
import { NftApprovalDocumentBuilder } from './NftApprovalDocumentBuilder';

describe('NftApprovalDocumentBuilder', () => {
  it('builds correctly', () => {
    const approval: INFTApproval = {
      transactionHash: '0x839606e97ec0e0bae7ff0ad60ebc8ff2bcbfde4653f0164cefdd00b2a871989e',
      logIndex: '133',
      contract: '0x495f947276749ce646f68ac8c248420045cb7b5e',
      account: '0xe2ef9190bd7327178a6ef875440f85b403dfb2b8',
      operator: '0x1e0049783f008a0085193e00003d00cd54003c71',
      approvedAll: true,
      tokenId: null,
      tokenName: 'OpenSea Shared Storefront',
      tokenSymbol: 'OPENSTORE',
      tokenContractType: 'ERC1155',
    };
    const block: Block = {
      number: '16225720',
      hash: '0x03b784499c2e3b74fa5a10a88c28dc221673f05f487d7f9d27d6dfd91512e51b',
      timestamp: '1671537047',
    };

    const doc = NftApprovalDocumentBuilder.build(approval, block, true, '0x5');

    expect(doc).toBeDefined();
    expect(doc.id).toBe('0xfea15675b08e1760d6cc1c4b6316b25452a19526cbe59f8c34a1dc502c30da5d');
    expect(doc.transactionHash).toBe('0x839606e97ec0e0bae7ff0ad60ebc8ff2bcbfde4653f0164cefdd00b2a871989e');
    expect(doc.contract).toBe('0x495f947276749ce646f68ac8c248420045cb7b5e');
    expect(doc.logIndex).toBe('133');

    expect(doc.operator).toBe('0x1e0049783f008a0085193e00003d00cd54003c71');
    expect(doc.account).toBe('0xe2ef9190bd7327178a6ef875440f85b403dfb2b8');
    expect(doc.approvedAll).toBe(true);
    expect(doc.tokenId).toBe(null);

    expect(doc.tokenContractType).toBe('ERC1155');
    expect(doc.tokenName).toBe('OpenSea Shared Storefront');
    expect(doc.tokenSymbol).toBe('OPENSTORE');

    expect(doc.blockHash).toBe('0x03b784499c2e3b74fa5a10a88c28dc221673f05f487d7f9d27d6dfd91512e51b');
    expect(doc.blockTimestamp).toBe(1671537047);
    expect(doc.blockNumber).toBe(16225720);
    expect(doc.confirmed).toBe(true);
    expect(doc.chainId).toBe(5);
  });
});
