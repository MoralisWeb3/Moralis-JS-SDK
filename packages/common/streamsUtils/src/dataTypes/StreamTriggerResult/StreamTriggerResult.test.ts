import { Core } from '@moralisweb3/common-core';
import { setupStreamsUtils } from '../../test/setup';

import { StreamTriggerResult } from '../StreamTriggerResult';
import { mockStreamTriggerResult } from './StreamTriggerResult.mock';

describe('StreamTriggerResult', () => {
  let core: Core;
  const input = mockStreamTriggerResult.BALANCE_TRIGGER;
  let result: StreamTriggerResult;

  beforeAll(() => {
    core = setupStreamsUtils();
    result = StreamTriggerResult.create(input, core);
  });

  it('should return correct values for all getters', () => {
    expect(result.name).toBe('fromBalance');
    expect(result.value).toBe('200000000000000000');
  });

  it('should return true for .equals() on equality match', () => {
    const input = mockStreamTriggerResult.BALANCE_TRIGGER
    const result = StreamTriggerResult.create(input, core);
    const isEqual = result.equals({ ...input });

    expect(isEqual).toBe(true);
  });

  it('should return false for .equals() on mismatch name', () => {
    const input = mockStreamTriggerResult.BALANCE_TRIGGER
    const result = StreamTriggerResult.create(input, core);
    const isEqual = result.equals({ ...input, name: 'output1' });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatch value', () => {
    const input = mockStreamTriggerResult.BALANCE_TRIGGER
    const result = StreamTriggerResult.create(input, core);
    const isEqual = result.equals({ ...input, value: '51390023141500000' });

    expect(isEqual).toBe(false);
  });
});
