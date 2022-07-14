/* eslint-disable no-console */
import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockSyncNFTContractAddresses = [
  '0x7de3085b3190b3a787822ee16f23be010f5f8686'
];

export const mockSyncNFTContract = rest.put(`${EVM_API_ROOT}/nft/:address/sync`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (!mockSyncNFTContractAddresses.includes(address)) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      success: true, // TODO: check the correctness of this response
    }),
  );
});
