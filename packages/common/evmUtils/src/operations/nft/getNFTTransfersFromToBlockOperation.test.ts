import MoralisCore from '@moralisweb3/common-core';
import { EvmChain } from '../../dataTypes';
import {
  getNftTransfersFromToBlockOperation,
  GetNftTransfersFromToBlockRequest,
} from './getNFTTransfersFromToBlockOperation';

describe('getNftTransfersFromToBlockOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x10';

    const request: Required<GetNftTransfersFromToBlockRequest> = {
      chain: EvmChain.create(chain, core),
      fromBlock: 123,
      toBlock: 123,
      fromDate: '2021-01-01T00:00:00.000Z',
      toDate: '2020-01-01T00:00:00.000Z',
      format: 'decimal',
      limit: 100,
      cursor: 'CURSOR1',
    };

    const serializedRequest = getNftTransfersFromToBlockOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.fromBlock).toBe(request.fromBlock);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    expect(serializedRequest.fromDate).toBe(request.fromDate);
    expect(serializedRequest.toDate).toBe(request.toDate);
    expect(serializedRequest.format).toBe(request.format);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.cursor).toBe(request.cursor);

    const deserializedRequest = getNftTransfersFromToBlockOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.fromBlock).toBe(request.fromBlock);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    expect(deserializedRequest.fromDate).toBe(request.fromDate);
    expect(deserializedRequest.toDate).toBe(request.toDate);
    expect(deserializedRequest.format).toBe(request.format);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
  });
});
