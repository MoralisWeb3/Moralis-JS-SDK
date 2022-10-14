import { rest } from 'msw';
import { AUTH_API_ROOT, MOCK_API_KEY } from '../config';

const MockResponse: Record<string, { data: any; status: number }> = {
  VALID_RESPONSE: {
    data: {
      id: 'fRyt67D3eRss3RrX',
      message:
        'defi.finance wants you to sign in with your Solana account:\n26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo\n\nI am a third party API\n\nURI: http://defi.finance\nVersion: 1\nNetwork: mainnet\nNonce: PYxxb9msdjVXsMQ9x\nIssued At: 2022-08-25T11:02:34.097Z\nExpiration Time: 2022-08-25T11:12:38.243Z\nResources:\n- https://docs.moralis.io/',
      profileId: '0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1',
    },
    status: 201,
  },
  INVALID_ADDRESS: {
    data: {
      statusCode: 400,
      name: 'BadRequestException',
      message: ['address must be longer than or equal to 44 characters'],
    },
    status: 400,
  },
  MULTI_ERROR: {
    data: {
      statusCode: 400,
      name: 'BadRequestException',
      message: ['domain must be a valid domain name', 'network should not be empty'],
    },
    status: 404,
  },
};

export const mockSolanaRequestChallenge = rest.post(`${AUTH_API_ROOT}/challenge/request/solana`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');
  const id = (req.body as Record<string, any>).statement as string;

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

  throw new Error('mockSolanaRequestChallenge: Not supported scenario');
});
