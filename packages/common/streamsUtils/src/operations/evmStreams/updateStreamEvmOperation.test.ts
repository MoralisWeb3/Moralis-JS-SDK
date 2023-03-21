import MoralisCore from '@moralisweb3/common-core';
import { CommonEvmUtils, CommonEvmUtilsConfig, EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTrigger } from '../../dataTypes';
import { updateStreamEvmOperation, UpdateStreamEvmRequest } from './updateStreamEvmOperation';

describe('updateStreamEvmOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
    const evmUtils = CommonEvmUtils.create(core);
    core.registerModules([evmUtils]);
    core.config.set(CommonEvmUtilsConfig.formatEvmAddress, 'checksum');
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly with one address', () => {
    const contractAddress = '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE';
    const balanceOfAbi = {
      constant: true,
      inputs: [
        {
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          name: 'toBalance',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    };

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
      includeAllTxLogs: true,
      getNativeBalances: [
        {
          selectors: ['$fromAddress', '$toAddress'],
          type: 'tx',
        },
      ],
      chains: ['0x1'],
      abi: null,
      advancedOptions: null,
      demo: true,
      triggers: [
        StreamTrigger.create(
          {
            type: 'erc20transfer',
            contractAddress,
            functionAbi: balanceOfAbi,
            inputs: [['Joe', '25', '$from']],
          },
          core,
        ),
      ],
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
    expect(serializedRequest.includeAllTxLogs).toBe(true);
    expect(serializedRequest.chainIds).toContain('0x1');
    expect(serializedRequest.abi).toBe(null);
    expect(serializedRequest.advancedOptions).toBe(null);
    expect(serializedRequest.demo).toBe(true);
    expect(serializedRequest.triggers).toHaveLength(1);
    const serializedTrigger = serializedRequest.triggers![0];
    expect(serializedTrigger.type).toBe('erc20transfer');
    expect(serializedTrigger.contractAddress).toBe(contractAddress);
    expect(serializedTrigger.functionAbi).toBe(balanceOfAbi);
    expect(serializedTrigger.inputs).toStrictEqual([['Joe', '25', '$from']]);

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
    expect((deserializedRequest.chains as EvmChain[])[0].apiHex).toContain('0x1');
    expect(deserializedRequest.abi).toBe(null);
    expect(deserializedRequest.advancedOptions).toBe(null);
    expect(deserializedRequest.demo).toBe(true);
    expect(deserializedRequest.triggers).toHaveLength(1);
    const deserializedTrigger = deserializedRequest.triggers![0];
    expect(deserializedTrigger.type).toBe('erc20transfer');
    expect((deserializedTrigger.contractAddress as EvmAddress).checksum).toBe(contractAddress);
    expect(deserializedTrigger.functionAbi).toBe(balanceOfAbi);
    expect(deserializedTrigger.inputs).toStrictEqual([['Joe', '25', '$from']]);
  });
});
