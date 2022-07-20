import { rest } from 'msw';
import { API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetContractEvents = rest.post(`${API_ROOT}/:address/events`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  return res(
    ctx.status(200),
    ctx.json({
      total: 10,
      page: 0,
      page_size: 2,
      cursor: 'cursor_string',
      result: [
        {
          transaction_hash: '0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09',
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          block_timestamp: '2021-04-02T10:07:54.000Z',
          block_number: '12526958',
          block_hash: '0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86',
          data: {
            from: '0x54ff6974c715956a5049a123408bff91fbe29f01',
            to: '0x74de5d4fcbf63e00296fd95d33236b9794016631',
            value: '260103496340000000000',
          },
        },
      ],
    }),
  );
});
