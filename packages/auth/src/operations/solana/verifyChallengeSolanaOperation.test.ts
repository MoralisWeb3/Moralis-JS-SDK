import MoralisCore from '@moralisweb3/common-core';
import { verifyChallengeSolanaOperation, VerifyChallengeSolanaJSONRequest } from './verifyChallengeSolanaOperation';

describe('solVerifyChallengeOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<VerifyChallengeSolanaJSONRequest> = {
      message: 'VALID_RESPONSE',
      signature: '0x12345',
    };

    const serializedRequest = verifyChallengeSolanaOperation.serializeRequest(request, core);

    expect(serializedRequest.message).toBe(request.message);
    expect(serializedRequest.signature).toBe(request.signature);

    const deserializedRequest = verifyChallengeSolanaOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.message).toBe(request.message);
    expect(deserializedRequest.signature).toBe(request.signature);
  });
});
