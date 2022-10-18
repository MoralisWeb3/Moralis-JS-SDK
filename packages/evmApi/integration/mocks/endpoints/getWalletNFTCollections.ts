import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

const collections: Record<string, any> = {
  '0x3514980793dceae1b34d0144e3ae725bee084a70': {
    total: 1,
    page_size: 100,
    page: 1,
    status: 'SYNCED',
    cursor: null,
    result: [
      {
        token_address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        contract_type: 'ERC721',
        name: 'Test NFT',
        symbol: 'TEST',
      },
    ],
  },
};

export const mockGetWalletNFTCollections = rest.get(`${EVM_API_ROOT}/:address/nft/collections`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = collections[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(ctx.status(200), ctx.json(value));
});
