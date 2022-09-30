import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockDeleteStreamOutput: Record<string, unknown> = {
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
};

export const mockDeleteStream = rest.delete(`${STREAM_API_ROOT}/streams/evm/:id`, (req, res, ctx) => {
  const id = req.params.id as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockDeleteStreamOutput;

  if (value.id !== id) {
    return res(ctx.status(404));
  }

  return res(ctx.status(200), ctx.json(value));
});
