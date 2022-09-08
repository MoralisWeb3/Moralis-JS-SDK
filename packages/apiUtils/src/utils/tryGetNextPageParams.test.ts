import { PaginatedParams, PaginatedResult } from '../resolvers/PaginatedEndpoint';
import { tryGetNextPageParams } from './tryGetNextPageParams';

describe('tryGetNextPageParams', () => {
  describe('cursor mode', () => {
    function createData(total: number, page: number, pageSize: number): [PaginatedParams, PaginatedResult<null>] {
      const currentParams = {
        cursor: '0x1',
      };
      const result = {
        total,
        page,
        page_size: pageSize,
        cursor: '0x2',
        result: null,
        data: null
      };
      return [currentParams, result];
    }

    describe('firstPageIndex=1', () => {
      it('returns params when next page exists', () => {
        const [currentParams, result] = createData(950, 9, 100);
        const nextParams = tryGetNextPageParams(1, currentParams, result);
        expect(nextParams?.cursor).toEqual('0x2');
      });

      it('returns null when next page does not exist', () => {
        const [currentParams, result] = createData(950, 10, 100);
        const nextParams = tryGetNextPageParams(1, currentParams, result);
        expect(nextParams).toBeNull();
      });
    });
  });

  describe('offset mode', () => {
    function createData(total: number, page: number, pageSize: number): [PaginatedParams, PaginatedResult<null>] {
      const currentParams = {
        limit: 100,
        offset: 900,
      };
      const result = {
        total,
        page,
        page_size: pageSize,
        cursor: '',
        result: null,
        data: null
      };
      return [currentParams, result];
    }

    describe('firstPageIndex=1', () => {
      it('returns params when next page exists', () => {
        const [currentParams, result] = createData(950, 9, 100);
        const nextParams = tryGetNextPageParams(1, currentParams, result);
        expect(nextParams?.offset).toEqual(1000);
      });

      it('returns null when next page does not exist', () => {
        const [currentParams, result] = createData(950, 10, 100);
        const nextParams = tryGetNextPageParams(1, currentParams, result);
        expect(nextParams).toBeNull();
      });
    });
  });
});
