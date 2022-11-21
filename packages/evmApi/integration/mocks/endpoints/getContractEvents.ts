import { MockScenarios } from '@moralisweb3/test-utils';

const createResponse = (address: string) => ({
  total: 12,
  page: 0,
  page_size: 100,
  cursor: null,
  result: [
    {
      transaction_hash: '0xc9f62f4f6ab505a96c1a84ec2899c6bfd86245ef1effaa689fc997798be763d5',
      address,
      block_timestamp: '2022-03-05T13:45:42.000Z',
      block_number: '14327217',
      block_hash: '0x1bb168d2725d15b12604c92a83c529617cd54a415c5d610a687f7859d45f9ea5',
      data: {
        from: '0x21f510cc9f81df4e4d2c705e672761cf487cdc5a',
        to: '0x54e41aa7ac19efd71d19a3ca6b8a6c0154fe3afb',
        value: '878000000',
      },
    },
  ],
});

export const mockGetContractEvents = MockScenarios.create(
  {
    name: 'mockGetContractEvents',
    method: 'post',
    getParams: (req) => ({
      address: req.params.address,
      chain: req.url.searchParams.get('chain'),
      topic: req.url.searchParams.get('topic'),
      from_block: req.url.searchParams.get('from_block'),
      to_block: req.url.searchParams.get('to_block'),
      from_date: req.url.searchParams.get('from_date'),
      to_date: req.url.searchParams.get('to_date'),
    }),
    url: '/:address/events',
  },
  [
    {
      condition: {
        chain: '0x89',
        address: '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
        topic: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
        from_block: '14327217',
        to_block: '14327217',
        from_date: '2022-03-05T13:45:42.000Z',
        to_date: '2022-03-05T13:45:42.000Z',
      },
      response: createResponse('0x2953399124f0cbb46d2cbacd8a89cf0599974963'),
    },
  ],
);
