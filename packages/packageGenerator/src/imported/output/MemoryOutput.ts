import { Output } from './Output';

export const TAB = '  ';
export const EOL = '\r\n';

export class MemoryOutput implements Output {
  public static createTabs(tabs: number): string {
    let result = '';
    for (let i = 0; i < tabs; i++) {
      result += TAB;
    }
    return result;
  }

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
      output += MemoryOutput.createTabs(line.tabs);
      output += line.content;
      output += EOL;
    }
    return output;
  }
}
