import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createStreamResponse } from '../response/streamResponse';

export const mockUpdateStream = MockScenarios.create(
  {
    method: 'post',
    name: 'mockUpdateStream',
    url: `/streams/evm/:id`,
    getParams: (req) => ({
      id: req.params.id,

      webhookUrl: req.body.webhookUrl,
      description: req.body.description,
      tag: req.body.tag,
      chainIds: req.body.chainIds,
      abi: req.body.abi,
      advancedOptions: req.body.advancedOptions,
      topic0: req.body.topic0,
      includeNativeTxs: req.body.includeNativeTxs,
      allAddresses: req.body.allAddresses,
      includeContractLogs: req.body.includeContractLogs,
      includeInternalTxs: req.body.includeInternalTxs,
    }),
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
      response: createStreamResponse('test-1'),
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
        includeNativeTxs: true,
      },
      response: createStreamResponse('test-2'),
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
