import MoralisCore from '@moralisweb3/common-core';
import { getAddressesEvmOperation, GetAddressesEvmRequest } from './getAddressesEvmOperation';

describe('getAddressesEvmOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<GetAddressesEvmRequest> = {
      id: '1000',
      cursor: 'CURSOR1',
      limit: 333,
    };

    const serializedRequest = getAddressesEvmOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.limit).toBe(request.limit);

    const deserializedRequest = getAddressesEvmOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.limit).toBe(request.limit);
  });
});
