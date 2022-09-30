import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetStreamsOutput = {
  result: [
    {
      webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
      description: 'string',
      tag: 'string',
      topic0: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
      filter: {},
      abi: {},
      chainIds: ['0x3'],
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      allAddresses: false,
      includeNativeTxs: false,
      includeContractLogs: false,
      includeInternalTxs: false,
    },
  ],
  cursor: 'string',
  total: 20,
};

export const mockGetStreams = rest.get(`${STREAM_API_ROOT}/streams/evm`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  return res(ctx.status(200), ctx.json(mockGetStreamsOutput));
});
