import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getWalletNfTsOperation, GetWalletNfTsRequest } from './getWalletNFTsOperation';

describe('getWalletNfTsOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';
    const tokenAddresses = ['0xfc0cB34deAe994432fe8a11bF54d90BDf54cA8c1'];

    const request: Required<GetWalletNfTsRequest> = {
      chain: EvmChain.create(chain, core),
      address: EvmAddress.create(address, core),
      format: 'decimal',
      limit: 100,
      tokenAddresses: tokenAddresses.map((address) => EvmAddress.create(address, core)),
      cursor: 'CURSOR1',
    };

    const serializedRequest = getWalletNfTsOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.format).toBe(request.format);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.tokenAddresses?.length).toBe(request.tokenAddresses.length);
    for (let i = 0; i < request.tokenAddresses.length; i++) {
      expect((serializedRequest.tokenAddresses ?? [])[i]).toBe(tokenAddresses[i]);
    }
    expect(serializedRequest.cursor).toBe(request.cursor);

    const deserializedRequest = getWalletNfTsOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.format).toBe(request.format);
    expect(deserializedRequest.limit).toBe(request.limit);
    for (let i = 0; i < request.tokenAddresses.length; i++) {
      const tokenAddress = (deserializedRequest.tokenAddresses ?? [])[i];
      const requestAddress = request.tokenAddresses[i];
      expect(EvmAddress.equals(tokenAddress, requestAddress)).toBeTruthy();
    }
    expect(deserializedRequest.cursor).toBe(request.cursor);
  });
});
