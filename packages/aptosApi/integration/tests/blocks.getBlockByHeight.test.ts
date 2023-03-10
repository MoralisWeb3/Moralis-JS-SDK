import { AptosBlockMetadataTransaction, AptosWriteResourceChange } from '@moralisweb3/common-aptos-utils';
import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('getBlockByHeight', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns an info', async () => {
    const response = await aptosApi.blocks.getBlockByHeight({
      blockHeight: 499540,
      withTransactions: true,
    });

    expect(response.blockHeight).toBe('499540');
    expect(response.blockHash).toBe('0x5a5f8cd83acd6248c90108e5f21fc60b9efca44890aac91d66da02c03913ac9b');
    expect(response.blockTimestamp).toBe('1665858020377412');
    expect(response.firstVersion).toBe('999999');
    expect(response.lastVersion).toBe('1000000');

    expect(response.transactions).toHaveLength(2);

    const tx1 = response.transactions![0] as AptosBlockMetadataTransaction;

    expect(AptosBlockMetadataTransaction.isInput(tx1)).toBe(true);
    expect(tx1.hash).toBe('0xa64930fb0e18d93bd9183d262457cf0d7c27b52ca01d02fb8d736812b9e7454d');
    expect(tx1.type).toBe('block_metadata_transaction');
    expect(tx1.proposer.address).toBe('0xc29a231581f243ddcbf97de8b93c8aabb466dd6912ce5ba12579ff2f13cb8da5');
    expect(tx1.timestamp).toBe('1665858020377412');
    expect(tx1.epoch).toBe('36');
    expect(tx1.round).toBe('6952');
    expect(tx1.id).toBe('0x5a5f8cd83acd6248c90108e5f21fc60b9efca44890aac91d66da02c03913ac9b');
    expect(tx1.changes).toHaveLength(3);
    expect(tx1.events).toHaveLength(1);

    const event = tx1.events[0];
    expect(event.guid.accountAddress.address).toBe(
      '0x0000000000000000000000000000000000000000000000000000000000000001',
    );
    expect(event.guid.creationNumber).toBe('3');
    expect(event.sequenceNumber).toBe('499540');
    expect(event.type).toBe('0x1::block::NewBlockEvent');
    expect(event.data).toBeDefined();

    const change1 = tx1.changes[0] as AptosWriteResourceChange;
    expect(AptosWriteResourceChange.isInput(change1)).toBe(true);
    expect(change1.address.address).toBe('0x0000000000000000000000000000000000000000000000000000000000000001');
    expect(change1.stateKeyHash).toBe('0x5ddf404c60e96e9485beafcabb95609fed8e38e941a725cae4dcec8296fb32d7');
    expect(change1.type).toBe('write_resource');
    expect(change1.address.address).toBe('0x0000000000000000000000000000000000000000000000000000000000000001');
    expect(change1.stateKeyHash).toBe('0x5ddf404c60e96e9485beafcabb95609fed8e38e941a725cae4dcec8296fb32d7');
    expect(change1.data.type).toBe('0x1::block::BlockResource');
    expect(change1.data.data).toBeDefined();

    const change2 = tx1.changes[1];
    expect(AptosWriteResourceChange.isInput(change2)).toBe(true);

    const change3 = tx1.changes[2];
    expect(AptosWriteResourceChange.isInput(change3)).toBe(true);
  });
});
