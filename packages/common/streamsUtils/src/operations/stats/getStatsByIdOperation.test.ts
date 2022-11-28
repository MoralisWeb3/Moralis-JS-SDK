import MoralisCore from '@moralisweb3/common-core';
import { getStatsByIdOperation, GetStatsByIdRequest } from './getStatsByIdOperation';

describe('getStatsByIdOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<GetStatsByIdRequest> = {
      streamId: '2b3ae945-44ca-4d89-825a-de19d14f2d9d',
    };

    const serializedRequest = getStatsByIdOperation.serializeRequest(request, core);

    expect(serializedRequest.streamId).toBe(request.streamId);

    const deserializedRequest = getStatsByIdOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.streamId).toBe(request.streamId);
  });
});
