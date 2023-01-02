import MoralisCore from '@moralisweb3/common-core';
import { EvmChain } from '../../dataTypes';
import { GetDateToBlockRequest, getDateToBlockOperation } from './getDateToBlockOperation';

describe('getDateToBlockOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x10';
    const date = '2021-01-01T00:00:00.000Z';

    const request: Required<GetDateToBlockRequest> = {
      chain: EvmChain.create(chain, core),
      date: new Date(date),
    };

    const serializedRequest = getDateToBlockOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.date).toBe(date);

    const deserializedRequest = getDateToBlockOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect((deserializedRequest.date as Date).toISOString()).toBe(date);
  });
});
