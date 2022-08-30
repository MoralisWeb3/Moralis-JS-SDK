import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetNFTMetada = rest.get(`${EVM_API_ROOT}/nft/:address/metadata`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (address === '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d') {
    return res(
      ctx.status(200),
      ctx.json({
        token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
        name: 'BoredApeYachtClub',
        symbol: 'BAYC',
        contract_type: 'ERC721',
        synced_at: '2021-09-12T00:00:00.000Z',
      }),
    );
  }

  if (address === '0x4044044044044044044044044044044044044040') {
    return res(ctx.status(404));
  }

  throw new Error('Not supported scenario');
});
