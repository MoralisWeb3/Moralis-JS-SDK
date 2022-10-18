import { MoralisStreams } from '../../src/MoralisStreams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('addAddress', () => {
  let StreamApi: MoralisStreams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  describe('evm', () => {
    it('should create an address succesfully ', async () => {
      const result = await StreamApi.addAddress({
        networkType: 'evm',
        address: '0x295522b61890c3672d12efbff4358a6411ce996f',
        id: 'VALID_RESPONSE',
      });

      expect(result).toBeDefined();
      expect(result.toJSON().address).toEqual('0x295522b61890c3672d12efbff4358a6411ce996f');
      expect(result.result.streamId).toEqual('VALID_RESPONSE');
    });

    it('should default to evm networkType', async () => {
      const result = await StreamApi.addAddress({
        address: '0x295522b61890c3672d12efbff4358a6411ce996f',
        id: 'VALID_RESPONSE',
      });

      expect(result).toBeDefined();
      expect(result.toJSON().address).toEqual('0x295522b61890c3672d12efbff4358a6411ce996f');
      expect(result.result.streamId).toEqual('VALID_RESPONSE');
    });

    it('should create multiple addresses succesfully ', async () => {
      const result = await StreamApi.addAddress({
        networkType: 'evm',
        address: ['0x295522b61890c3672d12efbff4358a6411ce996f', '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'],
        id: 'MULTIPLE_ADDRESSES',
      });

      expect(result).toBeDefined();
      expect(result.toJSON().address).toStrictEqual([
        '0x295522b61890c3672d12efbff4358a6411ce996f',
        '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
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
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): Invalid Address: some-address');
    });

    it('should throw a 404 Error on invalid streamId ', async () => {
      expect(
        StreamApi.addAddress({
          networkType: 'evm',
          address: '0x295522b61890c3672d12efbff4358a6411ce996f',
          id: 'STREAM_NOT_FOUND',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Stream not found');
    });
  });
});
