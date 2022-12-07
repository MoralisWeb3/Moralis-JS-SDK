import { Core } from '@moralisweb3/common-core';
import { setupStreamsUtils } from '../../test/setup';

import { StreamTrigger } from './StreamTrigger';
import { mockStreamTrigger } from './StreamTrigger.mock';

describe('StreamTrigger', () => {
  let core: Core;
  const input = mockStreamTrigger.ERC20_TRANSFER;
  let result: StreamTrigger;

  beforeAll(() => {
    core = setupStreamsUtils();
    result = StreamTrigger.create(input, core);
  });

  it('should return correct values for all getters', () => {
    expect(result.type).toBe('erc20transfer');
    expect(result.contractAddress.checksum).toBe('0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE');
    expect(result.functionAbi).toBe(mockStreamTrigger.ERC20_TRANSFER.functionAbi);
    expect(result.inputs).toStrictEqual(['$to']);
  });

  it('should return true for .equals() on equality match', () => {
    const input = mockStreamTrigger.ERC20_TRANSFER;
    const result = StreamTrigger.create(input, core);
    const isEqual = result.equals({ ...input });

    expect(isEqual).toBe(true);
  });

  it('should return false for .equals() on mismatch type', () => {
    const input = mockStreamTrigger.ERC20_TRANSFER;
    const result = StreamTrigger.create(input, core);
    const isEqual = result.equals({ ...input, type: 'tx' });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatch contractAddress', () => {
    const input = mockStreamTrigger.ERC20_TRANSFER;
    const result = StreamTrigger.create(input, core);
    const isEqual = result.equals({ ...input, contractAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5' });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatch functionAbi', () => {
    const balanceOfSenderAbi = {
      constant: true,
      inputs: [
        {
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          name: 'fromBalance',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    };

    const input = mockStreamTrigger.ERC20_TRANSFER;
    const result = StreamTrigger.create(input, core);
    const isEqual = result.equals({ ...input, functionAbi: balanceOfSenderAbi });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatch inputs', () => {
    const input = mockStreamTrigger.ERC20_TRANSFER;
    const result = StreamTrigger.create(input, core);
    const isEqual = result.equals({ ...input, inputs: ['$from'] });

    expect(isEqual).toBe(false);
  });
});
