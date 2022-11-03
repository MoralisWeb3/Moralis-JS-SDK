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

    const request: Required<GetDateToBlockRequest> = {
      chain: EvmChain.create(chain, core),
      date: new Date('2021-01-01'),
      providerUrl: 'https://provider.com/url',
    };

    const serializedRequest = getDateToBlockOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.providerUrl).toBe(request.providerUrl);
    expect(serializedRequest.date).toBe(request.date);

    const deserializedRequest = getDateToBlockOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(serializedRequest.date).toBe(request.date);
    expect(serializedRequest.providerUrl).toBe(request.providerUrl);
  });
});
