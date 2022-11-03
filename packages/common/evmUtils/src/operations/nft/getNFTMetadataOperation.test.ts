import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import {
  getNftMetadataOperation,
  GetNftMetadataRequest,
} from './getNFTMetadataOperation';

describe('getNftMetadataOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetNftMetadataRequest> = {
      chain: EvmChain.create(chain, core),
      address: EvmAddress.create(address, core),
      tokenId: '123',
      format: 'decimal',
    };

    const serializedRequest = getNftMetadataOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.tokenId).toBe(request.tokenId);
    expect(serializedRequest.format).toBe(request.format);

    const deserializedRequest = getNftMetadataOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.tokenId).toBe(request.tokenId);
    expect(deserializedRequest.format).toBe(request.format);
  });
});
