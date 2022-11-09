import MoralisCore from '@moralisweb3/common-core';
import { EvmChain } from '../../dataTypes';
import { getTransactionOperation, GetTransactionRequest } from './getTransactionOperation';

describe('getTransactionOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x10';

    const request: Required<GetTransactionRequest> = {
      chain: EvmChain.create(chain, core),
      subdomain: 'test.com',
      transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7z',
    };

    const serializedRequest = getTransactionOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.subdomain).toBe(request.subdomain);
    expect(serializedRequest.transactionHash).toBe(request.transactionHash);

    const deserializedRequest = getTransactionOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.subdomain).toBe(request.subdomain);
    expect(deserializedRequest.transactionHash).toBe(request.transactionHash);
  });
});
