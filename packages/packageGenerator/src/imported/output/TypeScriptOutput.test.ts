import { TypeScriptOutput } from './TypeScriptOutput';

describe('TypeScriptOutput', () => {
  it('creates multiline comments correctly', () => {
    const output = new TypeScriptOutput();
    output.createComment(1).description('foo\r\nbar').apply();

    const lines = output.toString().split(/\r\n/g);
    expect(lines[0]).toBe('  /**');
    expect(lines[1]).toBe('   * @description foo');
    expect(lines[2]).toBe('   * bar');
    expect(lines[3]).toBe('   */');
  });
});
