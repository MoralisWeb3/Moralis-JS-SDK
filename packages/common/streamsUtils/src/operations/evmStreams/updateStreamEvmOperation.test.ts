import MoralisCore from '@moralisweb3/common-core';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { updateStreamEvmOperation, UpdateStreamEvmRequest } from './updateStreamEvmOperation';

describe('createStreamEvmOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly with one address', () => {
    const request: Required<UpdateStreamEvmRequest> = {
      id: '12345',
      webhookUrl: 'https://domain.com/webhook',
      description: 'Description',
      tag: 'Tag1',
      topic0: ['topic'],
      allAddresses: false,
      includeNativeTxs: true,
      includeContractLogs: true,
      includeInternalTxs: true,
      chains: ['0x1'],
      abi: null,
      advancedOptions: null,
      demo: true,
    };

    const serializedRequest = updateStreamEvmOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);
    expect(serializedRequest.webhookUrl).toBe(request.webhookUrl);
    expect(serializedRequest.description).toBe(request.description);
    expect(serializedRequest.tag).toBe(request.tag);
    expect(serializedRequest.topic0).toBe(request.topic0);
    expect(serializedRequest.allAddresses).toBe(false);
    expect(serializedRequest.includeNativeTxs).toBe(true);
    expect(serializedRequest.includeContractLogs).toBe(true);
    expect(serializedRequest.includeInternalTxs).toBe(true);
    expect(serializedRequest.chainIds).toContain('0x1');
    expect(serializedRequest.abi).toBe(null);
    expect(serializedRequest.advancedOptions).toBe(null);

    const deserializedRequest = updateStreamEvmOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
    expect(deserializedRequest.webhookUrl).toBe(request.webhookUrl);
    expect(deserializedRequest.description).toBe(request.description);
    expect(deserializedRequest.tag).toBe(request.tag);
    expect(deserializedRequest.topic0).toBe(request.topic0);
    expect(deserializedRequest.allAddresses).toBe(false);
    expect(deserializedRequest.includeNativeTxs).toBe(true);
    expect(deserializedRequest.includeContractLogs).toBe(true);
    expect(deserializedRequest.includeInternalTxs).toBe(true);
    expect((deserializedRequest.chains[0] as EvmChain).apiHex).toContain('0x1');
    expect(deserializedRequest.abi).toBe(null);
    expect(deserializedRequest.advancedOptions).toBe(null);
  });
});
