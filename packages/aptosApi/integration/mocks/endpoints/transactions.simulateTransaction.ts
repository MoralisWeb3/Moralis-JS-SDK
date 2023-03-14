import { MockScenarios } from '@moralisweb3/test-utils';

export const mockSimulateTransaction = MockScenarios.create(
  {
    method: 'post',
    name: 'mockSimulateTransaction',
    url: `/transactions/simulate`,
    getParams: ({ reqBody }) => {
      return {
        body: reqBody,
      };
    },
  },
  [
    {
      condition: {
        body: {
          sender: '0x9efbf0ccb6c07dcab7dc1e3c88024ce4adc49f175bdd8d0ebb672c5262c5b3be',
          sequence_number: '1000',
          max_gas_amount: '20000000',
          gas_unit_price: '10000000',
          expiration_timestamp_secs: '1000000',
          payload: {
            type: 'entry_function_payload',
            function: '0xc7ea756470f72ae761b7986e4ed6fd409aad183b1b2d3d2f674d979852f45c4b::piece_swap::update_price_2',
            type_arguments: [
              '0x1::aptos_coin::AptosCoin',
              '0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T',
              '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC',
            ],
            arguments: ['12178', '993'],
          },
          signature: {
            type: 'ed25519_signature',
            signature:
              '0xbbac8284e434f3915affbf524c0ba380ea15fb2ca29ba8483518a3cd0d423f2534f1182c0d84b466dcfbe4c8f8965dc6032d3be1dbb848d0cf7e9b090813380f',
            public_key: '0xb861591a8d6485617a3c85d42696a7ff6f17ede1fb4150f8ffe84d23978fb80a',
          },
        },
      },
      response: {
        type: 'state_checkpoint_transaction',
        version: '101757643',
        hash: '0xeb8aa70b16ed578c1ae82c7031a695884a0c695c7f3dad09efddee15267eb4a9',
        state_change_hash: '0xafb6e14fe47d850fd0a7395bcfb997ffacf4715e0f895cc162c218e4a7564bc6',
        event_root_hash: '0x414343554d554c41544f525f504c414345484f4c4445525f4841534800000000',
        state_checkpoint_hash: '0xc99f17342d6dcdc15f8dc382b1b42f5d1b6eddda7800291fd6810710014baa4c',
        gas_used: '0',
        success: true,
        vm_status: 'Executed successfully',
        accumulator_root_hash: '0x6eee6b4b630bb94eb102816d60607faf9be0759ab1c5d4100da66f3639e9164f',
        changes: [],
        timestamp: '1678783213889401',
      },
    },
  ],
);
