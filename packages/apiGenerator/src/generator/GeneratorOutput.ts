const TAB = '  ';

export class GeneratorOutput {
  private readonly lines: { tabs: number; content: string }[] = [];

  public newLine() {
    this.lines.push({ tabs: 0, content: '' });
  }

  public write(tabs: number, content: string) {
    this.lines.push({ tabs, content });
  }

  public toString(): string {
    let output = '';
    for (const line of this.lines) {
      for (let i = 0; i < line.tabs; i++) {
        output += TAB;
      }
      output += line.content;
      output += '\r\n';
    }
    return output;
  }
}
