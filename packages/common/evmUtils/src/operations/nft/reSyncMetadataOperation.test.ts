import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { reSyncMetadataOperation, ReSyncMetadataRequest } from './reSyncMetadataOperation';

describe('reSyncMetadataOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<ReSyncMetadataRequest> = {
      chain: EvmChain.create(chain, core),
      address: EvmAddress.create(address),
      tokenId: '123',
      flag: 'metadata',
      mode: 'async',
    };

    const serializedRequest = reSyncMetadataOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.tokenId).toBe(request.tokenId);
    expect(serializedRequest.flag).toBe(request.flag);
    expect(serializedRequest.mode).toBe(request.mode);

    const deserializedRequest = reSyncMetadataOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.tokenId).toBe(request.tokenId);
    expect(deserializedRequest.flag).toBe(request.flag);
    expect(deserializedRequest.mode).toBe(request.mode);
  });
});
