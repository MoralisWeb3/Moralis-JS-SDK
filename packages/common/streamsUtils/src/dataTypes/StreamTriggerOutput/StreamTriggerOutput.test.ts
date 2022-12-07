import { Core } from '@moralisweb3/common-core';
import { setupStreamsUtils } from '../../test/setup';

import { StreamTriggerOutput } from '../StreamTriggerOutput';
import { mockStreamTriggerOutput } from './StreamTriggerOutput.mock';

describe('StreamTriggerOutput', () => {
  let core: Core;
  const input = mockStreamTriggerOutput.BALANCE_TRIGGER;
  let result: StreamTriggerOutput;

  beforeAll(() => {
    core = setupStreamsUtils();
    result = StreamTriggerOutput.create(input, core);
  });

  it('should return correct values for all getters', () => {
    expect(result.name).toBe('fromBalance');
    expect(result.value).toBe('200000000000000000');
  });

  it('should return true for .equals() on equality match', () => {
    const input = mockStreamTriggerOutput.BALANCE_TRIGGER;
    const result = StreamTriggerOutput.create(input, core);
    const isEqual = result.equals({ ...input });

    expect(isEqual).toBe(true);
  });

  it('should return false for .equals() on mismatch name', () => {
    const input = mockStreamTriggerOutput.BALANCE_TRIGGER;
    const result = StreamTriggerOutput.create(input, core);
    const isEqual = result.equals({ ...input, name: 'output1' });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatch value', () => {
    const input = mockStreamTriggerOutput.BALANCE_TRIGGER;
    const result = StreamTriggerOutput.create(input, core);
    const isEqual = result.equals({ ...input, value: '51390023141500000' });

    expect(isEqual).toBe(false);
  });
});
