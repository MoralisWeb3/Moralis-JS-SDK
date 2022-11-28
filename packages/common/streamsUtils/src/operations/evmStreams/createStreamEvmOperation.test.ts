import MoralisCore from '@moralisweb3/common-core';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { createStreamEvmOperation, CreateStreamEvmRequest } from './createStreamEvmOperation';

describe('createStreamEvmOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly with one address', () => {
    const request: Required<CreateStreamEvmRequest> = {
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

    const serializedRequest = createStreamEvmOperation.serializeRequest(request, core);

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

    const deserializedRequest = createStreamEvmOperation.deserializeRequest(serializedRequest, core);

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
