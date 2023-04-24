import { GetAddressesAptosResponseAdapter, GetAddressesEvmResponseAdapter } from '@moralisweb3/common-streams-utils';
import { Streams } from '../../src/Streams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Get stream addresses', () => {
  let StreamApi: Streams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  describe('aptos', () => {
    it('should return an array with no results successfully ', async () => {
      const result = (await StreamApi.getAddresses({
        networkType: 'aptos',
        id: 'VALID_RESPONSE_0',
        limit: 5,
      })) as GetAddressesAptosResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result.total).toEqual(0);
      expect(result.result.result.length).toEqual(0);
      expect(result.toJSON().result).toStrictEqual([]);
    });

    it('should return an array with 1 result successfully ', async () => {
      const result = (await StreamApi.getAddresses({
        networkType: 'aptos',
        id: 'VALID_RESPONSE_1',
        limit: 5,
      })) as GetAddressesAptosResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result.total).toEqual(1);
      expect(result.result.result.length).toEqual(1);
      expect(result.result.result[0].address).toEqual(
        '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
      );
    });

    it('should return an array with 2 results successfully ', async () => {
      const result = (await StreamApi.getAddresses({
        networkType: 'aptos',
        id: 'VALID_RESPONSE_2',
        limit: 5,
      })) as GetAddressesAptosResponseAdapter;

      expect(result.result).toBeDefined();
      expect(result.result.total).toEqual(2);
      expect(result.result.result.length).toEqual(2);
      expect(result.result.result[0].address).toEqual(
        '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
      );
      expect(result.result.result[1].address).toEqual(
        '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c',
      );
    });

    it('should throw a 404 Error on invalid streamId ', async () => {
      expect(
        StreamApi.getAddresses({
          networkType: 'aptos',
          id: 'STREAM_NOT_FOUND',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Stream not found');
    });
  });

  describe('evm', () => {
    it('should return an array with no results succesfully ', async () => {
      const result = (await StreamApi.getAddresses({
        networkType: 'evm',
        id: 'VALID_RESPONSE_0',
      })) as GetAddressesEvmResponseAdapter;

      expect(result.result).toBeDefined();
      expect(result.pagination.total).toEqual(0);
      expect(result.result.length).toEqual(0);
      expect(result.toJSON().result).toStrictEqual([]);
    });

    it('should default to evm networkType', async () => {
      const result = (await StreamApi.getAddresses({
        id: 'VALID_RESPONSE_0',
      })) as GetAddressesEvmResponseAdapter;

      expect(result.result).toBeDefined();
      expect(result.pagination.total).toEqual(0);
      expect(result.result.length).toEqual(0);
      expect(result.toJSON().result).toStrictEqual([]);
    });

    it('should return an array with 1 result succesfully ', async () => {
      const result = (await StreamApi.getAddresses({
        networkType: 'evm',
        id: 'VALID_RESPONSE_1',
      })) as GetAddressesEvmResponseAdapter;

      expect(result.result).toBeDefined();
      expect(result.pagination.total).toEqual(1);
      expect(result.result.length).toEqual(1);
      expect(result.result[0].address?.lowercase).toEqual('0x992eccc191d6f74e8be187ed6b6ac196b08314f7');
    });

    it('should return an array with 2 results succesfully ', async () => {
      const result = (await StreamApi.getAddresses({
        networkType: 'evm',
        id: 'VALID_RESPONSE_2',
      })) as GetAddressesEvmResponseAdapter;

      expect(result.result).toBeDefined();
      expect(result.pagination.total).toEqual(2);
      expect(result.result.length).toEqual(2);
      expect(result.result[0].address?.lowercase).toEqual('0x295522b61890c3672d12efbff4358a6411ce996f');
      expect(result.result[1].address?.lowercase).toEqual('0x992eccc191d6f74e8be187ed6b6ac196b08314f7');
    });

    it('should return a cursor on paginated results ', async () => {
      const result = (await StreamApi.getAddresses({
        networkType: 'evm',
        id: 'VALID_RESPONSE_CURSOR',
      })) as GetAddressesEvmResponseAdapter;

      expect(result.result).toBeDefined();
      expect(result.pagination.total).toEqual(2);
      expect(result.result.length).toEqual(1);
      expect(result.pagination.cursor).toEqual(
        'cd07aa2328b9243d6dacfb10433184ab3d36a89f97b516dd09cbb803f5039adb0032d0dfe8132aa51e1c1112c505aeaa',
      );
    });

    it('should throw a 404 Error on invalid streamId ', async () => {
      expect(
        StreamApi.getAddresses({
          networkType: 'evm',
          id: 'STREAM_NOT_FOUND',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Stream not found');
    });
  });
});
