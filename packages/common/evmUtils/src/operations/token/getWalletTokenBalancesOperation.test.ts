import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getWalletTokenBalancesOperation, GetWalletTokenBalancesRequest } from './getWalletTokenBalancesOperation';

describe('getWalletTokenBalancesOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';
    const tokenAddresses = ['0xfc0cB34deAe994432fe8a11bF54d90BDf54cA8c1'];

    const request: Required<GetWalletTokenBalancesRequest> = {
      address: EvmAddress.create(address, core),
      chain: EvmChain.create(chain, core),
      tokenAddresses: tokenAddresses.map((address) => EvmAddress.create(address, core)),
      subdomain: 'test.com',
      toBlock: 20,
    };

    const serializedRequest = getWalletTokenBalancesOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.tokenAddresses?.length).toBe(request.tokenAddresses.length);
    for (let i = 0; i < request.tokenAddresses.length; i++) {
      expect((serializedRequest.tokenAddresses ?? [])[i]).toBe(tokenAddresses[i]);
    }
    expect(serializedRequest.subdomain).toBe(request.subdomain);
    expect(serializedRequest.toBlock).toBe(request.toBlock);

    const deserializedRequest = getWalletTokenBalancesOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.tokenAddresses?.length).toBe(request.tokenAddresses.length);
    for (let i = 0; i < request.tokenAddresses.length; i++) {
      const tokenAddress = (deserializedRequest.tokenAddresses ?? [])[i];
      const requestAddress = request.tokenAddresses[i];
      expect(EvmAddress.equals(tokenAddress, requestAddress)).toBeTruthy();
    }
    expect(deserializedRequest.subdomain).toBe(request.subdomain);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
  });
});
