import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetNFTTransfersByBlocks: Record<string, number> = {
  '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171': 3,
};

export const mockGetNFTTransfersByBlock = rest.get(
  `${EVM_API_ROOT}/block/:blockNumberOrHash/nft/transfers`,
  (req, res, ctx) => {
    const blockNumberOrHash = req.params.blockNumberOrHash as string;
    const apiKey = req.headers.get('x-api-key');

    if (apiKey !== MOCK_API_KEY) {
      return res(ctx.status(401));
    }

    const value = mockGetNFTTransfersByBlocks[blockNumberOrHash];

    if (!value) {
      return res(ctx.status(404));
    }

    return res(
      ctx.status(200),
      ctx.json({
        total: value,
      }),
    );
  },
);
