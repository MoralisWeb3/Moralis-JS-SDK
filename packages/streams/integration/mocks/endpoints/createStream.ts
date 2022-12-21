import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createStreamResponse } from '../response/streamResponse';

export const mockCreateStream = MockScenarios.create(
  {
    method: 'put',
    name: 'mockCreateStream',
    url: `/streams/evm`,
    getParams: ({ reqBody }) => {
      return {
        webhookUrl: reqBody?.webhookUrl,
        description: reqBody?.description,
        tag: reqBody?.tag,
        chainIds: reqBody?.chainIds,
        abi: reqBody?.abi,
        advancedOptions: reqBody?.advancedOptions,
        topic0: reqBody?.topic0,
        includeNativeTxs: reqBody?.includeNativeTxs,
        allAddresses: reqBody?.allAddresses,
        includeContractLogs: reqBody?.includeContractLogs,
        includeInternalTxs: reqBody?.includeInternalTxs,
        getNativeBalances: reqBody?.getNativeBalances,
      };
    },
  },
  [
    {
      condition: {
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        description: 'Minimal body that works',
        tag: 'test-1',
        chainIds: ['0x3'],
        includeNativeTxs: true,
      },
      response: createStreamResponse('test-1'),
    },
    {
      condition: {
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        description: 'Body With advanced options',
        tag: 'test-2',
        chainIds: ['0x3'],
        advancedOptions: [
          {
            topic0: 'SomeEvent(address,uint256)',
            filter: { eq: ['myCoolTopic', '0x0000000000000000000000000000000000000000'] },
            includeNativeTxs: true,
          },
        ],
        topic0: ['SomeEvent(address,uint256)'],
      },
      response: createStreamResponse('test-2'),
    },
    {
      condition: {
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        description: 'Body with all params filled',
        tag: 'test-3',
        topic0: ['SomeEvent(address,uint256)'],
        chainIds: ['0x3'],
        advancedOptions: [
          {
            topic0: 'SomeEvent(address,uint256)',
            filter: { eq: ['myCoolTopic', '0x0000000000000000000000000000000000000000'] },
            includeNativeTxs: true,
          },
        ],
        abi: [],
        allAddresses: true,
        includeContractLogs: true,
        includeInternalTxs: true,
        includeNativeTxs: true,
      },
      response: createStreamResponse('test-3'),
    },
    {
      condition: {
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        description: 'Body With getNativeBalances',
        tag: 'test-4',
        chainIds: ['0x3'],
        includeNativeTxs: true,
        getNativeBalances: [
          {
            selectors: ['$fromAddress', '$toAddress'],
            type: 'tx',
          },
        ],
      },
      response: createStreamResponse('test-4'),
    },

    {
      condition: {
        chainIds: ['0x3'],
        tag: 'test-3',
        description: 'test',
        webhookUrl: 'https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      },
      responseStatus: 400,
      response: createErrorResponse(
        'Could not POST to https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. Please check your webhook URL.',
      ),
    },
  ],
);
