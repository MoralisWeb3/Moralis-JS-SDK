import MoralisCore from '@moralisweb3/common-core';
import { EvmChain } from '../../dataTypes';
import { getNftTransfersByBlockOperation, GetNftTransfersByBlockRequest } from './getNFTTransfersByBlockOperation';

describe('getNftTransfersByBlockOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x10';

    const request: Required<GetNftTransfersByBlockRequest> = {
      chain: EvmChain.create(chain, core),
      blockNumberOrHash: '0x123',
      limit: 100,
      cursor: 'CURSOR1',
      subdomain: 'test.com',
    };

    const serializedRequest = getNftTransfersByBlockOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.blockNumberOrHash).toBe(request.blockNumberOrHash);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.subdomain).toBe(request.subdomain);

    const deserializedRequest = getNftTransfersByBlockOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.blockNumberOrHash).toBe(request.blockNumberOrHash);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.subdomain).toBe(request.subdomain);
  });
});
