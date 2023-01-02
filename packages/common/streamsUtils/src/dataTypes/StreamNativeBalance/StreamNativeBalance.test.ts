import { Core } from '@moralisweb3/common-core';
import { setupStreamsUtils } from '../../test/setup';

import { StreamNativeBalance } from './StreamNativeBalance';
import { mockStreamNativeBalanceInput } from './StreamNativeBalance.mock';

describe('StreamNativeBalance', () => {
  let core: Core;
  const input = mockStreamNativeBalanceInput.BALANCE;
  let result: StreamNativeBalance;

  beforeAll(() => {
    core = setupStreamsUtils();
    result = StreamNativeBalance.create(input, core);
  });

  it('should return correct values for all getters', () => {
    expect(result.balance.wei).toBe('3921415148849464186');
    expect(result.address.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
  });

  it('should return true for .equals() on equality match', () => {
    const input = mockStreamNativeBalanceInput.BALANCE;
    const result = StreamNativeBalance.create(input, core);
    const isEqual = result.equals({ ...input });

    expect(isEqual).toBe(true);
  });

  it('should return false for .equals() on mismatch address', () => {
    const input = mockStreamNativeBalanceInput.BALANCE;
    const result = StreamNativeBalance.create(input, core);
    const isEqual = result.equals({ ...input, address: '0xaa6a28edbbaf0c7542c73212d26cc0b249da47a5' });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatch balance', () => {
    const input = mockStreamNativeBalanceInput.BALANCE;
    const result = StreamNativeBalance.create(input, core);
    const isEqual = result.equals({ ...input, balance: '100' });

    expect(isEqual).toBe(false);
  });
});
