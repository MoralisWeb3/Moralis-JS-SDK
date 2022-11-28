import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress } from '@moralisweb3/common-evm-utils';
import { addAddressEvmOperation, AddAddressEvmRequest } from './addAddressEvmOperation';

describe('AddAddressEvmOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly with one address', () => {
    const address = '0x295522b61890c3672D12eFbFf4358a6411CE996F';

    const request: Required<AddAddressEvmRequest> = {
      id: 'eu-central-1',
      address: EvmAddress.create(address, core),
    };

    const serializedRequest = addAddressEvmOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);
    if (Array.isArray(serializedRequest.address)) {
      throw new Error('Serialized request should not have an array of addresses');
    }
    expect(serializedRequest.address).toBe(address);

    const deserializedRequest = addAddressEvmOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
    if (Array.isArray(deserializedRequest.address)) {
      throw new Error('Deserialized request should not have an array of addresses');
    }
    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly with multiple addresses', () => {
    const addresses = ['0x295522b61890c3672D12eFbFf4358a6411CE996F', '0xfc0cB34deAe994432fe8a11bF54d90BDf54cA8c1'];

    const request: Required<AddAddressEvmRequest> = {
      id: 'eu-central-1',
      address: addresses.map((address) => EvmAddress.create(address, core)),
    };

    const serializedRequest = addAddressEvmOperation.serializeRequest(request, core);

    if (!Array.isArray(serializedRequest.address)) {
      throw new Error('Serialized request should have an array of addresses');
    }
    expect(serializedRequest.id).toBe(request.id);
    expect(serializedRequest.address?.length).toBe((request.address as EvmAddress[]).length);
    for (let i = 0; i < (request.address as EvmAddress[]).length; i++) {
      expect((serializedRequest.address ?? [])[i]).toBe(addresses[i]);
    }

    const deserializedRequest = addAddressEvmOperation.deserializeRequest(serializedRequest, core);

    if (!Array.isArray(deserializedRequest.address)) {
      throw new Error('DeserializedRequest request should have an array of addresses');
    }
    expect(deserializedRequest.id).toBe(request.id);
    for (let i = 0; i < (request.address as EvmAddress[]).length; i++) {
      const tokenAddress = (deserializedRequest.address ?? [])[i];
      const requestAddress = (request.address as EvmAddress[])[i];
      expect(EvmAddress.equals(tokenAddress, requestAddress)).toBeTruthy();
    }
  });
});
