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
import { MappingResolver } from './fileGenerators/MappingResolver';
import { TypeResolverFactory } from './fileGenerators/TypeResolverFactory';

export class Generator {
  public static create(document: OpenAPI.Document, configuration: Configuration, outputPath: string): Generator {
    const mappingResolver = new MappingResolver(configuration.generator.mappings);
    const typeResolverFactory = new TypeResolverFactory(configuration.generator.classNamePrefix, mappingResolver);
    const generatorWriter = new GeneratorWriter(outputPath);
    return new Generator(document, configuration, typeResolverFactory, generatorWriter);
  }

  private readonly typesIndexGenerator = new IndexFileGenerator();
  private readonly operationsIndexGenerator = new IndexFileGenerator();

  private constructor(
    private readonly document: OpenAPI.Document,
    private readonly configuration: Configuration,
    private readonly typeResolverFactory: TypeResolverFactory,
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

    const abstractClientTypeResolver = this.typeResolverFactory.create('./');
    const abstractClientFileGenerator = new AbstractClientFileGenerator(result.operations, abstractClientTypeResolver);
    this.writer.writeAbstractClient(abstractClientFileGenerator.generate());

    this.writer.writeTypesIndex(this.typesIndexGenerator.generate());
    this.writer.writeOperationsIndex(this.operationsIndexGenerator.generate());
  }

  private generateOperation(info: OperationInfo) {
    const typeResolver = this.typeResolverFactory.create('../');
    const generator = new OperationFileGenerator(info, typeResolver);
    const result = generator.generate();

    this.writer.writeOperation(result.className, result.output);

    this.operationsIndexGenerator.add(result.className);
  }

  private generateSimpleType(info: SimpleTypeInfo) {
    const typeResolver = this.typeResolverFactory.create('../');
    const generator = new SimpleTypeFileGenerator(info, typeResolver);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }

  private generateComplexType(info: ComplexTypeInfo) {
    const typeResolver = this.typeResolverFactory.create('../');
    const generator = new ComplexTypeFileGenerator(info, typeResolver);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }
}
