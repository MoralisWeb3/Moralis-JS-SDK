import MoralisCore from '@moralisweb3/common-core';
import { getHistoryOperation, GetHistoryRequest } from './getHistoryOperation';

describe('getHistoryOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {

    const request: Required<GetHistoryRequest> = {
      excludePayload: false,
      limit: 100,
      cursor: 'CURSOR1',
    };

    const serializedRequest = getHistoryOperation.serializeRequest(request, core);

    expect(serializedRequest.excludePayload).toBe(request.excludePayload);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.cursor).toBe(request.cursor);

    const deserializedRequest = getHistoryOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.excludePayload).toBe(request.excludePayload);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
  });
});
