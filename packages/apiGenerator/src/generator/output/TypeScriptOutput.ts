import { MemoryOutput } from './MemoryOutput';
import { Output } from './Output';
import { TypeScriptCommentBuilder } from './TypeScriptCommentBuilder';

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

  public createComment(tabs: number): TypeScriptCommentBuilder {
    return new TypeScriptCommentBuilder(this.output, tabs);
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
