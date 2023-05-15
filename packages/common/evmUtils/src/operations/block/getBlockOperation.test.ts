import { Core } from '@moralisweb3/common-core';
import { EvmChain } from '../../dataTypes';
import { GetBlockRequest, getBlockOperation } from './getBlockOperation';

describe('getBlockOperation', () => {
  let core: Core;

  beforeAll(() => {
    core = Core.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x10';

    const request: Required<GetBlockRequest> = {
      blockNumberOrHash: '0x123',
      chain: EvmChain.create(chain),
      include: 'internal_transactions',
    };

    const serializedRequest = getBlockOperation.serializeRequest(request, core);

    expect(serializedRequest.blockNumberOrHash).toBe(request.blockNumberOrHash);
    expect(serializedRequest.chain).toBe(chain);

    const deserializedRequest = getBlockOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.blockNumberOrHash).toBe(request.blockNumberOrHash);
  });
});
