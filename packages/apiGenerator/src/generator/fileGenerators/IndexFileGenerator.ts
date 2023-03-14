import { MemoryOutput } from '../output/MemoryOutput';
import { Output } from '../output/Output';

export class IndexFileGenerator {
  public readonly fileNames: string[] = [];

  public add(fileName: string) {
    this.fileNames.push(fileName);
  }

  public generate(): Output {
    const output = new MemoryOutput();

    for (const fileName of this.fileNames) {
      output.write(0, `export * from './${fileName}';`);
    }

    return output;
  }
}
