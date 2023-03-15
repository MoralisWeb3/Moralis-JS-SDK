import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetTransactions = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetTransactions',
    url: `/transactions`,
    getParams: ({ req }) => ({
      limit: req.url.searchParams.get('limit'),
      start: req.url.searchParams.get('start'),
    }),
  },
  [
    {
      condition: {
        limit: '5',
        start: '1020304',
      },
      response: [
        {
          version: '101767115',
          hash: '0xc3bfd1e81c285ec6315df3a37ca3bcb38fa8319a722928062ecbb22e529124ef',
          state_change_hash: '0xafb6e14fe47d850fd0a7395bcfb997ffacf4715e0f895cc162c218e4a7564bc6',
          event_root_hash: '0x414343554d554c41544f525f504c414345484f4c4445525f4841534800000000',
          state_checkpoint_hash: '0xd9a62c10068075be552ca39abfe36a91ebb9dbed7fb98a626c303a00269653ae',
          gas_used: '0',
          success: true,
          vm_status: 'Executed successfully',
          accumulator_root_hash: '0x86a1e4e197e6a819f4a8ab81719f0823068ee82b60203f4af2494c40870f2850',
          changes: [],
          timestamp: '1678784641610692',
          type: 'state_checkpoint_transaction',
        },
        {
          type: 'user_transaction',
          version: '101768014',
          hash: '0xf060156ddf08ebd25e8ca09630f092dc6bc379a15081b63bcad7b2796dddb721',
          state_change_hash: '0x8000aa4a61aaa1d91e775c53697df854e2b8fc2deaed255fffb496cf8a168167',
          event_root_hash: '0x37d63cf1687c0e986bae647a2beb6974d20b7769d65dfee3e1906613333bcd99',
          state_checkpoint_hash: null,
          gas_used: '94032',
          success: true,
          vm_status: 'Executed successfully',
          accumulator_root_hash: '0xd4db8e9e6f0eb65d436f8bf295bf26ee14effb14049a9723f35a2b1217a2fdc6',
          changes: [
            {
              type: 'write_resource',
              address: '0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
              state_key_hash: '0xa5c1960ea1a6122abf7736670aced7aa7d717c620d97b60bfbd75b5cf99a6564',
              data: {
                type: '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::dao_storage::Storage<0x1::aptos_coin::AptosCoin, 0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Stable>',
                data: {
                  coin_x: {
                    value: '2489087327',
                  },
                  coin_y: {
                    value: '2425082827',
                  },
                },
              },
            },
            {
              type: 'write_resource',
              address: '0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
              state_key_hash: '0xc8830812f9a59e771ad4769827911d8e3bb490db6e6a6f4d691a7cac54fc8427',
              data: {
                type: '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::dao_storage::EventsStore<0x1::aptos_coin::AptosCoin, 0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Stable>',
                data: {
                  coin_deposited_handle: {
                    counter: '5593',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3567',
                      },
                    },
                  },
                  coin_withdrawn_handle: {
                    counter: '0',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3568',
                      },
                    },
                  },
                  storage_registered_handle: {
                    counter: '1',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3566',
                      },
                    },
                  },
                },
              },
            },
            {
              type: 'write_resource',
              address: '0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
              state_key_hash: '0x4e6539ffc3100ba291c0d9b959891ad0aafd3d06b92d4c0037e08571d6e043cb',
              data: {
                type: '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::liquidity_pool::EventsStore<0x1::aptos_coin::AptosCoin, 0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Stable>',
                data: {
                  flashloan_handle: {
                    counter: '447',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3573',
                      },
                    },
                  },
                  liquidity_added_handle: {
                    counter: '2435',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3570',
                      },
                    },
                  },
                  liquidity_removed_handle: {
                    counter: '1111',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3571',
                      },
                    },
                  },
                  oracle_updated_handle: {
                    counter: '9125',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3574',
                      },
                    },
                  },
                  pool_created_handle: {
                    counter: '1',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3569',
                      },
                    },
                  },
                  swap_handle: {
                    counter: '5146',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3572',
                      },
                    },
                  },
                  update_dao_fee_handle: {
                    counter: '0',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3576',
                      },
                    },
                  },
                  update_fee_handle: {
                    counter: '0',
                    guid: {
                      id: {
                        addr: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
                        creation_num: '3575',
                      },
                    },
                  },
                },
              },
            },
            {
              type: 'write_resource',
              address: '0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
              state_key_hash: '0x60699800ccfd4514b1e001ece1fbaf19410ec133488192df947327dbf3c4f203',
              data: {
                type: '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::liquidity_pool::LiquidityPool<0x1::aptos_coin::AptosCoin, 0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Stable>',
                data: {
                  coin_x_reserve: {
                    value: '553205830119',
                  },
                  coin_y_reserve: {
                    value: '358089091860',
                  },
                  dao_fee: '33',
                  fee: '4',
                  last_block_timestamp: '1678784785',
                  last_price_x_cumulative: '253221064508263891425774847',
                  last_price_y_cumulative: '241870992775038158520396755',
                  locked: false,
                  lp_burn_cap: {
                    dummy_field: false,
                  },
                  lp_mint_cap: {
                    dummy_field: false,
                  },
                  x_scale: '100000000',
                  y_scale: '100000000',
                },
              },
            },
            {
              type: 'write_resource',
              address: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
              state_key_hash: '0x4af5eeb46d81d1bd89ef42c298b386caa39f50462bc167450e046cc54d28978c',
              data: {
                type: '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>',
                data: {
                  coin: {
                    value: '317050537',
                  },
                  deposit_events: {
                    counter: '15',
                    guid: {
                      id: {
                        addr: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
                        creation_num: '2',
                      },
                    },
                  },
                  frozen: false,
                  withdraw_events: {
                    counter: '9',
                    guid: {
                      id: {
                        addr: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
                        creation_num: '3',
                      },
                    },
                  },
                },
              },
            },
            {
              type: 'write_resource',
              address: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
              state_key_hash: '0x6f60a6a2831028b75c0272b6d4b8c81c8ffdd2279ed4ae12349056506adb6f92',
              data: {
                type: '0x1::coin::CoinStore<0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin>',
                data: {
                  coin: {
                    value: '0',
                  },
                  deposit_events: {
                    counter: '1',
                    guid: {
                      id: {
                        addr: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
                        creation_num: '16',
                      },
                    },
                  },
                  frozen: false,
                  withdraw_events: {
                    counter: '1',
                    guid: {
                      id: {
                        addr: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
                        creation_num: '17',
                      },
                    },
                  },
                },
              },
            },
            {
              type: 'write_resource',
              address: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
              state_key_hash: '0x2281cc63f5248c4fa1f61df4e52de0e829fb0c453e4d1a03bba1bb947a9c4f02',
              data: {
                type: '0x1::account::Account',
                data: {
                  authentication_key: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
                  coin_register_events: {
                    counter: '7',
                    guid: {
                      id: {
                        addr: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
                        creation_num: '0',
                      },
                    },
                  },
                  guid_creation_num: '20',
                  key_rotation_events: {
                    counter: '0',
                    guid: {
                      id: {
                        addr: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
                        creation_num: '1',
                      },
                    },
                  },
                  rotation_capability_offer: {
                    for: {
                      vec: [],
                    },
                  },
                  sequence_number: '34',
                  signer_capability_offer: {
                    for: {
                      vec: [],
                    },
                  },
                },
              },
            },
            {
              type: 'write_table_item',
              state_key_hash: '0x6e4b28d40f98a106a65163530924c0dcb40c1349d3aa915d108b4d6cfc1ddb19',
              handle: '0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca',
              key: '0x0619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935',
              value: '0x2990db5f41e96b010000000000000000',
              data: {
                key: '0x619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935',
                key_type: 'address',
                value: '102431883536338985',
                value_type: 'u128',
              },
            },
          ],
          sender: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
          sequence_number: '33',
          max_gas_amount: '112763',
          gas_unit_price: '100',
          expiration_timestamp_secs: '1678784904',
          payload: {
            type: 'entry_function_payload',
            function: '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::scripts_v2::swap_unchecked',
            type_arguments: [
              '0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin',
              '0x1::aptos_coin::AptosCoin',
              '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Stable',
            ],
            arguments: ['300000000', '305853186'],
          },
          signature: {
            type: 'ed25519_signature',
            signature:
              '0xbbac8284e434f3915affbf524c0ba380ea15fb2ca29ba8483518a3cd0d423f2534f1182c0d84b466dcfbe4c8f8965dc6032d3be1dbb848d0cf7e9b090813380f',
            public_key: '0xb861591a8d6485617a3c85d42696a7ff6f17ede1fb4150f8ffe84d23978fb80a',
          },
          events: [
            {
              guid: {
                creation_number: '17',
                account_address: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
              },
              sequence_number: '0',
              type: '0x1::coin::WithdrawEvent',
              data: {
                amount: '300000000',
              },
            },
            {
              guid: {
                creation_number: '3567',
                account_address: '0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
              },
              sequence_number: '5592',
              type: '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::dao_storage::CoinDepositedEvent<0x1::aptos_coin::AptosCoin, 0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Stable>',
              data: {
                x_val: '0',
                y_val: '60000',
              },
            },
            {
              guid: {
                creation_number: '3574',
                account_address: '0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
              },
              sequence_number: '9124',
              type: '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::liquidity_pool::OracleUpdatedEvent<0x1::aptos_coin::AptosCoin, 0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Stable>',
              data: {
                last_price_x_cumulative: '253221064508263891425774847',
                last_price_y_cumulative: '241870992775038158520396755',
              },
            },
            {
              guid: {
                creation_number: '3572',
                account_address: '0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
              },
              sequence_number: '5145',
              type: '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::liquidity_pool::SwapEvent<0x1::aptos_coin::AptosCoin, 0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Stable>',
              data: {
                x_in: '0',
                x_out: '305853186',
                y_in: '300000000',
                y_out: '0',
              },
            },
            {
              guid: {
                creation_number: '2',
                account_address: '0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9',
              },
              sequence_number: '14',
              type: '0x1::coin::DepositEvent',
              data: {
                amount: '305853186',
              },
            },
          ],
          timestamp: '1678784785538159',
        },
      ],
    },
  ],
);
