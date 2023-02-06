import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('Moralis AptosApi', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns collection', async () => {
    const response = await aptosApi.nFTCollections.getNFTCollections({
      limit: 1,
    });

    expect(response.cursor).toBeDefined();
    expect(response.hasNextPage).toBe(true);
    expect(response.result.length).toBe(1);

    const item1 = response.result[0];
    expect(item1.collectionDataIdHash).toBe('f5220e2d492bfce726c26086e7ba6948a4604fa22af736df1705d49937fe0114');
    expect(item1.collectionName).toBe('Lorem ipsum');
    expect(item1.creatorAddress.address).toBe('0xe9fa81b90a846ab2737e88592a4e207e3f503bfac7e5774a4a4bc93b439258f0');
    expect(item1.description).toBe('Sit dolor');
    expect(item1.descriptionMutable).toBe(false);
    expect(item1.lastTransactionTimestamp).toBe('2022-10-20T19:54:07.000Z');
    expect(item1.lastTransactionVersion).toBe('6369344');
    expect(item1.maximum).toBe('9007199254740991');
    expect(item1.maximumMutable).toBe(false);
    expect(item1.metadataUri).toBe('');
    expect(item1.supply).toBe('0');
    expect(item1.tableHandle).toBe('0x691434926a0e9c9b0265bc86de879316f794f705e35786622b9ef73aee4258c0');
    expect(item1.uriMutable).toBe(false);
  });
});
