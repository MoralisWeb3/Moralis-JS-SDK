import MoralisCore from '@moralisweb3/common-core';
import { updateStreamStatusEvmOperation, UpdateStreamStatusEvmRequest } from './updateStreamStatusEvmOperation';

describe('updateStreamEvmStatusOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly with one address', () => {
    const request: Required<UpdateStreamStatusEvmRequest> = {
      id: '12345',
      status: 'paused',
    };

    const serializedRequest = updateStreamStatusEvmOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);
    expect(serializedRequest.status).toBe(request.status);

    const deserializedRequest = updateStreamStatusEvmOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
    expect(deserializedRequest.status).toBe(request.status);
  });
});
