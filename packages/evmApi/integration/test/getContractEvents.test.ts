import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

const ERC721_ABI_ITEM = {
  anonymous: false,
  inputs: [
    {
      indexed: true,
      internalType: 'address',
      name: 'operator',
      type: 'address',
    },
    {
      indexed: true,
      internalType: 'address',
      name: 'from',
      type: 'address',
    },
    {
      indexed: true,
      internalType: 'address',
      name: 'to',
      type: 'address',
    },
    {
      indexed: false,
      internalType: 'uint256',
      name: 'id',
      type: 'uint256',
    },
    {
      indexed: false,
      internalType: 'uint256',
      name: 'value',
      type: 'uint256',
    },
  ],
  name: 'TransferSingle',
  type: 'event',
};

describe('getContractEvents', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns events', async () => {
    const { result, pagination } = await evmApi.events.getContractEvents({
      chain: 137, // Polygon
      address: '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
      abi: ERC721_ABI_ITEM,
      topic: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
      fromBlock: 14327217,
      toBlock: 14327217,
      fromDate: '2022-03-05T13:45:42.000Z',
      toDate: '2022-03-05T13:45:42.000Z',
    });

    const event = result[0]!;

    expect(event).toBeDefined();
    expect(pagination.total).toBe(12);
    expect(event.address.lowercase).toBe('0x2953399124f0cbb46d2cbacd8a89cf0599974963');
    expect(event.blockNumber.toString()).toBe('14327217');
    expect(event.data.value?.wei).toBe('878000000');
  });
});
