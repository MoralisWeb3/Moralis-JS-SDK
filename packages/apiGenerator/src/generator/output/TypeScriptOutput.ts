import { EOL, MemoryOutput } from './MemoryOutput';
import { Output } from './Output';

export class TypeScriptOutput implements Output {
  private readonly output = new MemoryOutput();
  private readonly imports = new Map<string, Set<string>>();

  public addImport(types: string[], path: string) {
    let items = this.imports.get(path);
    if (items) {
      for (const type of types) {
        items.add(type);
      }
    } else {
      this.imports.set(path, new Set(types));
    }
  }

  public commitImports() {
    let count = 0;
    for (const path of this.imports.keys()) {
      const types = [...(this.imports.get(path) as Set<string>)];
      this.output.write(0, `import { ${types.join(', ')} } from '${path}';`);
      count++;
    }
    if (count > 0) {
      this.output.newLine();
    }
  }

  public writeComment(tabs: number, comment: string | null, props: { [key: string]: string | undefined }) {
    const notEmptyPropKeys = Object.keys(props).filter((name) => props[name]);
    if (notEmptyPropKeys.length < 1) {
      return;
    }

    this.write(tabs, '/**');
    if (comment) {
      this.write(tabs, ' * ' + wrapComment(tabs, comment));
    }
    for (const key of notEmptyPropKeys) {
      this.write(tabs, ` * @${key} ${wrapComment(tabs, props[key] as string)}`);
    }
    this.write(tabs, ' */');
  }

  public newLine() {
    this.output.newLine();
  }

  public write(tabs: number, content: string) {
    this.output.write(tabs, content);
  }

  public toString(): string {
    return this.output.toString();
  }
}

function wrapComment(tabs: number, value: string): string {
  return value
    .split(/\r|\n/)
    .filter((line) => !!line)
    .map((line, index) => (index === 0 ? line : `${MemoryOutput.createTabs(tabs)} * ${line}`))
    .join(EOL);
}
