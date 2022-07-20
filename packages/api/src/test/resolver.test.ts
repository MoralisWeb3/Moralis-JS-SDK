import { ApiFormatType } from '../ApiResultAdapter';
import { setupApi, cleanApi, MockApi } from './setup';

const endpointWeightsRawResult = {
  endpoint: 'getBlock',
  weight: '8',
};

const endpointWeightsTransformedResult = {
  endpoint: 'getBlock',
  weight: 8,
};

const eventRawResult = [
  {
    transaction_hash: '0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    block_timestamp: '2021-04-02T10:07:54.000Z',
    block_number: '12526958',
    block_hash: '0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86',
    data: {
      from: '0x54ff6974c715956a5049a123408bff91fbe29f01',
      to: '0x74de5d4fcbf63e00296fd95d33236b9794016631',
      value: '260103496340000000000',
    },
  },
];

const expectedAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const ABI = {
  anonymous: false,
  inputs: [
    { indexed: true, name: 'from', type: 'address' },
    { indexed: true, name: 'to', type: 'address' },
    { indexed: false, name: 'value', type: 'uint256' },
  ],
  name: 'Transfer',
  type: 'event',
};

describe('ApiResolver', () => {
  let api: MockApi;
  beforeAll(() => {
    api = setupApi();
  });

  afterAll(() => {
    cleanApi();
  });
  it('should test api resolver functions with get request', async () => {
    const resolver = await api.endpoints.endpointWeights();
    expect(resolver.raw).toStrictEqual(endpointWeightsRawResult);
    expect(resolver.toJSON()).toStrictEqual(endpointWeightsRawResult);
    expect(resolver.result).toStrictEqual(endpointWeightsTransformedResult);
    expect(resolver.format(ApiFormatType.NORMAL)).toStrictEqual(endpointWeightsTransformedResult);
    expect(resolver.format(ApiFormatType.RAW)).toStrictEqual(endpointWeightsRawResult);
    expect(() => resolver.format('legacy' as any)).toThrowErrorMatchingInlineSnapshot(
      `"[A0001] provided formatType not supported"`,
    );
  });

  it('should test api resolver functions with post request and pagination', async () => {
    const resolver = await api.endpoints.getContractEvents({
      chain: 'eth',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      limit: 2,
      abi: ABI,
    });
    expect(resolver.raw.total).toStrictEqual(10);
    expect(resolver.raw.page_size).toStrictEqual(2);
    expect(resolver.raw.result).toStrictEqual(eventRawResult);
    expect(resolver.result[0].address.format()).toBe(expectedAddress.toLowerCase());
  });

  it('should test next call', async () => {
    const resolver = await api.endpoints.getContractEvents({
      chain: 'eth',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      limit: 3,
      abi: ABI,
    });
    const callSpy = jest.fn(async () => await resolver.next());
    const result = await callSpy();
    expect(result.raw.total).toStrictEqual(10);
    expect(result.raw.result).toStrictEqual(eventRawResult);
    expect(callSpy).toBeCalledTimes(1);
  });
});
