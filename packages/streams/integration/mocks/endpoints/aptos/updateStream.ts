import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../../response/errorResponse';
import { createAptosStreamResponse } from '../../response/aptosStreamResponse';

export const mockUpdateStreamAptos = MockScenarios.create(
  {
    method: 'post',
    name: 'mockUpdateStreamAptos',
    url: `/streams/aptos/:id`,
    getParams: ({ req, reqBody }) => {
      return {
        id: req.params.id,
        allAddresses: reqBody?.allAddresses,
        demo: reqBody?.demo,
        includeChanges: reqBody?.includeChanges,
        includeEvents: reqBody?.includeEvents,
        includePayload: reqBody?.includePayload,
        network: reqBody?.network,
        events: reqBody?.events,
        functions: reqBody?.functions,
        webhookUrl: reqBody?.webhookUrl,
        description: reqBody?.description,
        tag: reqBody?.tag,
      };
    },
  },
  [
    {
      condition: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        allAddresses: false,
        demo: true,
        includeChanges: true,
        includeEvents: true,
        includePayload: false,
        network: ['mainnet', 'devnet'],
        events: [],
        functions: [],
        tag: 'test-1',
        description: 'mock response',
        webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
      },
      response: createAptosStreamResponse('test-1'),
    },
    {
      condition: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        allAddresses: false,
        demo: true,
        includeChanges: true,
        includeEvents: true,
        includePayload: false,
        network: ['mainnet', 'devnet'],
        events: [],
        functions: [],
        tag: 'test-1',
        description: 'mock response',
        webhookUrl: 'https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      },
      responseStatus: 400,
      response: createErrorResponse(
        'Could not POST to https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. Please check your webhook URL.',
      ),
    },
  ],
);
