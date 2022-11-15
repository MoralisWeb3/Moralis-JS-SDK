import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress } from '@moralisweb3/common-evm-utils';
import { deleteAddressEvmOperation, DeleteAddressEvmRequest } from './deleteAddressEvmOperation';

describe('deleteAddressEvmOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0x295522b61890c3672d12efbff4358a6411ce996f';
    const request: Required<DeleteAddressEvmRequest> = {
      address,
      id: '1234',
    };

    const serializedRequest = deleteAddressEvmOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.id).toBe('1234');

    const deserializedRequest = deleteAddressEvmOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).lowercase).toBe(address);
    expect(deserializedRequest.id).toBe('1234');
  });
});
