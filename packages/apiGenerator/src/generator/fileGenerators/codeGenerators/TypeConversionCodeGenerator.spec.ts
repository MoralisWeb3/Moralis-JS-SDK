import { TypeConversionCodeGenerator } from './TypeConversionCodeGenerator';

describe('TypeConversionCodeGenerator', () => {
  it('does not change value if types are the same', () => {
    expect(TypeConversionCodeGenerator.generate('string', 'string', 'value')).toEqual('value');
    expect(TypeConversionCodeGenerator.generate('number', 'number', 'this.value')).toEqual('this.value');
  });

  it('converts string to Date', () => {
    expect(TypeConversionCodeGenerator.generate('string', 'Date', 'value')).toEqual('new Date(value)');
  });

  it('converts string to number', () => {
    expect(TypeConversionCodeGenerator.generate('string', 'number', 'value')).toEqual('parseInt(value, 10)');
  });

  it('converts Date to string', () => {
    expect(TypeConversionCodeGenerator.generate('Date', 'string', 'value')).toEqual('String(value.getTime())');
  });
});
