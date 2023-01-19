import { GeneratorOutput } from '../GeneratorOutput';

export class IndexFileGenerator {
  public readonly fileNames: string[] = [];

  public add(fileName: string) {
    this.fileNames.push(fileName);
  }

  public generate(): GeneratorOutput {
    const output = new GeneratorOutput();

    for (const fileName of this.fileNames) {
      output.write(0, `export * from './${fileName}';`);
    }

    return output;
  }
}
