import MoralisCore from '@moralisweb3/common-core';
import { solVerifyChallengeOperation, SolVerifyChallengeRequest } from './solVerifyChallengeOperation';

describe('solVerifyChallengeOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<SolVerifyChallengeRequest> = {
      message: 'VALID_RESPONSE',
      signature: '0x12345',
    };

    const serializedRequest = solVerifyChallengeOperation.serializeRequest(request, core);

    expect(serializedRequest.message).toBe(request.message);
    expect(serializedRequest.signature).toBe(request.signature);

    const deserializedRequest = solVerifyChallengeOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.message).toBe(request.message);
    expect(deserializedRequest.signature).toBe(request.signature);
  });
});
