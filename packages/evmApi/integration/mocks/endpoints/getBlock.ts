import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetBlock = MockScenarios.create(
  {
    name: 'mockGetBlock',
    getParams: (req) => ({
      chain: req.url.searchParams.get('chain'),
      block_number_or_hash: req.params.block_number_or_hash,
      subdomain: req.url.searchParams.get('subdomain'),
    }),
    url: '/block/:block_number_or_hash',
    method: 'get',
  },
  [
    {
      condition: {
        block_number_or_hash: '200404',
        chain: '0x5',
      },
      response: createErrorResponse('null'),
      responseStatus: 404,
    },
    {
      condition: {
        block_number_or_hash: '404',
        chain: '0x5',
      },
      response: createErrorResponse('Block not found'),
      responseStatus: 404,
    },
    {
      condition: {
        block_number_or_hash: '15416422',
        chain: '0x5',
      },
      response: {
        timestamp: '2022-08-26T16:29:16.000Z',
        number: '15416422',
        hash: '0xea1f77d395510ac0ef2db2aed828caf92d2c7ba4ce5632ab23b5f7078a5d6a49',
        parent_hash: '0x2ffdc0f3251d659084d75693e2c666b18cef170c2354b78582b8969963a521c6',
        nonce: '0x0800000010d602ad',
        sha3_uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        logs_bloom:
          '0xbfaecfaded6e214594ba4b50aeed76fda623bf2ad7aaf3665db7ddde77bfb997b7ff77f27f7fa4fbd4a1db2ffed5493ff6fbf738af1abb34febf5a4dcd79e7faeed2d6effe284fffafba7c9b5f6c68aeb65f76bf9ddb1cdf694c5d63abead72aff2cdfd79a9f92ee7cfc7ed88f5bff59fe5ec77f575a3ffccfa7f4d849fba6f62b79972b3a97bb9eb9dfbcc729e77eb6fcd09fc7c1fccdfdafa2f244f89f9fbffad7fffffbe8ef7eda3f6eeecdda4c564df6ea2ee016e1e3efbf3eef135b347eb52bdd7bee0289ffefbefe629febdfd567eef67eddbab7fcff5dfb2f7013e8ed6bf2e77efe17cbadd7869fa059d43bd2574f076c044be2dfc89ebe99ffc87379',
        transactions_root: '0xd7552c2a7aa92b9c7f6ab6c554bf27603e0f8113938733fb2ebc897aed40ed6f',
        state_root: '0xa46db975b020e3e24f494eead15e28c0e006994abe16a5fc960384fa5515d2ce',
        receipts_root: '0x0a9294c3525f876d9c68aeddd5c51506305e0d8977c99685618fdbbbe64b6320',
        miner: '0x28846f1Ec065eEa239152213373bb58B1C9Fc93B',
        difficulty: '12255480291787608',
        total_difficulty: '57260778716903350000000',
        size: '169401',
        extra_data: '0x73706574683232970240d6',
        gas_limit: '29999972',
        gas_used: '29943737',
        transaction_count: '303',
        base_fee_per_gas: '32994072223',
        transactions: [
          {
            hash: '0xb45264df0f30e73bc2baaff475054e85c6ced80ba23daa47505c30fe1fbc6738',
            nonce: '1',
            transaction_index: '185',
            from_address: '0xa7b1358cfb2da4ca8bbe3030c9a467be86eb1420',
            to_address: '0x723e0dbdca9a413f5bb5866480036c37caef78b2',
            value: '656258361135408900',
            gas: '21000',
            gas_price: '34494072223',
            input: '0x',
            receipt_cumulative_gas_used: '17310932',
            receipt_gas_used: '21000',
            receipt_contract_address: null,
            receipt_root: null,
            receipt_status: '1',
            block_timestamp: '2022-08-26T16:29:16.000Z',
            block_number: '15416422',
            block_hash: '0xea1f77d395510ac0ef2db2aed828caf92d2c7ba4ce5632ab23b5f7078a5d6a49',
            transfer_index: [15416422, 185],
          },
        ],
      },
    },
  ],
);
