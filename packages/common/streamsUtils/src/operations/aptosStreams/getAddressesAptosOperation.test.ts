import MoralisCore from '@moralisweb3/common-core';
import { getAddressesAptosOperation, GetAddressesAptosRequest } from './getAddressesAptosOperation';

describe('getAddressesAptosOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<GetAddressesAptosRequest> = {
      id: '773c61f9-1ff0-4ab4-b115-2ad8030066df',
      cursor: 'CURSOR1',
      limit: 333,
    };

    const serializedRequest = getAddressesAptosOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.limit).toBe(request.limit);

    const deserializedRequest = getAddressesAptosOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.limit).toBe(request.limit);
  });
});
