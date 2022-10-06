import { MoralisStreams } from '@moralisweb3/streams';
import { cleanStreamsApi, setupStreamApi } from './setup';

describe('deleteAddress', () => {
  let StreamApi: MoralisStreams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  describe('evm', () => {
    it('should delete an address succesfully ', async () => {
      const result = await StreamApi.deleteAddress({
        networkType: 'evm',
        address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
        id: 'VALID_RESPONSE',
      });

      expect(result).toBeDefined();
      expect(result.toJSON().address).toEqual('0x992eccc191d6f74e8be187ed6b6ac196b08314f7');
      expect(result.result.streamId).toEqual('VALID_RESPONSE');
    });

    it('should default to evm networkType', async () => {
      const result = await StreamApi.deleteAddress({
        address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
        id: 'VALID_RESPONSE',
      });

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
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): Invalid Address: some-address');
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

    // it should throw an error on no address
  });
});
