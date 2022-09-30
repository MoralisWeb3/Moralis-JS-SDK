import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockUpdateStreamOutput: Record<string, unknown> = {
  id: 'VALID_REQUEST',
  webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
  description: 'test stream',
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
};

export const mockUpdateStream = rest.post(`${STREAM_API_ROOT}/streams/evm/:id`, (req, res, ctx) => {
  const id = req.params.id as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockUpdateStreamOutput;

  if (value.id !== id) {
    return res(ctx.status(404));
  }

  return res(ctx.status(200), ctx.json(value));
});
