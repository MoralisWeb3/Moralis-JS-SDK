import { NullableOperationResolver } from './NullableOperationResolver';
import { OperationResolver } from './OperationResolver';
import { PaginatedOperationResolver } from './PaginatedOperationResolver';

export type UnknownNullableOperationResolver = NullableOperationResolver<unknown, unknown, unknown, unknown>;
export type UnknownPaginatedOperationResolver = PaginatedOperationResolver<any, unknown, unknown, unknown>;
export type UnknownDefaultOperationResolver = OperationResolver<unknown, unknown, unknown, unknown>;

export type UnknownOperationResolver =
  | UnknownNullableOperationResolver
  | UnknownPaginatedOperationResolver
  | UnknownDefaultOperationResolver;
