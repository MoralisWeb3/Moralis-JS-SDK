/* eslint-disable no-console */
import { rest } from 'msw';
import { API_ROOT, MOCK_API_KEY } from '../config';

export const mockEndpointWeightss = 'getBlock';

export const mockEndpointWeights = rest.get(`${API_ROOT}/info/endpointWeights`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockEndpointWeightss;

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      endpoint: value,
      weight: '8',
    }),
  );
});
