import { AddAddressAptosResponseAdapter, AddAddressEvmResponseAdapter } from '@moralisweb3/common-streams-utils';
import { Streams } from '../../src/Streams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Add stream address', () => {
  let StreamApi: Streams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  describe('aptos', () => {
    it('should create an address succesfully ', async () => {
      const result = (await StreamApi.addAddress({
        networkType: 'aptos',
        address: '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
        id: 'VALID_RESPONSE',
      })) as AddAddressAptosResponseAdapter;

      expect(result).toBeDefined();
      expect(result.toJSON().address).toEqual('0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b');
      expect(result.result.streamId).toEqual('VALID_RESPONSE');
    });

    it('should create multiple addresses succesfully ', async () => {
      const result = (await StreamApi.addAddress({
        networkType: 'aptos',
        address: [
          '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
          '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c',
        ],
        id: 'MULTIPLE_ADDRESSES',
      })) as AddAddressAptosResponseAdapter;

      expect(result).toBeDefined();
      expect(result.toJSON().address).toStrictEqual([
        '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
        '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c',
      ]);
      expect(result.result.streamId).toEqual('MULTIPLE_ADDRESSES');
    });

    it('should throw a 400 Error on invalid address ', async () => {
      expect(
        StreamApi.addAddress({
          networkType: 'aptos',
          address: 'some-address',
          id: 'INVALID_ADDRESS',
        }),
      ).rejects.toThrowError('C0005] Invalid address provided');
    });

    it('should throw a 404 Error on invalid streamId ', async () => {
      expect(
        StreamApi.addAddress({
          networkType: 'aptos',
          address: '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
          id: 'STREAM_NOT_FOUND',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Stream not found');
    });
  });

  describe('evm', () => {
    it('should create an address succesfully ', async () => {
      const result = (await StreamApi.addAddress({
        networkType: 'evm',
        address: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
        id: 'VALID_RESPONSE',
      })) as AddAddressEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.toJSON().address).toEqual('0x295522b61890c3672D12eFbFf4358a6411CE996F');
      expect(result.result.streamId).toEqual('VALID_RESPONSE');
    });

    it('should default to evm networkType', async () => {
      const result = (await StreamApi.addAddress({
        address: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
        id: 'VALID_RESPONSE',
      })) as AddAddressEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.toJSON().address).toEqual('0x295522b61890c3672D12eFbFf4358a6411CE996F');
      expect(result.result.streamId).toEqual('VALID_RESPONSE');
    });

    it('should create multiple addresses succesfully ', async () => {
      const result = (await StreamApi.addAddress({
        networkType: 'evm',
        address: ['0x295522b61890c3672D12eFbFf4358a6411CE996F', '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'],
        id: 'MULTIPLE_ADDRESSES',
      })) as AddAddressEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.toJSON().address).toStrictEqual([
        '0x295522b61890c3672D12eFbFf4358a6411CE996F',
        '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      ]);
      expect(result.result.streamId).toEqual('MULTIPLE_ADDRESSES');
    });

    it('should throw a 400 Error on invalid address ', async () => {
      expect(
        StreamApi.addAddress({
          networkType: 'evm',
          address: 'some-address',
          id: 'INVALID_ADDRESS',
        }),
      ).rejects.toThrowError('C0005] Invalid address provided');
    });

    it('should throw a 404 Error on invalid streamId ', async () => {
      expect(
        StreamApi.addAddress({
          networkType: 'evm',
          address: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
          id: 'STREAM_NOT_FOUND',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Stream not found');
    });
  });
});
