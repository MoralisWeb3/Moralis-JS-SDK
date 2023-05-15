import { Core } from '@moralisweb3/common-core';
import { getStreamsAptosOperation, GetStreamsAptosRequest } from './getStreamsAptosOperation';

describe('getStreamsAptosOperation', () => {
  let core: Core;

  beforeAll(() => {
    core = Core.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<GetStreamsAptosRequest> = {
      cursor: 'CURSOR1',
      limit: 333,
    };

    const serializedRequest = getStreamsAptosOperation.serializeRequest(request, core);

    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.limit).toBe(request.limit);

    const deserializedRequest = getStreamsAptosOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.limit).toBe(request.limit);
  });
});
