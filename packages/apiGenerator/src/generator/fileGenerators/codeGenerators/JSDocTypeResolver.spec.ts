import { JSDocTypeResolver } from './JSDocTypeResolver';

describe('JSDocTypeResolver', () => {
  it('returns String[] for string array', () => {
    expect(
      JSDocTypeResolver.resolve({
        isArray: true,
        nativeType: 'string',
      }),
    ).toBe('String[]');
  });

  it('returns String for string', () => {
    expect(
      JSDocTypeResolver.resolve({
        isArray: false,
        nativeType: 'string',
      }),
    ).toBe('String');
  });

  it('returns Object for reference type', () => {
    expect(
      JSDocTypeResolver.resolve({
        isArray: false,
        referenceType: {
          className: 'Record',
          isSimpleType: false,
          isUnionType: false,
          importPath: '../Record',
        },
      }),
    ).toBe('Object');
  });
});
