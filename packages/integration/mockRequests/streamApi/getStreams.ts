import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetStreamsOutput = {
  data: [
    {
      webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
      description: 'string',
      tag: 'string',
      tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      filter: {},
      address: '0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7',
      chainId: '0x3',
      type: 'tx',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    },
  ],
  cursor: 'string',
  total: 20,
};

export const mockGetStreams = rest.get(`${STREAM_API_ROOT}/streams`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  return res(ctx.status(200), ctx.json(mockGetStreamsOutput));
});
