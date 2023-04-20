import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getNFTTokenIdOwnersOperation, GetNFTTokenIdOwnersRequest } from './getNFTTokenIdOwnersOperation';

describe('getNFTTokenIdOwnersOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetNFTTokenIdOwnersRequest> = {
      chain: EvmChain.create(chain, core),
      address: EvmAddress.create(address),
      tokenId: '123',
      format: 'decimal',
      cursor: 'CURSOR1',
      limit: 333,
      normalizeMetadata: false,
      disableTotal: true,
      mediaItems: true,
    };

    const serializedRequest = getNFTTokenIdOwnersOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.tokenId).toBe(request.tokenId);
    expect(serializedRequest.format).toBe(request.format);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.normalizeMetadata).toBe(request.normalizeMetadata);
    expect(serializedRequest.disableTotal).toBe(true);

    const deserializedRequest = getNFTTokenIdOwnersOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.tokenId).toBe(request.tokenId);
    expect(deserializedRequest.format).toBe(request.format);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.normalizeMetadata).toBe(request.normalizeMetadata);
    expect(deserializedRequest.disableTotal).toBe(true);
  });
});
