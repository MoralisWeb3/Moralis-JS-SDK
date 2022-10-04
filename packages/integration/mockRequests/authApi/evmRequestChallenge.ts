import { rest } from 'msw';
import { AUTH_API_ROOT, MOCK_API_KEY } from '../config';

const MockResponse: Record<string, { data: any; status: number }> = {
  VALID_RESPONSE: {
    data: {
      id: 'x8yok3wHhgfAOCfPx',
      message:
        'defi.finance wants you to sign in with your Ethereum account:\n0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B\n\n\nURI: https://defi.finance/\nVersion: 1\nChain ID: 1\nNonce: 984ge9Yuc9gLTMEJO\nIssued At: 2022-09-29T13:10:23.832Z',
      profileId: '0xed330cc4d7da53313bc7480dcdfcb876c05b94926e6156e3bd8667c0c542277b',
    },
    status: 201,
  },
  INVALID_ADDRESS: {
    data: {
      statusCode: 400,
      name: 'BadRequestException',
      message: ['address must be an Ethereum address'],
    },
    status: 400,
  },
  MULTI_ERROR: {
    data: {
      statusCode: 400,
      name: 'BadRequestException',
      message: ['domain must be a valid domain name', 'address must be an Ethereum address'],
    },
    status: 400,
  },
};

export const mockEvmRequestChallenge = rest.post(`${AUTH_API_ROOT}/challenge/request/evm`, (req, res, ctx) => {
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

  throw new Error('mockEvmRequestChallenge: Not supported scenario');
});
