import { TypeName } from './TypeName';

describe('TypeName', () => {
  it('serializes correctly', () => {
    const name = TypeName.from('3').add('4').addPrefix('2').addPrefix('1');
    expect(name.toString()).toBe('1_2_3_4');
  });
});
