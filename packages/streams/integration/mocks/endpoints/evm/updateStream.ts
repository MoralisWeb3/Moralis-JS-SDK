import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../../response/errorResponse';
import { createEvmStreamResponse } from '../../response/evmStreamResponse';

export const mockUpdateStreamEvm = MockScenarios.create(
  {
    method: 'post',
    name: 'mockUpdateStreamEvm',
    url: `/streams/evm/:id`,
    getParams: ({ req, reqBody }) => {
      return {
        id: req.params.id,

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
        includeAllTxLogs: reqBody?.includeAllTxLogs,
      };
    },
  },
  [
    {
      condition: {
        id: 'VALID_REQUEST',
        tag: 'test-1',
        description: 'Valid request',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',

        chainIds: ['0x3'],
      },
      response: createEvmStreamResponse('test-1'),
    },
    {
      condition: {
        id: 'REQUEST_WITH_NO_CHAINS',
        tag: 'test-1',
        description: 'Valid request',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      },
      response: createEvmStreamResponse('test-no-chains'),
    },
    {
      condition: {
        id: 'VALID_FULL_REQUEST',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        description: 'Body with all params filled',
        tag: 'test-2',
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
        includeAllTxLogs: false,
        includeNativeTxs: true,
      },
      response: createEvmStreamResponse('test-2'),
    },
    {
      condition: {
        id: 'INVALID_WEBHOOK',
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
