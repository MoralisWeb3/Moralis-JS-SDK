import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress } from '@moralisweb3/common-evm-utils';
import { removeBindOperation, RemoveBindRequest } from './removeBindOperation';

describe('removeBindOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

    const request: Required<RemoveBindRequest> = {
      profileId: '0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff',
      blockchainType: 'evm',
      address: EvmAddress.create(address, core),
    };

    const serializedRequest = removeBindOperation.serializeRequest(request, core);

    expect(serializedRequest.profileId).toBe(request.profileId);
    expect(serializedRequest.blockchainType).toBe(request.blockchainType);
    expect(serializedRequest.address).toBe(address);

    const deserializedRequest = removeBindOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.profileId).toBe(request.profileId);
    expect(deserializedRequest.blockchainType).toBe(request.blockchainType);
    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
  });
});
