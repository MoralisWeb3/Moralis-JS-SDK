import { CoreErrorCode, MoralisError } from '../../Error';
import { Camelize, toCamelCase } from '../../utils';
import { PaginatedJSONResponse } from '../PaginatedOperation';
import { Pagination } from './Pagination';

export class PaginatedResponseAdapter<Result, JSONResult> {
  public constructor(
    public readonly pagination: Pagination,
    private readonly jsonResponse: PaginatedJSONResponse<JSONResult>,
    private readonly getResult: () => Result,
    private readonly nextHandler: (() => Promise<PaginatedResponseAdapter<Result, JSONResult>>) | undefined,
  ) {}

  public get result(): Result {
    return this.getResult();
  }

  public get raw(): PaginatedJSONResponse<JSONResult> {
    return this.jsonResponse;
  }

  public toJSON(): Camelize<PaginatedJSONResponse<JSONResult>> {
    return toCamelCase(this.jsonResponse);
  }

  public readonly hasNext = () => !!this.nextHandler;

  public next: () => Promise<PaginatedResponseAdapter<Result, JSONResult>> = () => {
    if (!this.nextHandler) {
      throw new MoralisError({
        code: CoreErrorCode.NO_DATA_FOUND,
        message:
          'Page limit exceeded! Before call this method check an existence of the next page by .hasNext() method.',
      });
    }
    return this.nextHandler();
  };
}
