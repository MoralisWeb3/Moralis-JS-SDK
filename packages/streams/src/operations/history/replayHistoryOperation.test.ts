import MoralisCore from '@moralisweb3/common-core';
import { replayHistoryOperation, ReplayHistoryRequest } from './replayHistoryOperation';

describe('replayHistoryOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {

    const request: Required<ReplayHistoryRequest> = {
      streamId: 'stream-1',
      id: 'id-1',
    };

    const serializedRequest = replayHistoryOperation.serializeRequest(request, core);

    expect(serializedRequest.streamId).toBe(request.streamId);
    expect(serializedRequest.id).toBe(request.id);

    const deserializedRequest = replayHistoryOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.streamId).toBe(request.streamId);
    expect(deserializedRequest.id).toBe(request.id);
  });
});
