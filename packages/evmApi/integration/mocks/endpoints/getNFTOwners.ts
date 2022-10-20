import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

const owner = {
  token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  token_id: '8152',
  owner_of: '0x7ea7ccaecd27371be870b507e41058ddc5dea8f8',
  block_number: '15458263',
  block_number_minted: '12347191',
  token_hash: 'c7218c4f0b780b7e7f17251ec12e94a2',
  amount: '1',
  contract_type: 'ERC721',
  name: 'BoredApeYachtClub',
  symbol: 'BAYC',
  token_uri: 'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/8152',
  metadata:
    '{"image":"ipfs://Qma2RuGQTMuYhFVwn3D4ipdjmM37KUDwYFxFgLnnyddSx6","attributes":[{"trait_type":"Fur","value":"Blue"},{"trait_type":"Clothes","value":"Guayabera"},{"trait_type":"Background","value":"Army Green"},{"trait_type":"Mouth","value":"Bored"},{"trait_type":"Earring","value":"Silver Hoop"},{"trait_type":"Eyes","value":"Angry"}]}',
  last_token_uri_sync: '2022-05-18T22:09:10.799Z',
  last_metadata_sync: '2022-05-16T15:47:08.669Z',
};

export const mockGetNFTOwners = rest.get(`${EVM_API_ROOT}/nft/:address/owners`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');
  const cursor = req.url.searchParams.get('cursor');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (address === '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D') {
    if (!cursor) {
      return res(
        ctx.status(200),
        ctx.json({
          total: 150,
          page: 1,
          page_size: 100,
          cursor: 'page_1',
          result: Array(100).fill(owner),
        }),
      );
    }
    if (cursor === 'page_1') {
      return res(
        ctx.status(200),
        ctx.json({
          total: 150,
          page: 2,
          page_size: 100,
          cursor: 'page_2',
          result: Array(50).fill(owner),
        }),
      );
    }
  }

  throw new Error('getNFTOwners: Not supported scenario');
});
