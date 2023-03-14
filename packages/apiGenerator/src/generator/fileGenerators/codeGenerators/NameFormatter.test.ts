import { NameFormatter } from './NameFormatter';

describe('NameFormatter', () => {
  describe('getClassName', () => {
    it('returns expected name', () => {
      expect(NameFormatter.getClassName('test')).toBe('Test');
      expect(NameFormatter.getClassName('one_two_three')).toBe('OneTwoThree');
      expect(NameFormatter.getClassName('_one_')).toBe('One');
      expect(NameFormatter.getClassName('lorem ipsum')).toBe('LoremIpsum');
      expect(NameFormatter.getClassName('t1')).toBe('T1');
      expect(NameFormatter.getClassName('Some$Value')).toBe('SomeValue');
    });
  });

  describe('getParameterName', () => {
    it('returns expected name', () => {
      expect(NameFormatter.getParameterName('test')).toBe('test');
      expect(NameFormatter.getParameterName('lorem_ipsum')).toBe('loremIpsum');
      expect(NameFormatter.getParameterName('someStrangeValue')).toBe('someStrangeValue');
      expect(NameFormatter.getParameterName('foo$bar')).toBe('fooBar');
    });
  });
});
