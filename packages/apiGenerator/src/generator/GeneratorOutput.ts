const TAB = '  ';
const EOL = '\r\n';

export class GeneratorOutput {
  private readonly lines: { tabs: number; content: string }[] = [];

  public newLine() {
    this.lines.push({ tabs: 0, content: '' });
  }

  public write(tabs: number, content: string) {
    this.lines.push({ tabs, content });
  }

  public writeComment(tabs: number, comment: string | null, props: { [key: string]: string | undefined }) {
    const notEmptyPropKeys = Object.keys(props).filter((name) => props[name]);
    if (notEmptyPropKeys.length < 1) {
      return;
    }

    this.write(tabs, '/**');
    if (comment) {
      this.write(tabs, wrapComment(comment));
    }
    for (const key of notEmptyPropKeys) {
      this.write(tabs, ` * @${key} ${wrapComment(props[key] as string)}`);
    }
    this.write(tabs, ' */');
  }

  public toString(): string {
    let output = '';
    for (const line of this.lines) {
      for (let i = 0; i < line.tabs; i++) {
        output += TAB;
      }
      output += line.content;
      output += EOL;
    }
    return output;
  }
}

function wrapComment(value: string): string {
  return value
    .split(/\r|\n/)
    .filter((line) => !!line)
    .map((line, index) => (index === 0 ? line : ` * ${line}`))
    .join(EOL);
}
