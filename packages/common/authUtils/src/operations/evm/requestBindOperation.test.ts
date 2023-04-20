import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress } from '@moralisweb3/common-evm-utils';
import { requestBindOperation, RequestBindRequest } from './requestBindOperation';

describe('evmRequestChallengeOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const blockchainType = 'evm';
    const addresses = ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'];

    const request: Required<RequestBindRequest> = {
      addresses: addresses.map((address) => ({
        blockchainType: 'evm',
        address: EvmAddress.create(address),
      })),
    };

    const serializedRequest = requestBindOperation.serializeRequest(request, core);

    expect(serializedRequest.addresses.length).toBe(1);
    const serializedAddress = serializedRequest.addresses[0];
    expect(serializedAddress.blockchainType).toBe(blockchainType);
    expect(serializedAddress.address).toBe(addresses[0]);

    const deserializedRequest = requestBindOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.addresses.length).toBe(1);
    const deserializedAddress = deserializedRequest.addresses[0];
    expect(deserializedAddress.blockchainType).toBe(blockchainType);
    expect((deserializedAddress.address as EvmAddress).checksum).toBe(addresses[0]);
  });
});
