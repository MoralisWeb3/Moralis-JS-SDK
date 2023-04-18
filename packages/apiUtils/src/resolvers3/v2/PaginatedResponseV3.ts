export interface PaginatedResponseV3<Result> {
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly result?: Result;
  readonly cursor?: string;
}
