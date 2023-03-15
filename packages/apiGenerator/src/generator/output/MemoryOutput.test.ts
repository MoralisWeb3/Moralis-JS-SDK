import { MemoryOutput } from './MemoryOutput';

describe('MemoryOutput', () => {
  it('creates output', () => {
    const output = new MemoryOutput();
    output.write(0, 'A');
    output.write(1, 'B');
    output.newLine();
    expect(output.toString()).toBe('A\r\n  B\r\n\r\n');
  });
});
