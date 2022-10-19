import MoralisCore from '@moralisweb3/core';
import { PaginatedResponseAdapter } from './PaginatedResponseAdapter';

describe('PaginatedResponseAdapter', () => {
  const core = {} as any as MoralisCore;
  const response = {
    alfa: 10,
    beta: '20',
  };
  function deserializeResponse(jsonResponse: typeof response, localCore: MoralisCore) {
    expect(localCore).toBe(core);
    return {
      myAlfa: String(jsonResponse.alfa),
      myBeta: parseInt(jsonResponse.beta),
    };
  }

  const adapterWithNoNext = new PaginatedResponseAdapter(response, deserializeResponse, core);
  const adapterWithNext = new PaginatedResponseAdapter(
    response,
    deserializeResponse,
    core,
    async () => adapterWithNoNext,
  );

  describe('raw', () => {
    it('returns raw JSON', () => {
      const raw = adapterWithNext.raw;
      expect(raw.alfa).toBe(10);
      expect(raw.beta).toBe('20');
    });
  });

  describe('toJSON()', () => {
    it('returns raw JSON', () => {
      const raw = adapterWithNext.toJSON();
      expect(raw.alfa).toBe(10);
      expect(raw.beta).toBe('20');
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
      await expect(async () => await adapterWithNoNext.next()).rejects.toThrowError('[A0002] Page limit exceeded!');
    });
  });
});
