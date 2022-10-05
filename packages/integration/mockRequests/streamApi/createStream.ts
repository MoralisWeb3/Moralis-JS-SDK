import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';
import isEqual from 'lodash/isEqual';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

const createResponse = (description: string) => ({
  webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
  description,
  tag: 'test',
  topic0: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  allAddresses: false,
  includeNativeTxs: false,
  includeContractLogs: false,
  includeInternalTxs: false,
  abi: null,
  filter: null,
  chainIds: ['0x3', '0x4'],
  status: 'active',
  statusMessage: 'Stream is active',
});

const scenarios = [
  {
    condition: {
      chainIds: ['0x3'],
      tag: 'test',
      description: 'test-1',
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
    },
    responseStatus: 200,
    response: createResponse('test-1'),
  },
  {
    condition: {
      chainIds: ['0x3'],
      tag: 'test',
      description: 'test-2',
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      advancedOptions: [
        {
          topic0: 'SomeEvent(address,uint256)',
          filter: { eq: ['myCoolTopic', '0x0000000000000000000000000000000000000000'] },
          includeNativeTxs: true,
        },
      ],
    },
    responseStatus: 200,
    response: createResponse('test-2'),
  },
];

export const mockCreateStream = rest.put(`${STREAM_API_ROOT}/streams/evm`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');
  const { chainIds, tag, description, webhookUrl, advancedOptions } = req.body as Record<string, any>;

  const params = omitBy({ chainIds, tag, description, webhookUrl, advancedOptions }, isNil);

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const scenario = scenarios.find(({ condition }) => isEqual(condition, params));

  if (scenario) {
    return res(ctx.status(scenario.responseStatus), ctx.json(scenario.response));
  }

  throw new Error(`mockCreateStream failed, no scenarios with: ${JSON.stringify(params)}`);
});
