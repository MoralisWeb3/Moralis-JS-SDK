import { PaginatedResponseAdapter } from './PaginatedResponseAdapter';
import { PaginationReader } from './PaginationReader';

describe('PaginatedResponseAdapter', () => {
  const response = {
    page: 1,
    pageSize: 10,
    total: 10,
    result: {
      alfa: 10,
      beta: '20',
    },
  };
  const pagination = PaginationReader.read(response);

  function deserializeResponse(jsonResponse: typeof response) {
    return {
      myAlfa: String(jsonResponse.result.alfa),
      myBeta: parseInt(jsonResponse.result.beta),
    };
  }

  const adapterWithNoNext = new PaginatedResponseAdapter(
    pagination,
    response,
    () => deserializeResponse(response),
    undefined,
  );
  const adapterWithNext = new PaginatedResponseAdapter(
    pagination,
    response,
    () => deserializeResponse(response),
    async () => adapterWithNoNext,
  );

  describe('raw', () => {
    it('returns raw JSON', () => {
      const raw = adapterWithNext.raw;
      expect(raw.result.alfa).toBe(10);
      expect(raw.result.beta).toBe('20');
    });
  });

  describe('toJSON()', () => {
    it('returns raw JSON', () => {
      const raw = adapterWithNext.toJSON();
      expect(raw.result.alfa).toBe(10);
      expect(raw.result.beta).toBe('20');
    });
  });

  describe('result', () => {
    it('returns deserialized result', () => {
      const raw = adapterWithNext.result;
      expect(raw.myAlfa).toBe('10');
      expect(raw.myBeta).toBe(20);
    });
  });

  describe('hasNext()', () => {
    it('returns true when nextHandler is not available', () => {
      expect(adapterWithNoNext.hasNext()).toBe(false);
    });

    it('returns true when nextHandler is available', () => {
      expect(adapterWithNext.hasNext()).toBe(true);
    });
  });

  describe('next()', () => {
    it('returns next adapter when nextHandler is available', async () => {
      expect(await adapterWithNext.next()).toBe(adapterWithNoNext);
    });

    it('throws error when nextHandler is not available', async () => {
      await expect(async () => await adapterWithNoNext.next()).rejects.toThrowError('Page limit exceeded!');
    });
  });
});
