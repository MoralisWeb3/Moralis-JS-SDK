import { DeleteAddressAptosResponseAdapter, DeleteAddressEvmResponseAdapter } from '@moralisweb3/common-streams-utils';
import { Streams } from '../../src/Streams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Delete stream address', () => {
  let StreamApi: Streams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  describe('aptos', () => {
    it('should delete an address succesfully ', async () => {
      const result = (await StreamApi.deleteAddress({
        networkType: 'aptos',
        address: '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
        id: 'VALID_RESPONSE',
      })) as DeleteAddressAptosResponseAdapter;

      expect(result).toBeDefined();
      expect(result.toJSON().address).toEqual('0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b');
      expect(result.result.streamId).toEqual('VALID_RESPONSE');
    });

    it('should throw a 400 Error on invalid address ', async () => {
      expect(
        StreamApi.deleteAddress({
          networkType: 'aptos',
          address: 'some-address',
          id: 'INVALID_ADDRESS',
        }),
      ).rejects.toThrowError('C0005] Invalid address provided');
    });

    it('should throw a 404 Error on unknown address ', async () => {
      expect(
        StreamApi.deleteAddress({
          networkType: 'aptos',
          address: '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c',
          id: 'ADDRESS_NOT_FOUND',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Address not found');
    });

    it('should throw a 404 Error on invalid streamId ', async () => {
      expect(
        StreamApi.deleteAddress({
          networkType: 'aptos',
          address: '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
          id: 'STREAM_NOT_FOUND',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Stream not found');
    });
  });

  describe('evm', () => {
    it('should delete an address succesfully ', async () => {
      const result = (await StreamApi.deleteAddress({
        networkType: 'evm',
        address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
        id: 'VALID_RESPONSE',
      })) as DeleteAddressEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.toJSON().address).toEqual('0x992eccc191d6f74e8be187ed6b6ac196b08314f7');
      expect(result.result.streamId).toEqual('VALID_RESPONSE');
    });

    it('should default to evm networkType', async () => {
      const result = (await StreamApi.deleteAddress({
        address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
        id: 'VALID_RESPONSE',
      })) as DeleteAddressEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.toJSON().address).toEqual('0x992eccc191d6f74e8be187ed6b6ac196b08314f7');
      expect(result.result.streamId).toEqual('VALID_RESPONSE');
    });

    it('should throw a 400 Error on invalid address ', async () => {
      expect(
        StreamApi.deleteAddress({
          networkType: 'evm',
          address: 'some-address',
          id: 'INVALID_ADDRESS',
        }),
      ).rejects.toThrowError('C0005] Invalid address provided');
    });

    it('should throw a 404 Error on unknown address ', async () => {
      expect(
        StreamApi.deleteAddress({
          networkType: 'evm',
          address: '0x295522b61890c3672d12efbff4358a6411ce996f',
          id: 'ADDRESS_NOT_FOUND',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Address not found');
    });

    it('should throw a 404 Error on invalid streamId ', async () => {
      expect(
        StreamApi.deleteAddress({
          networkType: 'evm',
          address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
          id: 'STREAM_NOT_FOUND',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Stream not found');
    });
  });
});
