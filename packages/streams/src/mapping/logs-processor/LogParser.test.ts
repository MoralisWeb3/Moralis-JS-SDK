import { BigNumber } from 'ethers';

import { AbiItem, Log } from '@moralisweb3/streams-typings';

import { LogParam, LogParser } from './LogParser';

describe('LogParser', () => {
  function expectBigNumber(param: LogParam, expectedValue: string) {
    expect(BigNumber.isBigNumber(param.value)).toEqual(true);
    expect((param.value as BigNumber).toString()).toEqual(expectedValue);
  }

  it('reads Transfer event correctly', () => {
    const log: Log = {
      logIndex: '1',
      transactionHash: '0x13330587c90eb5efe8cd49a1da7314660d51cc0de35b97b6d423584459a5a643',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x0000000000000000000000000000000000000000000000000000000a79e31c40',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: '0x000000000000000000000000beefbabeea323f07c59926295205d3b7a17e8638',
      topic2: '0x00000000000000000000000088e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
      topic3: null,
    };
    const abiItems: AbiItem[] = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
    ];

    const { name, params } = new LogParser(abiItems).read(log);

    expect(name).toBe('Transfer');

    expect(params['from'].type).toEqual('address');
    expect(typeof params['from'].value).toBe('string');
    expect(params['from'].value).toEqual('0xBEEFBaBEeA323F07c59926295205d3b7a17E8638');

    expect(params['to'].type).toEqual('address');
    expect(typeof params['to'].value).toBe('string');
    expect(params['to'].value).toEqual('0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640');

    expect(params['value'].type).toEqual('uint256');
    expectBigNumber(params['value'], '44994600000');
  });

  it('reads Swap event correctly', () => {
    const log: Log = {
      logIndex: '242',
      transactionHash: '0xeaad25e6cc05765d8e8a4358aee9593f578495b22890fcc10000a0ea4f37c444',
      address: '0xed92bfe08de542bbb40fdbe0a27ca66313c0c457',
      data: '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b1c830beb6d62ce6300000000000000000000000000000000000000000000000000b521481ba091890000000000000000000000000000000000000000000000000000000000000000',
      topic0: '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
      topic1: '0x000000000000000000000000def1c0ded9bec7f1a1670819833240f027b25eff',
      topic2: '0x000000000000000000000000def1c0ded9bec7f1a1670819833240f027b25eff',
      topic3: null,
    };
    const abiItems: AbiItem[] = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount0In',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount1In',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount0Out',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount1Out',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
        ],
        name: 'Swap',
        type: 'event',
      },
    ];

    const { name, params } = new LogParser(abiItems).read(log);

    expect(name).toEqual('Swap');

    expect(params['amount0In'].type).toEqual('uint256');
    expectBigNumber(params['amount0In'], '0');

    expect(params['amount1In'].type).toEqual('uint256');
    expectBigNumber(params['amount1In'], '500116588950949383779');

    expect(params['amount0Out'].type).toEqual('uint256');
    expectBigNumber(params['amount0Out'], '50983564369498505');

    expect(params['amount1Out'].type).toEqual('uint256');
    expectBigNumber(params['amount1Out'], '0');
  });

  it('reads log with string argument correctly', () => {
    const log: Log = {
      logIndex: '111',
      transactionHash: '0x7306fc7e0f7d88e791219464acf1aae0d18573d8b11f03e836f51460bb5f2ed9',
      address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
      data: '0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000d9c2fea2771f200000000000000000000000000000000000000000000000000000000652569e30000000000000000000000000000000000000000000000000000000000000006626974636f730000000000000000000000000000000000000000000000000000',
      topic0: '0xca6abbe9d7f11422cb6ca7629fbf6fe9efb1c621f71ce8f02b9f2a230097404f',
      topic1: '0xe8ceaa0b6368653b230114926c9cb015f1dafa62a3f7ac854a2a246accf2061c',
      topic2: '0x000000000000000000000000909189c920e1c4c3bb4d29f3c6ab63030219a965',
      topic3: null,
    };
    const abiItems: AbiItem[] = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'label',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'cost',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'expires',
            type: 'uint256',
          },
        ],
        name: 'NameRegistered',
        type: 'event',
      },
    ];

    const { name, params } = new LogParser(abiItems).read(log);

    expect(name).toBe('NameRegistered');

    expect(params['name'].type).toBe('string');
    expect(params['name'].value).toBe('bitcos');

    expect(params['label'].type).toBe('bytes32');
    expect(params['label'].value).toBe('0xe8ceaa0b6368653b230114926c9cb015f1dafa62a3f7ac854a2a246accf2061c');

    expect(params['owner'].type).toBe('address');
    expect(params['owner'].value).toBe('0x909189C920E1c4c3Bb4D29f3c6aB63030219a965');

    expect(params['cost'].type).toBe('uint256');
    expectBigNumber(params['cost'], '3830904303088114');

    expect(params['expires'].type).toBe('uint256');
    expectBigNumber(params['expires'], '1696950755');
  });
});
