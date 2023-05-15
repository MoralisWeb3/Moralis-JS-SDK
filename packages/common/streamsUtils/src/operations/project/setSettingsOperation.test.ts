import { Core } from '@moralisweb3/common-core';
import { setSettingsOperation, SetSettingsRequest } from './setSettingsOperation';

describe('setSettingsOperation', () => {
  let core: Core;

  beforeAll(() => {
    core = Core.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<SetSettingsRequest> = {
      region: 'eu-central-1',
    };

    const serializedRequest = setSettingsOperation.serializeRequest(request, core);

    expect(serializedRequest.region).toBe(request.region);

    const deserializedRequest = setSettingsOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.region).toBe(request.region);
  });
});
