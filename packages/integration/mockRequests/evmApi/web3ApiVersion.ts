/* eslint-disable no-console */
import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockWeb3ApiVersions = '0.0.53';

export const mockWeb3ApiVersion = rest.get(`${EVM_API_ROOT}/web3/version`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockWeb3ApiVersions;

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      version: value,
    }),
  );
});
