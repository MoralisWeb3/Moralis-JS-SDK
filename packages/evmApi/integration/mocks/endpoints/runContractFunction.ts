/* eslint-disable no-console */
import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockRunContractFunctions: Record<string, string> = {
  '0xecc7f044aa1ce2ad9d2453b01b8732a051213ecf': '1000000000000000000000000',
};

export const mockRunContractFunction = rest.post(`${EVM_API_ROOT}/:address/function`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockRunContractFunctions[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      data: value,
    }),
  );
});
