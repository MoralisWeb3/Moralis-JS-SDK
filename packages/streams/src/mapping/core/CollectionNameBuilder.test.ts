import { CollectionNameBuilder } from './CollectionNameBuilder';

describe('CollectionNameBuilder', () => {
  const builder = new CollectionNameBuilder();

  function test(name: string, expectedTableName: string) {
    it(name, () => {
      expect(builder.build(name)).toBe(expectedTableName);
    });
  }

  test('lorem ipsum', 'LoremIpsum');
  test('test-smth', 'TestSmth');
  test(' LoremIpsum ', 'Loremipsum');
  test(' hóhó ', 'HH');
  test('100Ω', '100');
  test('SOME TEST', 'SomeTest');
  test('some_test', 'Some_test');
});
