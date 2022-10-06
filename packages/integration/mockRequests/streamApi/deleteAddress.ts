import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

const createResponse = (streamId: string, address: string) => ({
  streamId,
  address,
});

const createErrorResponse = (message: string) => ({
  message,
});

// message: 'Validation Failed',
// details: { 'requestBody.address': { message: "'address' is required" } }

const scenarios = [
  {
    condition: {
      id: 'VALID_RESPONSE',
      address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
    },
    responseStatus: 200,
    response: createResponse('VALID_RESPONSE', '0x992eccc191d6f74e8be187ed6b6ac196b08314f7'),
  },
  {
    condition: {
      id: 'INVALID_ADDRESS',
      address: 'some-address',
    },
    responseStatus: 400,
    response: createErrorResponse('Invalid Address: some-address'),
  },
  {
    condition: {
      id: 'STREAM_NOT_FOUND',
      address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
    },
    responseStatus: 404,
    response: createErrorResponse('Stream not found'),
  },
  {
    condition: {
      id: 'ADDRESS_NOT_FOUND',
      address: '0x295522b61890c3672d12efbff4358a6411ce996f',
    },
    responseStatus: 404,
    response: createErrorResponse('Address not found'),
  },
];

export const mockDeleteAddressEvm = rest.delete(`${STREAM_API_ROOT}/streams/evm/:id/address`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');
  const id = req.params.id as string;
  const { address } = req.body as Record<string, any>;

  if (apiKey !== MOCK_API_KEY) {
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Api Key Not Present',
      }),
    );
  }

  const params = omitBy({ id, address }, isNil);

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const scenario = scenarios.find(({ condition }) => isEqual(condition, params));

  if (scenario) {
    return res(ctx.status(scenario.responseStatus), ctx.json(scenario.response));
  }

  throw new Error(`mockDeleteAddressEvm failed, no scenarios with: ${JSON.stringify(params)}`);
});
