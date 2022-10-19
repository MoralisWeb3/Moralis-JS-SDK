/* eslint-disable no-console */
import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTokenAllowance = rest.get(`${EVM_API_ROOT}/erc20/:address/allowance`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (address === '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce') {
    return res(ctx.status(200), ctx.json({ allowance: '0' }));
  }

  throw new Error('getTokenAllowance: Not supported scenario');
});
