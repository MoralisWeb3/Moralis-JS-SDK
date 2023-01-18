import { BigNumber } from '@ethersproject/bignumber';
import { LogParamValue } from './LogParser';
import { LogDocumentValueFormatter } from './LogDocumentValueFormatter';

describe('LogDocumentValueFormatter', () => {
  function test(type: string, value: LogParamValue, expectedValue: unknown) {
    it(`formats ${type} value to ${expectedValue}`, () => {
      expect(LogDocumentValueFormatter.format({ type, value })).toBe(expectedValue);
    });
  }

  test('string', 'test', 'test');
  test('address', '0x351228872BD3fd72f64596623d0f5e8e8014F801', '0x351228872bd3fd72f64596623d0f5e8e8014f801');
  test('uint256', BigNumber.from(0x100), '256');
  test(
    'bytes32',
    '0xe8ceaa0b6368653b230114926c9cb015f1dafa62a3f7ac854a2a246accf2061c',
    '0xe8ceaa0b6368653b230114926c9cb015f1dafa62a3f7ac854a2a246accf2061c',
  );
});
