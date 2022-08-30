import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetNFTLowestPrice = rest.get(`${EVM_API_ROOT}/nft/:address/lowestprice`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (address === '0x4044044044044044044044044044044044044040') {
    return res(ctx.status(404));
  }

  if (address === '0x2000000000000000000404404404404404404404') {
    return res(ctx.status(200), ctx.json(null));
  }

  if (address === '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D') {
    return res(
      ctx.status(200),
      ctx.json({
        transaction_hash: '0x6abc903573c0a615797ff9b88564ea59de7bef48966e93d4d181ef42dbb86f18',
        transaction_index: '310',
        token_ids: ['127'],
        seller_address: '0x1254958bd5073c6b238e516298f0c48f6f60a78e',
        buyer_address: '0xcd2854b46c7e553d530eab029712ad205ba6ed02',
        token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
        marketplace_address: '0x00000000006c3852cbef3e08e8df289169ede581',
        price: '66990000000000000000',
        block_timestamp: '2022-08-24T07:47:01.000Z',
        block_number: '15401671',
        block_hash: '0x69de52caa13ac1c165d6b408a47f7ed79cef12280d1d26099d9c0d2b63b52626',
      }),
    );
  }

  throw new Error('Not supported scenario');
});
