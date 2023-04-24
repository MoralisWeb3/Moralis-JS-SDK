import Core from '@moralisweb3/common-core';
import { setupStreamsUtils } from '../../test/setup';
import { StreamEvmNftTokenApproval } from './StreamEvmNftTokenApproval';

describe('StreamEvmNftTokenApproval', () => {
  let core: Core;

  beforeAll(() => {
    core = setupStreamsUtils();
  });

  it('should return correct values for all getters', () => {
    const approval = StreamEvmNftTokenApproval.create(
      {
        chain: '0x22',
        transactionHash: '0x8b7ed07563c2e679b9b49e2e0b62d1fe8a37c2f6c6d43a6ed072d1fc9ac15a22',
        logIndex: '361',
        contract: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
        account: '0x0a1ad77312d36459179ad622c2a8a6280cc79419',
        operator: '0x0000000000000000000000000000000000000000',
        approvedAll: false,
        tokenId: '2947',
        tokenName: 'BoredApeYachtClub',
        tokenSymbol: 'BAYC',
        tokenContractType: 'ERC721',
      },
      core,
    );

    expect(approval.chain.decimal).toBe(0x22);
    expect(approval.transactionHash).toBe('0x8b7ed07563c2e679b9b49e2e0b62d1fe8a37c2f6c6d43a6ed072d1fc9ac15a22');
    expect(approval.logIndex).toBe('361');
    expect(approval.contract).toBe('0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d');
    expect(approval.account).toBe('0x0a1ad77312d36459179ad622c2a8a6280cc79419');
    expect(approval.operator).toBe('0x0000000000000000000000000000000000000000');
    expect(approval.approvedAll).toBe(false);
    expect(approval.tokenId).toBe('2947');
    expect(approval.tokenName).toBe('BoredApeYachtClub');
    expect(approval.tokenSymbol).toBe('BAYC');
    expect(approval.tokenContractType).toBe('ERC721');
  });
});
