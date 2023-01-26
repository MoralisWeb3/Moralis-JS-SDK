import MoralisCore from '@moralisweb3/common-core';
import { CommonAptosUtils, AptosNetwork } from '@moralisweb3/common-aptos-utils';
import { updateStreamAptosOperation, UpdateStreamAptosRequest } from './updateStreamAptosOperation';

describe('createStreamAptosOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
    const aptosUtils = CommonAptosUtils.create(core);
    core.registerModules([aptosUtils]);
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly with one address', () => {
    const request: Required<UpdateStreamAptosRequest> = {
      id: '773c61f9-1ff0-4ab4-b115-2ad8030066df',
      allAddresses: false,
      demo: true,
      description: 'Demo stream',
      includeChanges: true,
      includeEvents: true,
      includePayload: true,
      network: ['mainnet', 'devnet'],
      events: [],
      functions: [],
      webhookUrl: '',
      tag: 'demo',
    };

    const serializedRequest = updateStreamAptosOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);
    expect(serializedRequest.webhookUrl).toBe(request.webhookUrl);
    expect(serializedRequest.description).toBe(request.description);
    expect(serializedRequest.tag).toBe(request.tag);
    expect(serializedRequest.allAddresses).toBe(request.allAddresses);
    expect(serializedRequest.demo).toBe(request.demo);
    expect(serializedRequest.includeChanges).toBe(request.includeChanges);
    expect(serializedRequest.includeEvents).toBe(request.includeEvents);
    expect(serializedRequest.includePayload).toBe(request.includePayload);
    expect(serializedRequest.network).toStrictEqual(request.network);
    expect(serializedRequest.events).toStrictEqual(request.events);
    expect(serializedRequest.functions).toStrictEqual(request.functions);

    const deserializedRequest = updateStreamAptosOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
    expect(deserializedRequest.webhookUrl).toBe(request.webhookUrl);
    expect(deserializedRequest.description).toBe(request.description);
    expect(deserializedRequest.tag).toBe(request.tag);
    expect(deserializedRequest.allAddresses).toBe(request.allAddresses);
    expect(deserializedRequest.demo).toBe(request.demo);
    expect(deserializedRequest.includeChanges).toBe(request.includeChanges);
    expect(deserializedRequest.includeEvents).toBe(request.includeEvents);
    expect(deserializedRequest.includePayload).toBe(request.includePayload);
    expect(deserializedRequest.network.map((network) => (network as AptosNetwork).network)).toStrictEqual(
      request.network,
    );
    expect(deserializedRequest.events).toStrictEqual(request.events);
    expect(deserializedRequest.functions).toStrictEqual(request.functions);
  });
});
