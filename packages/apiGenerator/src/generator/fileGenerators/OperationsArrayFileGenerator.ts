import { MemoryOutput } from '../output/MemoryOutput';
import { Output } from '../output/Output';

export class OperationsArrayFileGenerator {
  public readonly fileNames: string[] = [];

  public add(fileName: string) {
    this.fileNames.push(fileName);
  }

  public generate(): Output {
    const output = new MemoryOutput();

    for (const fileName of this.fileNames) {
      output.write(0, `import { ${fileName} } from './${fileName}';`);
    }

    output.newLine();
    output.write(0, `export const operations = [`);

    for (const fileName of this.fileNames) {
      output.write(1, `${fileName},`);
    }

    output.write(0, `];`);

    return output;
  }
}
