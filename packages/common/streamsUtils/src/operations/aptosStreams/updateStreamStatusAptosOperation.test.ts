import MoralisCore from '@moralisweb3/common-core';
import { updateStreamStatusAptosOperation, UpdateStreamStatusAptosRequest } from './updateStreamStatusAptosOperation';

describe('updateStreamAptosStatusOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly with one address', () => {
    const request: Required<UpdateStreamStatusAptosRequest> = {
      id: '773c61f9-1ff0-4ab4-b115-2ad8030066df',
      status: 'paused',
    };

    const serializedRequest = updateStreamStatusAptosOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);
    expect(serializedRequest.status).toBe(request.status);

    const deserializedRequest = updateStreamStatusAptosOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
    expect(deserializedRequest.status).toBe(request.status);
  });
});
