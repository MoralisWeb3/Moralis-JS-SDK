import { CoreErrorCode, MoralisError } from '../Error';
import { Operation } from './Operation';

export class OperationRequestValidator<Request> {
  private readonly allParamNames: (keyof Request)[];

  public constructor(operation: Operation<Request, unknown, unknown, unknown>) {
    this.allParamNames = [
      ...(operation.urlPathParamNames || []),
      ...(operation.urlSearchParamNames || []),
      ...(operation.bodyParamNames || []),
    ];
  }

  public validate(request: Request) {
    const requestParamNames = Object.keys(request as Record<string, unknown>);

    for (const paramName of requestParamNames) {
      if (!this.allParamNames.includes(paramName as keyof Request)) {
        const allParamsNames = this.allParamNames.join(', ');
        throw new MoralisError({
          code: CoreErrorCode.INVALID_ARGUMENT,
          message: `Request contains unknown parameter: ${paramName}. This operation supports the following parameters: ${allParamsNames}`,
        });
      }
    }
  }
}
