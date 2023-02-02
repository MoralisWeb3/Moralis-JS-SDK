import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../../response/errorResponse';
import { createAptosStreamResponse } from '../../response/aptosStreamResponse';

export const mockCreateStreamAptos = MockScenarios.create(
  {
    method: 'put',
    name: 'mockCreateStreamAptos',
    url: `/streams/aptos`,
    getParams: ({ reqBody }) => {
      return {
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
