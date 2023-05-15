import { Core } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getWalletNFTsOperation, GetWalletNFTsRequest } from './getWalletNFTsOperation';

describe('getWalletNFTsOperation', () => {
  let core: Core;

  beforeAll(() => {
    core = Core.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';
    const tokenAddresses = ['0xfc0cB34deAe994432fe8a11bF54d90BDf54cA8c1'];

    const request: Required<GetWalletNFTsRequest> = {
      chain: EvmChain.create(chain),
      address: EvmAddress.create(address),
      format: 'decimal',
      limit: 100,
      tokenAddresses: tokenAddresses.map((address) => EvmAddress.create(address)),
      cursor: 'CURSOR1',
      normalizeMetadata: false,
      disableTotal: true,
      mediaItems: true,
    };

    const serializedRequest = getWalletNFTsOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.format).toBe(request.format);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.tokenAddresses?.length).toBe(request.tokenAddresses.length);
    for (let i = 0; i < request.tokenAddresses.length; i++) {
      expect((serializedRequest.tokenAddresses ?? [])[i]).toBe(tokenAddresses[i]);
    }
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.normalizeMetadata).toBe(request.normalizeMetadata);
    expect(serializedRequest.disableTotal).toBe(true);

    const deserializedRequest = getWalletNFTsOperation.deserializeRequest(serializedRequest, core);

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
    expect(deserializedRequest.normalizeMetadata).toBe(request.normalizeMetadata);
    expect(deserializedRequest.disableTotal).toBe(true);
  });
});
