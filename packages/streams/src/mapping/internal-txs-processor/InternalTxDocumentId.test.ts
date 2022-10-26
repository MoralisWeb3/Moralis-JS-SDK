import { InternalTxDocumentId } from './InternalTxDocumentId';

describe('InternalTxDocumentId', () => {
  it('returns id', () => {
    const id1 = InternalTxDocumentId.create(0x1, '0x7e3e589a63a13a33a2f02a500fee07b30e20808732fb0161af5b617a1c168640');
    expect(id1).toEqual('0x0013ba8a43e8cacbe545aff7bf7eb408e93e319aa8f3f6624e8b8e8e46422fac');

    const id16 = InternalTxDocumentId.create(
      0x16,
      '0x7e3e589a63a13a33a2f02a500fee07b30e20808732fb0161af5b617a1c168640',
    );
    expect(id16).toEqual('0xf7e77fb3ce9c2f67072b746cdcc7decc8c430b8a6ee3210355e5a789c8600ce5');
  });
});
