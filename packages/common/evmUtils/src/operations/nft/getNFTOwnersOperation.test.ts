import { Core } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getNFTOwnersOperation, GetNFTOwnersRequest } from './getNFTOwnersOperation';

describe('getNFTOwnersOperation', () => {
  let core: Core;

  beforeAll(() => {
    core = Core.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetNFTOwnersRequest> = {
      chain: EvmChain.create(chain),
      address: EvmAddress.create(address),
      format: 'decimal',
      limit: 100,
      cursor: 'CURSOR1',
      normalizeMetadata: false,
      mediaItems: true,
    };

    const serializedRequest = getNFTOwnersOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.format).toBe(request.format);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.normalizeMetadata).toBe(request.normalizeMetadata);

    const deserializedRequest = getNFTOwnersOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.format).toBe(request.format);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.normalizeMetadata).toBe(request.normalizeMetadata);
  });
});
