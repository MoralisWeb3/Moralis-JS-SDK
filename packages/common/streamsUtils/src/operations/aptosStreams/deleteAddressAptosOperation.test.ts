import MoralisCore from '@moralisweb3/common-core';
import { AptosAddress } from '@moralisweb3/common-aptos-utils';
import { deleteAddressAptosOperation, DeleteAddressAptosRequest } from './deleteAddressAptosOperation';

describe('deleteAddressAptosOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly with one address', () => {
    const address = '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b';

    const request: Required<DeleteAddressAptosRequest> = {
      id: '773c61f9-1ff0-4ab4-b115-2ad8030066df',
      address: AptosAddress.create(address),
    };

    const serializedRequest = deleteAddressAptosOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);
    if (Array.isArray(serializedRequest.address)) {
      throw new Error('Serialized request should not have an array of addresses');
    }
    expect(serializedRequest.address).toBe(address);

    const deserializedRequest = deleteAddressAptosOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
    if (Array.isArray(deserializedRequest.address)) {
      throw new Error('Deserialized request should not have an array of addresses');
    }
    expect((deserializedRequest.address as AptosAddress).address).toBe(address);
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly with multiple addresses', () => {
    const addresses = [
      '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
      '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c',
    ];

    const request: Required<DeleteAddressAptosRequest> = {
      id: '773c61f9-1ff0-4ab4-b115-2ad8030066df',
      address: addresses.map((address) => AptosAddress.create(address)),
    };

    const serializedRequest = deleteAddressAptosOperation.serializeRequest(request, core);

    if (!Array.isArray(serializedRequest.address)) {
      throw new Error('Serialized request should have an array of addresses');
    }
    expect(serializedRequest.id).toBe(request.id);
    expect(serializedRequest.address?.length).toBe((request.address as AptosAddress[]).length);
    for (let i = 0; i < (request.address as AptosAddress[]).length; i++) {
      expect((serializedRequest.address ?? [])[i]).toBe(addresses[i]);
    }

    const deserializedRequest = deleteAddressAptosOperation.deserializeRequest(serializedRequest, core);

    if (!Array.isArray(deserializedRequest.address)) {
      throw new Error('DeserializedRequest request should have an array of addresses');
    }
    expect(deserializedRequest.id).toBe(request.id);
    for (let i = 0; i < (request.address as AptosAddress[]).length; i++) {
      const tokenAddress = (deserializedRequest.address ?? [])[i];
      const requestAddress = (request.address as AptosAddress[])[i];
      expect(AptosAddress.equals(tokenAddress, requestAddress)).toBeTruthy();
    }
  });
});
