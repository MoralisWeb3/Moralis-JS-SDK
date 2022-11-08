import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getWalletNFTCollectionsOperation, GetWalletNFTCollectionsRequest } from './getWalletNFTCollectionsOperation';

describe('getWalletNFTCollectionsOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetWalletNFTCollectionsRequest> = {
      chain: EvmChain.create(chain, core),
      address: EvmAddress.create(address, core),
      limit: 100,
      cursor: 'CURSOR1',
    };

    const serializedRequest = getWalletNFTCollectionsOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.cursor).toBe(request.cursor);

    const deserializedRequest = getWalletNFTCollectionsOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
  });
});
