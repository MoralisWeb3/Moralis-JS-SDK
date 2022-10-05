import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { StreamErc721ApprovalInput } from './types';
import { StreamErc721Approval } from './StreamErc721Approval';

const mockErc721Approval: StreamErc721ApprovalInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  logIndex: '0',
  tag: 'test-tag',
  owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  approved: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  tokenId: '123',
  tokenContractType: 'ERC721',
  tokenName: 'Stream',
  tokenSymbol: 'STREAMS',
};

describe('StreamErc721Approval', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  it('should create a new StreamErc721Approval succesfully', () => {
    const erc20Approval = StreamErc721Approval.create(mockErc721Approval, core);

    expect(erc20Approval.chain.decimal).toBe(1);
    expect(erc20Approval.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
    expect(erc20Approval.logIndex).toBe(0);
    expect(erc20Approval.tag).toBe('test-tag');
    expect(erc20Approval.owner.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
    expect(erc20Approval.approved).toBe(true);
    expect(erc20Approval.contract.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
    expect(erc20Approval.tokenId).toBe('123');
    expect(erc20Approval.tokenContractType).toBe('ERC721');
    expect(erc20Approval.tokenName).toBe('Stream');
    expect(erc20Approval.tokenSymbol).toBe('STREAMS');
  });

  it('should parse the values to JSON correctly', () => {
    const erc20Approval = StreamErc721Approval.create(mockErc721Approval, core);

    expect(erc20Approval.toJSON()).toStrictEqual({
      approved: true,
      chain: '0x1',
      contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      logIndex: 0,
      owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
      tag: 'test-tag',
      tokenContractType: 'ERC721',
      tokenId: '123',
      tokenName: 'Stream',
      tokenSymbol: 'STREAMS',
      transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
    });
  });

  it('should parse the values to a JSON on format() correctly', () => {
    const erc20Approval = StreamErc721Approval.create(mockErc721Approval, core);

    expect(erc20Approval.toJSON()).toStrictEqual({
      approved: true,
      chain: '0x1',
      contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      logIndex: 0,
      owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
      tag: 'test-tag',
      tokenContractType: 'ERC721',
      tokenId: '123',
      tokenName: 'Stream',
      tokenSymbol: 'STREAMS',
      transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
    });
  });
});
