import { PropertyNameModelBuilder } from './PropertyNameModelBuilder';

describe('PropertyNameModelBuilder', () => {
  it('generates for plain name', () => {
    const codes = PropertyNameModelBuilder.build('foo_bar');
    expect(codes.rawAccessCode).toBe('.foo_bar');
    expect(codes.rawNameCode).toBe('foo_bar');
    expect(codes.normalizedAccessCode).toBe('.fooBar');
    expect(codes.normalizedNameCode).toBe('fooBar');
  });

  it('generates for "+" name', () => {
    const codes = PropertyNameModelBuilder.build('+');
    expect(codes.rawAccessCode).toBe("['+']");
    expect(codes.rawNameCode).toBe("'+'");
    expect(codes.normalizedAccessCode).toBe("['+']");
    expect(codes.normalizedNameCode).toBe("'+'");
  });
});
