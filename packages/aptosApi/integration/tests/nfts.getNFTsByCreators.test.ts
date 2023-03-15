import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';
import { AptosAddress } from '@moralisweb3/common-aptos-utils';

describe('getNFTsByCreators', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns nfts', async () => {
    const response = await aptosApi.nfts.getNFTsByCreators({
      creatorAddresses: [AptosAddress.create('0xe9fa81b90a846ab2737e88592a4e207e3f503bfac7e5774a4a4bc93b439258f0')],
      limit: 2,
    });

    expect(response.cursor).toBeDefined();
    expect(response.hasNextPage).toBe(true);
    expect(response.result.length).toBe(2);

    const item1 = response.result[0];
    expect(item1.collectionDataIdHash).toBe('bd1e7fef8fd8d3ff8351eb564541f43cdaeaff93bbefd4ed402af66e9d70bedc');
    expect(item1.collectionName).toBe('collName552');
    expect(item1.creatorAddress.address).toBe('0xe9fa81b90a846ab2737e88592a4e207e3f503bfac7e5774a4a4bc93b439258f0');
    expect(item1.description).toBe('brawlstars');
    expect(item1.descriptionMutable).toBe(false);
    expect(item1.largestPropertyVersion).toBe('0');
    expect(item1.lastTransactionTimestamp).toBe('2022-10-20T08:51:16.000Z');
    expect(item1.lastTransactionVersion).toBe('5563252');
    expect(item1.maximum).toBe('9007199254740991');
    expect(item1.maximumMutable).toBe(false);
    expect(item1.metadataUri).toBe('https://i.postimg.cc/C1CdcRcL/B8-AE2-EBE-7-B60-46-C4-A96-E-958-D9159-D15-A.jpg');
    expect(item1.name).toBe('popitys');
    expect(item1.payeeAddress.address).toBe('0xe9fa81b90a846ab2737e88592a4e207e3f503bfac7e5774a4a4bc93b439258f0');
    expect(item1.propertiesMutable).toBe(false);
    expect(item1.royaltyMutable).toBe(false);
    expect(item1.royaltyPointsDenominator).toBe('0');
    expect(item1.royaltyPointsNumerator).toBe('0');
    expect(item1.supply).toBe('1');
    expect(item1.tokenDataIdHash).toBe('301304744b268b2a4ed57333cd8715a84d0f503543ba981d20e6df81d0f46a8b');
    expect(item1.uriMutable).toBe(false);
  });
});
