import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTransaction = rest.get(`${EVM_API_ROOT}/transaction/:transaction_hash`, (req, res, ctx) => {
  const transactionHash = req.params.transaction_hash as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (transactionHash === '0x4044044044044044044044044044044044044044044044044044044044044040') {
    return res(ctx.status(404));
  }

  if (transactionHash === '0x2000000000000000000000000000040440440440440440440440440440440440') {
    // false-positive
    return res(ctx.status(200), ctx.json({}));
  }

  if (transactionHash === '0x2c1150c5c8403d10714f840eb032a75f91f906c539601a4fc45835a1b830400e') {
    return res(
      ctx.status(200),
      ctx.json({
        hash: '0x2c1150c5c8403d10714f840eb032a75f91f906c539601a4fc45835a1b830400e',
        nonce: '4074269',
        transaction_index: '47',
        from_address: '0x0d0707963952f2fba59dd06f2b425ace40b492fe',
        to_address: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
        value: '0',
        gas: '1000000',
        gas_price: '16772103359',
        input:
          '0xa9059cbb00000000000000000000000025ed8d5b1f4eda0936e8d3af1192ad97c00d2bb6000000000000000000000000000000000000000000000000000000175df41590',
        receipt_cumulative_gas_used: '6561777',
        receipt_gas_used: '54549',
        receipt_contract_address: null,
        receipt_root: null,
        receipt_status: '1',
        block_timestamp: '2022-08-26T16:59:07.000Z',
        block_number: '15416552',
        block_hash: '0x6caa37832b07a45bcd637867e96758dee9f09ccd07ca51cb54802cc1968c505a',
        transfer_index: [15416552, 47],
        logs: [
          {
            log_index: '110',
            transaction_hash: '0x2c1150c5c8403d10714f840eb032a75f91f906c539601a4fc45835a1b830400e',
            transaction_index: '47',
            transaction_value: '0',
            address: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
            data: '0x000000000000000000000000000000000000000000000000000000175df41590',
            topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            topic1: '0x0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe',
            topic2: '0x00000000000000000000000025ed8d5b1f4eda0936e8d3af1192ad97c00d2bb6',
            topic3: null,
            block_timestamp: '2022-08-26T16:59:07.000Z',
            block_number: '15416552',
            block_hash: '0x6caa37832b07a45bcd637867e96758dee9f09ccd07ca51cb54802cc1968c505a',
            transfer_index: [15416552, 47, 110],
          },
        ],
      }),
    );
  }

  throw new Error('Not supported scenario');
});
