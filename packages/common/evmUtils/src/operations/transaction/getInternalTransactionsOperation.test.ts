import { Core } from '@moralisweb3/common-core';
import { EvmChain } from '../../dataTypes';
import { getInternalTransactionsOperation, GetInternalTransactionsRequest } from './getInternalTransactionsOperation';

describe('getInternalTransactionsOperation', () => {
  let core: Core;

  beforeAll(() => {
    core = Core.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x10';

    const request: Required<GetInternalTransactionsRequest> = {
      chain: EvmChain.create(chain),
      transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7z',
    };

    const serializedRequest = getInternalTransactionsOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.transactionHash).toBe(request.transactionHash);

    const deserializedRequest = getInternalTransactionsOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.transactionHash).toBe(request.transactionHash);
  });
});
