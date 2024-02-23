import { TypeConversionCodeGenerator } from './TypeConversionCodeGenerator';

describe('TypeConversionCodeGenerator', () => {
  it('does not change value if types are the same', () => {
    expect(TypeConversionCodeGenerator.generate(true, 'string', 'string', 'value')).toEqual('value');
    expect(TypeConversionCodeGenerator.generate(true, 'number', 'number', 'this.value')).toEqual('this.value');
    expect(TypeConversionCodeGenerator.generate(false, 'number', 'number', 'this.value')).toEqual('this.value');
  });

  it('converts string to Date', () => {
    expect(TypeConversionCodeGenerator.generate(true, 'string', 'Date', 'value')).toEqual('new Date(value)');
  });

  it('converts string to number', () => {
    expect(TypeConversionCodeGenerator.generate(true, 'string', 'number', 'value')).toEqual('Number(value)');
    expect(TypeConversionCodeGenerator.generate(false, 'string', 'number', 'this.value')).toEqual(
      'this.value !== undefined ? Number(this.value) : undefined',
    );
  });

  it('converts Date to string', () => {
    expect(TypeConversionCodeGenerator.generate(true, 'Date', 'string', 'value')).toEqual('value.toISOString()');
    expect(TypeConversionCodeGenerator.generate(false, 'Date', 'string', 'value')).toEqual(
      'value !== undefined ? value.toISOString() : undefined',
    );
  });
});
