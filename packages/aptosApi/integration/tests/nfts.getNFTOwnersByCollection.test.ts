import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('getNFTOwnersByCollection', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns nft owners', async () => {
    const response = await aptosApi.nfts.getNFTOwnersByCollection({
      collectionDataIdHash: 'bd1e7fef8fd8d3ff8351eb564541f43cdaeaff93bbefd4ed402af66e9d70bedc',
      limit: 2,
    });

    expect(response.cursor).toBeNull();
    expect(response.hasNextPage).toBe(false);
    expect(response.result.length).toBe(1);

    const item1 = response.result[0];
    expect(item1.amount.octas).toBe('100000000');
    expect(item1.collectionDataIdHash).toBe('bd1e7fef8fd8d3ff8351eb564541f43cdaeaff93bbefd4ed402af66e9d70bedc');
    expect(item1.collectionName).toBe('collName552');
    expect(item1.creatorAddress.address).toBe('0xe9fa81b90a846ab2737e88592a4e207e3f503bfac7e5774a4a4bc93b439258f0');
    expect(item1.lastTransactionTimestamp).toBe('2022-10-20T08:51:16.000Z');
    expect(item1.lastTransactionVersion).toBe('5563252');
    expect(item1.name).toBe('popitys');
    expect(item1.ownerAddress.address).toBe('0xe9fa81b90a846ab2737e88592a4e207e3f503bfac7e5774a4a4bc93b439258f0');
    expect(item1.propertyVersion).toBe('0');
    expect(item1.tableType).toBe('0x3::token::TokenStore');
    expect(item1.tokenDataIdHash).toBe('301304744b268b2a4ed57333cd8715a84d0f503543ba981d20e6df81d0f46a8b');
    expect(item1.tokenProperties).toMatchObject({});
  });
});
