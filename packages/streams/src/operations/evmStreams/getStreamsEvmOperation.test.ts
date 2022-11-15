import MoralisCore from '@moralisweb3/common-core';
import { getStreamsEvmOperation, GetStreamsEvmRequest } from './getStreamsEvmOperation';

describe('getStreamsEvmOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<GetStreamsEvmRequest> = {
      cursor: 'CURSOR1',
      limit: 333,
    };

    const serializedRequest = getStreamsEvmOperation.serializeRequest(request, core);

    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.limit).toBe(request.limit);

    const deserializedRequest = getStreamsEvmOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.limit).toBe(request.limit);
  });
});
