import { OpenAPI } from 'openapi-types';
import { OpenApiReader } from '../reader/OpenApiReader';
import { IndexFileGenerator } from './fileGenerators/IndexFileGenerator';
import { OperationFileGenerator } from './fileGenerators/OperationFileGenerator';
import { SimpleTypeFileGenerator } from './fileGenerators/SimpleTypeFileGenerator';
import { ComplexTypeFileGenerator } from './fileGenerators/ComplexTypeFileGenerator';
import { GeneratorWriter } from './GeneratorWriter';
import { ComplexTypeInfo, OperationInfo, SimpleTypeInfo } from '../reader/OpenApiReaderResult';
import { TypeResolver } from './fileGenerators/TypeResolver';
import { Configuration } from '../configuration/Configuration';
import { AbstractClientFileGenerator } from './fileGenerators/AbstractClientFileGenerator';

export class Generator {
  public static create(document: OpenAPI.Document, configuration: Configuration, outputPath: string): Generator {
    const typeResolver = new TypeResolver(configuration.generator.classNamePrefix, configuration.generator.mappings);
    const generatorWriter = new GeneratorWriter(outputPath);
    return new Generator(document, configuration, typeResolver, generatorWriter);
  }

  private readonly typesIndexGenerator = new IndexFileGenerator();
  private readonly operationsIndexGenerator = new IndexFileGenerator();

  private constructor(
    private readonly document: OpenAPI.Document,
    private readonly configuration: Configuration,
    private readonly typeResolver: TypeResolver,
    private readonly writer: GeneratorWriter,
  ) {}

  public generate() {
    this.writer.prepare();

    const result = OpenApiReader.create(this.document, this.configuration.openApiReader).read();
    for (const operation of result.operations) {
      this.generateOperation(operation);
    }
    for (const simpleType of result.simpleTypes) {
      this.generateSimpleType(simpleType);
    }
    for (const complexType of result.complexTypes) {
      this.generateComplexType(complexType);
    }

    const abstractFileGenerator = new AbstractClientFileGenerator(result.operations, this.typeResolver);
    this.writer.writeAbstractClient(abstractFileGenerator.generate());

    this.writer.writeTypesIndex(this.typesIndexGenerator.generate());
    this.writer.writeOperationsIndex(this.operationsIndexGenerator.generate());
  }

  private generateOperation(info: OperationInfo) {
    const generator = new OperationFileGenerator(info, this.typeResolver);
    const result = generator.generate();

    this.writer.writeOperation(result.className, result.output);

    this.operationsIndexGenerator.add(result.className);
  }

  private generateSimpleType(info: SimpleTypeInfo) {
    const generator = new SimpleTypeFileGenerator(info, this.typeResolver);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }

  private generateComplexType(info: ComplexTypeInfo) {
    const generator = new ComplexTypeFileGenerator(info, this.typeResolver);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }
}
