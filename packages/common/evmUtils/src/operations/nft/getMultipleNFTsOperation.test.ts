import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getMultipleNFTsOperation, GetMultipleNFTsRequest } from './getMultipleNFTsOperation';

describe('getContractNfTsOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x10';
    const tokenAddress1 = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
    const tokenId1 = '1234';
    const tokenAddress2 = '0x8698bf7cdef5a23b8dfc319e7c4236dcc7149380';
    const tokenId2 = '12';

    const request: Required<GetMultipleNFTsRequest> = {
      chain: EvmChain.create(chain, core),
      normalizeMetadata: false,
      tokens: [
        {
          tokenAddress: tokenAddress1,
          tokenId: tokenId1,
        },
        {
          tokenAddress: tokenAddress2,
          tokenId: tokenId2,
        },
      ],
      mediaItems: true,
    };

    const serializedRequest = getMultipleNFTsOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.normalizeMetadata).toBe(request.normalizeMetadata);
    expect(serializedRequest.tokens[0].tokenAddress).toBe(tokenAddress1);
    expect(serializedRequest.tokens[0].tokenId).toBe(tokenId1);
    expect(serializedRequest.tokens[1].tokenAddress).toBe(tokenAddress2);
    expect(serializedRequest.tokens[1].tokenId).toBe(tokenId2);

    const deserializedRequest = getMultipleNFTsOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.normalizeMetadata).toBe(request.normalizeMetadata);
    expect((deserializedRequest.tokens[0].tokenAddress as EvmAddress).lowercase).toBe(tokenAddress1);
    expect(deserializedRequest.tokens[0].tokenId).toBe(tokenId1);
    expect((deserializedRequest.tokens[1].tokenAddress as EvmAddress).lowercase).toBe(tokenAddress2);
    expect(deserializedRequest.tokens[1].tokenId).toBe(tokenId2);
  });
});
