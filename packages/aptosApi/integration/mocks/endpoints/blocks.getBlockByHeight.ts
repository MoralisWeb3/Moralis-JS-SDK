import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetBlockByHeight = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetBlockByHeight',
    url: `/blocks/{block_height}`,
    getParams: ({ req }) => ({
      blockHeight: req.params.block_height,
      withTransactions: req.url.searchParams.get('with_transactions'),
    }),
  },
  [
    {
      condition: {
        blockHeight: '499540',
        withTransactions: true,
      },
      response: {
        block_height: '499540',
        block_hash: '0x5a5f8cd83acd6248c90108e5f21fc60b9efca44890aac91d66da02c03913ac9b',
        block_timestamp: '1665858020377412',
        first_version: '999999',
        last_version: '1000000',
        transactions: [
          {
            version: '999999',
            hash: '0xa64930fb0e18d93bd9183d262457cf0d7c27b52ca01d02fb8d736812b9e7454d',
            state_change_hash: '0xfac8fd76f793c857e4d1055e34b5d0a3896a01bfdade7c910f6a35cd93012802',
            event_root_hash: '0xf8ea6589995ae4479b04f4c5683d18991e86c7c8de86d317279591a8f5792cfa',
            state_checkpoint_hash: null,
            gas_used: '0',
            success: true,
            vm_status: 'Executed successfully',
            accumulator_root_hash: '0xdfa2cd5d5455cee92a4727913a8ad2f7691ec9c53f54d36e275897ea413976de',
            changes: [
              {
                address: '0x1',
                state_key_hash: '0x5ddf404c60e96e9485beafcabb95609fed8e38e941a725cae4dcec8296fb32d7',
                data: {
                  type: '0x1::block::BlockResource',
                  data: {
                    epoch_interval: '7200000000',
                    height: '499540',
                    new_block_events: {
                      counter: '499541',
                      guid: {
                        id: {
                          addr: '0x1',
                          creation_num: '3',
                        },
                      },
                    },
                    update_epoch_interval_events: {
                      counter: '0',
                      guid: {
                        id: {
                          addr: '0x1',
                          creation_num: '4',
                        },
                      },
                    },
                  },
                },
                type: 'write_resource',
              },
              {
                address: '0x1',
                state_key_hash: '0x8048c954221814b04533a9f0a9946c3a8d472ac62df5accb9f47c097e256e8b6',
                data: {
                  type: '0x1::stake::ValidatorPerformance',
                  data: {
                    validators: [
                      {
                        failed_proposals: '0',
                        successful_proposals: '11',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '19',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '18',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '8',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '8',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '40',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '24',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '8',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '16',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '25',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '31',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '50',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '37',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '44',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '102',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '5',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '9',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '7',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '10',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '7',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '186',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '183',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '173',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '179',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '203',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '164',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '183',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '197',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '165',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '170',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '124',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '13',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '6',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '13',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '6',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '11',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '13',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '7',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '5',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '5',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '14',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '9',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '5',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '205',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '9',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '173',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '13',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '11',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '7',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '7',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '163',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '208',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '10',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '8',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '46',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '6',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '130',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '19',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '5',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '7',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '8',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '7',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '174',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '181',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '127',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '164',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '8',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '7',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '32',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '6',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '11',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '7',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '6',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '69',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '29',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '29',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '26',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '12',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '180',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '175',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '10',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '186',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '12',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '6',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '190',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '5',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '172',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '57',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '48',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '183',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '155',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '153',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '7',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '5',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '165',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '173',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '181',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '131',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '137',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '22',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '146',
                      },
                      {
                        failed_proposals: '0',
                        successful_proposals: '10',
                      },
                    ],
                  },
                },
                type: 'write_resource',
              },
              {
                address: '0x1',
                state_key_hash: '0x7b1615bf012d3c94223f3f76287ee2f7bdf31d364071128b256aeff0841b626d',
                data: {
                  type: '0x1::timestamp::CurrentTimeMicroseconds',
                  data: {
                    microseconds: '1665858020377412',
                  },
                },
                type: 'write_resource',
              },
            ],
            id: '0x5a5f8cd83acd6248c90108e5f21fc60b9efca44890aac91d66da02c03913ac9b',
            epoch: '36',
            round: '6952',
            events: [
              {
                guid: {
                  creation_number: '3',
                  account_address: '0x1',
                },
                sequence_number: '499540',
                type: '0x1::block::NewBlockEvent',
                data: {
                  epoch: '36',
                  failed_proposer_indices: [],
                  hash: '0x5a5f8cd83acd6248c90108e5f21fc60b9efca44890aac91d66da02c03913ac9b',
                  height: '499540',
                  previous_block_votes_bitvec: '0xfdff091380163cc775ff6a93e0',
                  proposer: '0xc29a231581f243ddcbf97de8b93c8aabb466dd6912ce5ba12579ff2f13cb8da5',
                  round: '6952',
                  time_microseconds: '1665858020377412',
                },
              },
            ],
            previous_block_votes_bitvec: [253, 255, 9, 19, 128, 22, 60, 199, 117, 255, 106, 147, 224],
            proposer: '0xc29a231581f243ddcbf97de8b93c8aabb466dd6912ce5ba12579ff2f13cb8da5',
            failed_proposer_indices: [],
            timestamp: '1665858020377412',
            type: 'block_metadata_transaction',
          },
          {
            version: '1000000',
            hash: '0x01dd79a7ed3b885cbb2ad05fbe410963b8a8d92dadace11851233e76b533158b',
            state_change_hash: '0xafb6e14fe47d850fd0a7395bcfb997ffacf4715e0f895cc162c218e4a7564bc6',
            event_root_hash: '0x414343554d554c41544f525f504c414345484f4c4445525f4841534800000000',
            state_checkpoint_hash: '0x2e2476f44b95e361bde7236b0d72d66de862d4f3caca142cf33df34332370e15',
            gas_used: '0',
            success: true,
            vm_status: 'Executed successfully',
            accumulator_root_hash: '0xd9cfc4fb3f9f7f0be494ba0e0cc4ceadb6cd61da1865e82881250ca6749ac474',
            changes: [],
            timestamp: '1665858020377412',
            type: 'state_checkpoint_transaction',
          },
        ],
        __headers: {
          date: 'Fri, 10 Mar 2023 08:49:46 GMT',
          'content-type': 'application/json',
          'content-length': '8372',
          connection: 'close',
          'x-aptos-chain-id': '1',
          'x-aptos-ledger-version': '99731525',
          'x-aptos-ledger-oldest-version': '0',
          'x-aptos-ledger-timestampusec': '1678438185336840',
          'x-aptos-epoch': '1786',
          'x-aptos-block-height': '38227763',
          'x-aptos-oldest-block-height': '0',
        },
      },
    },
  ],
);
