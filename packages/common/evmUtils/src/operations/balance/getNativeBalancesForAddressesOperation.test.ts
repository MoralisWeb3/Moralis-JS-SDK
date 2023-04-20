import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import {
  GetNativeBalancesForAddressesRequest,
  getNativeBalancesForAddressesOperation,
} from './getNativeBalancesForAddressesOperation';

describe('getNativeBalancesForAddressesOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x1';
    const addresses = ['0x7dE3085b3190B3a787822Ee16F23be010f5F8686', '0x7dE3085b3190B3a787822Ee16F23be010f5F8686'];

    const request: Required<GetNativeBalancesForAddressesRequest> = {
      chain: EvmChain.create(chain, core),
      toBlock: 123,
      walletAddresses: addresses.map((address) => EvmAddress.create(address)),
    };

    const serializedRequest = getNativeBalancesForAddressesOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    for (let i = 0; i < request.walletAddresses.length; i++) {
      expect((serializedRequest.walletAddresses ?? [])[i]).toBe(addresses[i]);
    }

    const deserializedRequest = getNativeBalancesForAddressesOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    for (let i = 0; i < request.walletAddresses.length; i++) {
      const tokenAddress = (deserializedRequest.walletAddresses ?? [])[i];
      const requestAddress = request.walletAddresses[i];
      expect(EvmAddress.equals(tokenAddress, requestAddress)).toBeTruthy();
    }
  });
});
