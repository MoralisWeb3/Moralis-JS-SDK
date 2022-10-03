import { rest } from 'msw';
import { AUTH_API_ROOT, MOCK_API_KEY } from '../config';

const MockResponse: Record<string, { data: any; status: number }> = {
  VALID_RESPONSE: {
    data: {
      id: 'fRyt67D3eRss3RrX',
      domain: 'defi.finance',
      network: 'mainnet',
      address: 'DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHmZEYC8RTb',
      statement: 'Please confirm',
      uri: 'https://defi.finance/',
      expirationTime: '2020-01-01T00:00:00.000Z',
      notBefore: '2020-01-01T00:00:00.000Z',
      resources: ['https://docs.moralis.io/'],
      version: '1.0',
      nonce: '0x1234567890abcdef0123456789abcdef1234567890abcdef',
      profileId: '0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1',
    },
    status: 201,
  },

  INVALID_SIGNATURE: {
    data: {
      statusCode: 400,
      name: 'BadRequestException',
      message: 'Invalid Signature',
    },
    status: 400,
  },

  MULTI_ERROR: {
    data: {
      statusCode: 400,
      name: 'BadRequestException',
      message: ['message must be present', 'signature must be present'],
    },
    status: 400,
  },
};

export const mockSolanaVerify = rest.post(`${AUTH_API_ROOT}/challenge/verify/solana`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');
  const id = (req.body as Record<string, any>).message as string;

  if (apiKey !== MOCK_API_KEY) {
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Api Key Not Present',
      }),
    );
  }

  if (MockResponse[id]) {
    return res(ctx.status(MockResponse[id].status), ctx.json(MockResponse[id].data));
  }

  throw new Error('mockSolanaVerify: Not supported scenario');
});
