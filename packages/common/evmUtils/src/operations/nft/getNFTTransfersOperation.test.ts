import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getNFTTransfersOperation, GetNFTTransfersRequest } from './getNFTTransfersOperation';

describe('getNFTTransfersOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetNFTTransfersRequest> = {
      chain: EvmChain.create(chain, core),
      address: EvmAddress.create(address),
      format: 'decimal',
      limit: 100,
      cursor: 'CURSOR1',
      tokenId: '123',
      disableTotal: true,
    };

    const serializedRequest = getNFTTransfersOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.format).toBe(request.format);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.tokenId).toBe(request.tokenId);
    expect(serializedRequest.disableTotal).toBe(true);

    const deserializedRequest = getNFTTransfersOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.format).toBe(request.format);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.tokenId).toBe(request.tokenId);
    expect(deserializedRequest.disableTotal).toBe(true);
  });
});
