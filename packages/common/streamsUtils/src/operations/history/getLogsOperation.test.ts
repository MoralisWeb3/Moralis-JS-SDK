import MoralisCore from '@moralisweb3/common-core';
import { getLogsOperation, GetLogsRequest } from './getLogsOperation';

describe('getLogsOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<GetLogsRequest> = {
      limit: 100,
      cursor: 'CURSOR1',
    };

    const serializedRequest = getLogsOperation.serializeRequest(request, core);

    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.cursor).toBe(request.cursor);

    const deserializedRequest = getLogsOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
  });
});
