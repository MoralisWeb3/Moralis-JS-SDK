import { PaginatedRequest } from '../PaginatedOperation';
import { Pagination } from '../response';
import { NextPaginatedRequestResolver } from './NextPaginatedRequestResolver';

interface TestPaginatedRequest extends PaginatedRequest {
  alfa: string;
}

describe('NextPaginatedRequestResolver', () => {
  const request: TestPaginatedRequest = {
    limit: 10,
    alfa: 'ALFA',
  };

  describe('cursor mode', () => {
    it('returns null when cursor is not defined', () => {
      const pagination: Pagination = {
        page: 1,
        pageSize: 10,
        cursor: undefined,
      };

      const nextRequest = NextPaginatedRequestResolver.resolve(0, request, pagination);

      expect(nextRequest).toBeNull();
    });

    it('returns next request when cursor is present', () => {
      const pagination: Pagination = {
        page: 1,
        pageSize: 10,
        cursor: 'CURSOR1',
      };

      const nextRequest = NextPaginatedRequestResolver.resolve(0, request, pagination);

      expect(nextRequest).toBeDefined();
      expect(nextRequest?.cursor).toBe(pagination.cursor);
      expect(nextRequest?.alfa).toBe(request.alfa);
    });
  });

  describe('total mode', () => {
    it('returns null when it is last page', () => {
      const pagination: Pagination = {
        page: 1,
        pageSize: 10,
        total: 10,
      };

      const nextRequest = NextPaginatedRequestResolver.resolve(1, request, pagination);

      expect(nextRequest).toBeNull();
    });

    it('returns next request when it is NOT last page', () => {
      const pagination: Pagination = {
        page: 1,
        pageSize: 10,
        total: 21,
      };

      const nextRequest = NextPaginatedRequestResolver.resolve(0, request, pagination);

      expect(nextRequest).toBeDefined();
      expect(nextRequest?.offset).toBe(20);
      expect(nextRequest?.alfa).toBe(request.alfa);
    });
  });

  it('returns null when cursor and total are not defined', () => {
    const pagination: Pagination = {
      page: 1,
      pageSize: 10,
    };

    const nextRequest = NextPaginatedRequestResolver.resolve(0, request, pagination);

    expect(nextRequest).toBeNull();
  });
});
