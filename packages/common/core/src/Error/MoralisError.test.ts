import { ApiErrorCode, CoreErrorCode, MoralisErrorCode } from './ErrorCode';
import { MoralisApiError, CoreError, MoralisError, MoralisErrorOptions } from './MoralisError';

function createOptions<T extends MoralisErrorCode>(code: T): MoralisErrorOptions<T> {
  return {
    code,
    message: 'test',
  };
}

describe('MoralisError', () => {
  it('creates a correct message', () => {
    const details = {
      x: 1,
    };
    const options = {
      code: CoreErrorCode.GENERIC_CORE_ERROR,
      message: 'foo',
      details,
    };

    const error = new MoralisError(options);

    expect(error.name).toEqual('Moralis SDK Error');
    expect(error.message).toEqual('[C0001] foo');
    expect(error.code).toEqual('C0001');
    expect(error.details).toEqual(details);
    expect(error.cause).toBeUndefined();
    expect(error.stack).toBeDefined();
  });

  it('keeps a cause', () => {
    const cause = new Error('HTTP Error');
    const options = {
      code: CoreErrorCode.INVALID_ARGUMENT,
      message: 'bar',
      cause,
    };

    const error = new MoralisError(options);

    expect(error.message).toEqual('[C0005] bar');
    expect(error.cause).toEqual(cause);
    expect(error.cause?.stack).toBeDefined();
  });
});

describe('CoreError', () => {
  it('creates a proper name and a correct message', () => {
    const error = new CoreError(createOptions(CoreErrorCode.GENERIC_CORE_ERROR));
    expect(error.name).toEqual('Moralis SDK Core Error');
    expect(error.message).toEqual('[C0001] test');
  });
});

describe('MoralisApiError', () => {
  it('creates a proper name and a correct message', () => {
    const error = new MoralisApiError(createOptions(ApiErrorCode.GENERIC_API_ERROR));
    expect(error.name).toEqual('Moralis SDK API Error');
    expect(error.message).toEqual('[A0001] test');
  });
});
