import MoralisCore from '@moralisweb3/common-core';
import { EvmChain } from '../../dataTypes';
import { getTransactionVerboseOperation, GetTransactionVerboseRequest } from './getTransactionVerboseOperation';

describe('getTransactionVerboseOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x10';

    const request: Required<GetTransactionVerboseRequest> = {
      chain: EvmChain.create(chain, core),
      transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7z',
    };

    const serializedRequest = getTransactionVerboseOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.transactionHash).toBe(request.transactionHash);

    const deserializedRequest = getTransactionVerboseOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.transactionHash).toBe(request.transactionHash);
  });
});
