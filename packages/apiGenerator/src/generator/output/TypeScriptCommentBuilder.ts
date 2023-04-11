import { MemoryOutput } from './MemoryOutput';
import { EOL } from './MemoryOutput';

export class TypeScriptCommentBuilder {
  private readonly lines: string[] = [];

  public constructor(private readonly output: MemoryOutput, private readonly tabs: number) {}

  public description(description: string | undefined): this {
    if (description) {
      this.lines.push(` * @description ${this.wrap(description)}`);
    }
    return this;
  }

  public param(type: string | null, paramName: string, isRequired: boolean, description: string | undefined): this {
    const name = isRequired ? paramName : `[${paramName}]`;
    const typeStr = type ? `{${type}} ` : '';
    const optional = isRequired ? '' : ' (optional)';
    this.lines.push(` * @param ${typeStr}${name} ${description && this.wrap(description)}${optional}`);
    return this;
  }

  public returns(type: string | null, description: string | undefined): this {
    const typeStr = type ? `{${type}} ` : '';
    this.lines.push(` * @returns ${typeStr}${description && this.wrap(description)}`);
    return this;
  }

  public apply() {
    if (this.lines.length > 0) {
      this.output.write(this.tabs, '/**');
      this.lines.forEach((line) => this.output.write(this.tabs, line));
      this.output.write(this.tabs, ' */');
      this.lines.length = 0;
    }
  }

  private wrap(value: string): string {
    return value
      .split(/\r|\n/)
      .filter((line) => !!line)
      .map((line, index) => (index === 0 ? line : `${MemoryOutput.createTabs(this.tabs)} * ${line}`))
      .join(EOL);
  }
}
