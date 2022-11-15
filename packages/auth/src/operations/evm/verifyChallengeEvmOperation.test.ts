import MoralisCore from '@moralisweb3/common-core';
import { verifyChallengeEvmOperation, VerifyChallengeEvmJSONRequest } from './verifyChallengeEvmOperation';

describe('evmVerifyChallengeOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<VerifyChallengeEvmJSONRequest> = {
      message: 'VALID_RESPONSE',
      signature: '0x12345',
    };

    const serializedRequest = verifyChallengeEvmOperation.serializeRequest(request, core);

    expect(serializedRequest.message).toBe(request.message);
    expect(serializedRequest.signature).toBe(request.signature);

    const deserializedRequest = verifyChallengeEvmOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.message).toBe(request.message);
    expect(deserializedRequest.signature).toBe(request.signature);
  });
});
