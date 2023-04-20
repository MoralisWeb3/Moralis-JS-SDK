import { CoreErrorCode, MoralisError, Pagination } from '@moralisweb3/common-core';
import { PaginatedResponseV3 } from './PaginatedResponseV3';

export type PaginatedResponseV3AdapterNextHandler<
  Response extends PaginatedResponseV3<Response['result']>,
  ResponseJSON,
> = () => Promise<PaginatedResponseV3Adapter<Response, ResponseJSON>>;

export class PaginatedResponseV3Adapter<Response extends PaginatedResponseV3<Response['result']>, ResponseJSON> {
  public constructor(
    public readonly response: Response,
    private readonly json: ResponseJSON,
    private readonly nextHandler: PaginatedResponseV3AdapterNextHandler<Response, ResponseJSON> | null,
  ) {}

  public get result(): NonNullable<Response['result']> {
    if (!this.response.result) {
      throw new Error('No result');
    }
    return this.response.result;
  }

  public get pagination(): Pagination {
    return {
      total: this.response.total || 0,
      page: this.response.page || 0,
      pageSize: this.response.pageSize || 0,
      cursor: this.response.cursor,
    };
  }

  public hasNext(): boolean {
    return !!this.nextHandler;
  }

  public async next(): Promise<PaginatedResponseV3Adapter<Response, ResponseJSON>> {
    if (!this.nextHandler) {
      throw new MoralisError({
        code: CoreErrorCode.NO_DATA_FOUND,
        message:
          'Page limit exceeded! Before call this method check an existence of the next page by .hasNext() method.',
      });
    }
    return this.nextHandler();
  }

  /**
   * @deprecated Use `toJSON()` method from the result.
   */
  public raw(): ResponseJSON {
    return this.json;
  }

  /**
   * @deprecated Use `toJSON()` method from the result.
   */
  public toJSON(): ResponseJSON {
    return this.json;
  }
}
