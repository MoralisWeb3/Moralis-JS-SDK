import { MockScenarios } from '../../MockScenarios';
import { createErrorResponse } from './response/errorResponse';
import { createStreamResponse } from './response/streamResponse';

export const mockCreateStream = MockScenarios.create(
  {
    method: 'put',
    name: 'mockCreateStream',
    url: `/streams/evm`,
    getParams: (req) => ({
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
