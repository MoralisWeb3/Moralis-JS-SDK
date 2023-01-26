import { OpenAPI } from 'openapi-types';
import { OpenApiReader } from '../reader/OpenApiReader';
import { IndexFileGenerator } from './fileGenerators/IndexFileGenerator';
import { OperationFileGenerator } from './fileGenerators/OperationFileGenerator';
import { SimpleTypeFileGenerator } from './fileGenerators/SimpleTypeFileGenerator';
import { ComplexTypeFileGenerator } from './fileGenerators/ComplexTypeFileGenerator';
import { GeneratorWriter } from './GeneratorWriter';
import { ComplexTypeInfo, OperationInfo, SimpleTypeInfo } from 'src/reader/OpenApiReaderResult';
import { TypesGenerator } from './fileGenerators/TypesGenerator';

export class Generator {
  public static async create(
    document: OpenAPI.Document,
    classNamePrefix: string,
    outputPath: string,
  ): Promise<Generator> {
    return new Generator(document, classNamePrefix, new GeneratorWriter(outputPath));
  }

  private readonly typesGenerator = new TypesGenerator(this.classNamePrefix);
  private readonly typesIndexGenerator = new IndexFileGenerator();
  private readonly operationsIndexGenerator = new IndexFileGenerator();

  private constructor(
    private readonly document: OpenAPI.Document,
    private readonly classNamePrefix: string,
    private readonly writer: GeneratorWriter,
  ) {}

  public generate() {
    this.writer.prepare();

    const result = OpenApiReader.create(this.document).read();
    for (const operation of result.operations) {
      this.generateOperation(operation);
    }
    for (const simpleType of result.simpleTypes) {
      this.generateSimpleType(simpleType);
    }
    for (const complexType of result.complexTypes) {
      this.generateComplexType(complexType);
    }

    this.writer.writeTypesIndex(this.typesIndexGenerator.generate());
    this.writer.writeOperationsIndex(this.operationsIndexGenerator.generate());
  }

  private generateOperation(info: OperationInfo) {
    const generator = new OperationFileGenerator(info, this.typesGenerator);
    const result = generator.generate();

    this.writer.writeOperation(result.className, result.output);

    this.operationsIndexGenerator.add(result.className);
  }

  private generateSimpleType(info: SimpleTypeInfo) {
    const generator = new SimpleTypeFileGenerator(info, this.typesGenerator);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }

  private generateComplexType(info: ComplexTypeInfo) {
    const generator = new ComplexTypeFileGenerator(info, this.typesGenerator);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }
}
