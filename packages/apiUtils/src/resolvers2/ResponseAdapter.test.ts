import MoralisCore from '@moralisweb3/core';
import { ResponseAdapter } from './ResponseAdapter';

describe('ResponseAdapter', () => {
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

  const adapter = new ResponseAdapter(response, deserializeResponse, core);

  describe('raw', () => {
    it('returns raw JSON', () => {
      const raw = adapter.raw;
      expect(raw.alfa).toBe(10);
      expect(raw.beta).toBe('20');
    });
  });

  describe('toJSON()', () => {
    it('returns raw JSON', () => {
      const raw = adapter.toJSON();
      expect(raw.alfa).toBe(10);
      expect(raw.beta).toBe('20');
    });
  });

  describe('result', () => {
    it('returns deserialized result', () => {
      const raw = adapter.result;
      expect(raw.myAlfa).toBe('10');
      expect(raw.myBeta).toBe(20);
    });
  });
});
