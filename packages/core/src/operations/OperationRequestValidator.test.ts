import { Operation } from './Operation';
import { OperationRequestValidator } from './OperationRequestValidator';

describe('OperationRequestValidator', () => {
  interface TestRequest {
    alfa: number;
    beta: number;
    gamma: number;
  }

  const operation: Partial<Operation<TestRequest, unknown, unknown, unknown>> = {
    urlPathParamNames: ['alfa'],
    urlSearchParamNames: ['beta'],
    bodyParamNames: ['gamma'],
  };

  const validator = new OperationRequestValidator(operation as Operation<TestRequest, unknown, unknown, unknown>);

  it('does not throw error when request does not contain unknown parameters', () => {
    validator.validate({
      alfa: 10,
      beta: 10,
      gamma: 10,
    });
  });

  it('throws error when request contains unknown parameters', () => {
    expect(() => {
      validator.validate({
        someNotSupportedParam: -1,
      } as any);
    }).toThrowError(
      'Request contains unknown parameter: someNotSupportedParam. This operation supports the fallowing parameters: alfa, beta, gamma',
    );
  });
});
