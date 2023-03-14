import { TypeScriptOutput } from './TypeScriptOutput';

describe('TypeScriptOutput', () => {
  it('creates multiline comments correctly', () => {
    const output = new TypeScriptOutput();
    output.writeComment(1, 'tiny\r\nexample', {
      test: 'foo\r\nbar',
    });
    const lines = output.toString().split(/\r\n/g);
    expect(lines[0]).toBe('  /**');
    expect(lines[1]).toBe('   * tiny');
    expect(lines[2]).toBe('   * example');
    expect(lines[3]).toBe('   * @test foo');
    expect(lines[4]).toBe('   * bar');
    expect(lines[5]).toBe('   */');
  });
});
