import { BigNumber } from '@ethersproject/bignumber';

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

  it('reads log correctly when internally @ethersproject/abi return an instance of Indexed class', () => {
    const log: Log = {
      logIndex: '10',
      transactionHash: '0x51ece41e15b9bec389ecdba5fc42366e40904ee0a7588a8bd0731f625c5fd0a1',
      address: '0xca052c2c5ca7cf81c5d47ca6f1dcd5803d491365',
      data: '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000183633393139666535313833326161656138396637633733360000000000000000',
      topic0: '0x5cc8a983927b60e71d90ba4fbf642eb3e461d4eeefca2c1e5789a99d0f1263f1',
      topic1: '0x000000000000000000000000a71c821a533fbc68247e729908d485abc14729c1',
      topic2: '0xdd59c5286381d1e7091e99aa5732fa35b875b732751f8764ff13f675c48acb25',
      topic3: null,
    };
    const abiItems: AbiItem[] = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'chef',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'string',
            name: 'rewardNFT',
            type: 'string',
          },
        ],
        name: 'NewNFTChefContract',
        type: 'event',
      },
    ];

    const { name, params } = new LogParser(abiItems).read(log);

    expect(name).toBe('NewNFTChefContract');
    expect(params['id'].value).toBe('63919fe51832aaea89f7c736');
    expect(params['chef'].value).toBe('0xA71c821A533FBc68247e729908D485AbC14729c1');
    expect(params['rewardNFT'].value).toBe('0xdd59c5286381d1e7091e99aa5732fa35b875b732751f8764ff13f675c48acb25');
  });

  it('reads log correctly when one of input is unindexed int192[]', () => {
    const log: Log = {
      logIndex: '102',
      transactionHash: '0xa6fcc35012aea45aff1dd89a5d330f33a52b62dcaa580285d759276fcc8b0d95',
      address: '0x33cca8e7420114db103d61bd39a72ff65e46352d',
      data: '0x00000000000000000000000000000000000000000000000000000000007badfb000000000000000000000000cc29be4ca92d4ecc43c8451fba94c200b83991f600000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000032000000000000000000000004a8afb4330e9c83ec363fc8ca5047b8c000093da04000000000000000000000000000000000000000000000000000000000000001300000000000000000000000000000000000000000000000000000000007b803b00000000000000000000000000000000000000000000000000000000007b803b00000000000000000000000000000000000000000000000000000000007b8a9100000000000000000000000000000000000000000000000000000000007b90d000000000000000000000000000000000000000000000000000000000007b912300000000000000000000000000000000000000000000000000000000007b914700000000000000000000000000000000000000000000000000000000007b94b800000000000000000000000000000000000000000000000000000000007b98a000000000000000000000000000000000000000000000000000000000007baa3400000000000000000000000000000000000000000000000000000000007badfb00000000000000000000000000000000000000000000000000000000007badfb00000000000000000000000000000000000000000000000000000000007bb7e000000000000000000000000000000000000000000000000000000000007bbbc800000000000000000000000000000000000000000000000000000000007bc22f00000000000000000000000000000000000000000000000000000000007bc39600000000000000000000000000000000000000000000000000000000007bc3e900000000000000000000000000000000000000000000000000000000007bebf000000000000000000000000000000000000000000000000000000000007bf59300000000000000000000000000000000000000000000000000000000007bf6eb0000000000000000000000000000000000000000000000000000000000000013060b0c10070203090e110f0a0405080d12010000000000000000000000000000',
      topic0: '0xf6a97944f31ea060dfde0566e4167c1a1082551e64b60ecb14d599a9d023d451',
      topic1: '0x00000000000000000000000000000000000000000000000000000000000083ef',
      topic2: null,
      topic3: null,
    };
    const abiItems: AbiItem[] = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint32',
            name: 'aggregatorRoundId',
            type: 'uint32',
          },
          {
            indexed: false,
            internalType: 'int192',
            name: 'answer',
            type: 'int192',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'transmitter',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'int192[]',
            name: 'observations',
            type: 'int192[]',
          },
          {
            indexed: false,
            internalType: 'bytes',
            name: 'observers',
            type: 'bytes',
          },
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'rawReportContext',
            type: 'bytes32',
          },
        ],
        name: 'NewTransmission',
        type: 'event',
      },
    ];

    const { name, params } = new LogParser(abiItems).read(log);

    expect(name).toBe('NewTransmission');
    expect(params['aggregatorRoundId'].value).toBe(33775);
    expect(params['answer'].value.toString()).toBe('8105467');
    expect(params['observers'].value).toBe('0x060b0c10070203090e110f0a0405080d120100');
    expect(params['rawReportContext'].value).toBe('0x00000000000000000000004a8afb4330e9c83ec363fc8ca5047b8c000093da04');
    expect(params['transmitter'].value).toBe('0xcC29be4Ca92D4Ecc43C8451fBA94C200B83991f6');

    const observations = params['observations'].value as any as BigNumber[];
    expect(observations.length).toBe(19);
    expect(observations[0].toString()).toBe('8093755');
    expect(observations[5].toString()).toBe('8098119');
    expect(observations[10].toString()).toBe('8105467');
  });

  it('reads log correctly when one input contains unindexed arrays', () => {
    const log: Log = {
      logIndex: '107',
      transactionHash: '0x13ff9847e889923ac0b4e6a2e62508825293f744e856dddda441732e28498029',
      address: '0x55ab03c0576734fe57f699a047818f350c91296d',
      data: '0x1f1576e54d7fa84f0e0013adc2d466303528062a834faaf8419acf584ee8b374000000000000000000000000dbf1d38b8590c13237fbd1730c7993ffdcb0cf0c0000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000822c7b0000000000000000000000000000000000000000000000000000000000822ca800000000000000000000000000000000000000000000000000000000000002c0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000005f4071079b4eb137ef727494c9feee367e051130000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004419f101fa000000000000000000000000aa500e8c59078478b87a62258f6d8fa5934a4db800000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000196177346531326431647731323331323361736461736461736400000000000000',
      topic0: '0x7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e0',
      topic1: null,
      topic2: null,
      topic3: null,
    };
    const abiItems: AbiItem[] = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'proposer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'targets',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'string[]',
            name: 'signatures',
            type: 'string[]',
          },
          {
            indexed: false,
            internalType: 'bytes[]',
            name: 'calldatas',
            type: 'bytes[]',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startBlock',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endBlock',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
        ],
        name: 'ProposalCreated',
        type: 'event',
      },
    ];

    const { name, params } = new LogParser(abiItems).read(log);

    expect(name).toBe('ProposalCreated');
    expect(params['proposalId'].value.toString()).toBe(
      '14059622682499873864517339130691773252195357415328316295124254320423739110260',
    );
    expect(params['proposer'].value).toBe('0xdbf1D38B8590c13237FBd1730C7993ffdCb0cF0c');

    const targets = params['targets'].value as any as string[];
    expect(targets.length).toBe(1);
    expect(targets[0]).toBe('0x05F4071079b4eB137ef727494C9FEEE367e05113');

    const values = params['values'].value as any as BigNumber[];
    expect(values.length).toBe(1);
    expect(values[0].toString()).toBe('0');

    const signatures = params['signatures'].value as any as string[];
    expect(signatures.length).toBe(1);
    expect(signatures[0]).toBe('');

    const calldatas = params['calldatas'].value as any as string[];
    expect(calldatas.length).toBe(1);
    expect(calldatas[0]).toBe(
      '0x19f101fa000000000000000000000000aa500e8c59078478b87a62258f6d8fa5934a4db80000000000000000000000000000000000000000000000000000000000000005',
    );

    expect(params['startBlock'].value.toString()).toBe('8531067');
    expect(params['endBlock'].value.toString()).toBe('8531112');
    expect(params['description'].value).toBe('aw4e12d1dw123123asdasdasd');
  });
});
