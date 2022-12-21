import { LogRelatedId } from './LogRelatedId';

describe('LogRelatedId', () => {
  it('returns id', () => {
    expect(LogRelatedId.create(1, '0x0ad848a2031fa60c1d9321395b3e2517630ee7cd20e08b84e70cad6fbef977e8', '10')).toBe(
      '0xa806ac61dbbc18f53cc94b1d4503a7e9e6397c87b86d5328026b0a4458cfab62',
    );
    expect(LogRelatedId.create(4, '0x0ad848a2031fa60c1d9321395b3e2517630ee7cd20e08b84e70cad6fbef977e8', '10')).toBe(
      '0x438dd2e790a3293d716b664551ed27cbabfb389a3b1fdcb0a03025ce5adb4cd6',
    );
    expect(LogRelatedId.create(1, '0x05efbdf28b473564c8dc3741c6fe74ba6c66f7c892e2af1e86d03bbc159c4bfd', '10')).toBe(
      '0x52ed919fa94d9b4bfd9351f4c5c0fb3965a586a0d90ef0db91c627a6daf3fc4e',
    );
    expect(LogRelatedId.create(1, '0x0ad848a2031fa60c1d9321395b3e2517630ee7cd20e08b84e70cad6fbef977e8', '14')).toBe(
      '0xe0fcd2b7b3be2793aa57a77193e346e35f3ed9a4d43b66387c43a3791ec567a4',
    );
  });
});
