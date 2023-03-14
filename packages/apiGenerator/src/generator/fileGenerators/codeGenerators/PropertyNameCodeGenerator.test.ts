import { PropertyNameCodeGenerator } from './PropertyNameCodeGenerator';

describe('PropertyNameCodeGenerator', () => {
  it('generates for plain name', () => {
    const codes = PropertyNameCodeGenerator.generate('foo_bar');
    expect(codes.accessCode).toBe('.foo_bar');
    expect(codes.nameCode).toBe('foo_bar');
    expect(codes.camelCasedAccessCode).toBe('.fooBar');
    expect(codes.camelCasedNameCode).toBe('fooBar');
  });

  it('generates for "+" name', () => {
    const codes = PropertyNameCodeGenerator.generate('+');
    expect(codes.accessCode).toBe("['+']");
    expect(codes.nameCode).toBe("'+'");
    expect(codes.camelCasedAccessCode).toBe("['+']");
    expect(codes.camelCasedNameCode).toBe("'+'");
  });
});
