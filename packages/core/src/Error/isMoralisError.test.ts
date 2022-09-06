import { CoreErrorCode } from './ErrorCode';
import { isMoralisError } from './isMoralisError';
import { MoralisError } from './MoralisError';

describe('isMoralisError', () => {
  it('returns true when MoralisError passed', () => {
    const error = new MoralisError({
      code: CoreErrorCode.GENERIC_CORE_ERROR,
      message: 'test',
    });

    expect(isMoralisError(error)).toBe(true);
  });

  it('returns false when Error passed', () => {
    const error = new Error('example');
    expect(isMoralisError(error)).toBe(false);
  });

  it('returns false when string passed', () => {
    expect(isMoralisError('ERROR')).toBe(false);
  });

  it('returns false when undefined passed', () => {
    expect(isMoralisError(undefined)).toBe(false);
  });

  it('returns false when null passed', () => {
    expect(isMoralisError(null)).toBe(false);
  });

  it('returns false when an empty object passed', () => {
    expect(isMoralisError({})).toBe(false);
  });
});
