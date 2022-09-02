import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTokenMetadata = rest.get(`${EVM_API_ROOT}/erc20/metadata`, (req, res, ctx) => {
  const addresses = req.url.searchParams.get('addresses[]') as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (addresses === '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce') {
    return res(
      ctx.status(200),
      ctx.json([
        {
          address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
          name: 'SHIBA INU',
          symbol: 'SHIB',
          decimals: '18',
          logo: 'https://cdn.moralis.io/eth/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.png',
          logo_hash: '0dba9c0d492b42b3a73c5ceee62b205568a8b5c1932cac048ccd71cbbe051690',
          thumbnail: 'https://cdn.moralis.io/eth/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce_thumb.png',
          block_number: null,
          validated: null,
          created_at: '2022-01-20T10:39:55.818Z',
        },
      ]),
    );
  }

  throw new Error('getTokenMetadata: Not supported scenario');
});
