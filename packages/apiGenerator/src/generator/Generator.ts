import { IndexFileGenerator } from './fileGenerators/IndexFileGenerator';
import { OperationFileGenerator } from './fileGenerators/OperationFileGenerator';
import { SimpleTypeFileGenerator } from './fileGenerators/SimpleTypeFileGenerator';
import { ComplexTypeFileGenerator } from './fileGenerators/ComplexTypeFileGenerator';
import { GeneratorWriter } from './GeneratorWriter';
import {
  ComplexTypeInfo,
  OpenApiContract,
  OperationInfo,
  SimpleTypeInfo,
  UnionTypeInfo,
} from '../reader/OpenApiContract';
import { TypeResolver } from './fileGenerators/resolvers/TypeResolver';
import { AbstractClientFileGenerator } from './fileGenerators/AbstractClientFileGenerator';
import { MappingResolver } from './fileGenerators/resolvers/MappingResolver';
import { UnionTypeFileGenerator } from './fileGenerators/UnionTypeFileGenerator';
import { GeneratorConfiguration } from './GeneratorConfiguration';
import { TypeDeterminantResolver } from './fileGenerators/resolvers/TypeDeterminantResolver';
import { TypeInfoResolver } from './fileGenerators/resolvers/TypeInfoResolver';
import { OperationListFileGenerator } from './fileGenerators/OperationListFileGenerator';

export class Generator {
  public static create(
    contract: OpenApiContract,
    configuration: GeneratorConfiguration,
    projectPath: string,
  ): Generator {
    const mappingResolver = new MappingResolver(configuration.mappings);
    const typeInfoResolver = new TypeInfoResolver(contract);
    const typeResolver = new TypeResolver(configuration.classNamePrefix, mappingResolver, typeInfoResolver);
    const typeDeterminantResolver = new TypeDeterminantResolver(configuration.typeDeterminants);
    const generatorWriter = new GeneratorWriter(projectPath, configuration.outputDir);
    return new Generator(
      contract,
      typeResolver,
      typeDeterminantResolver,
      typeInfoResolver,
      generatorWriter,
      configuration,
    );
  }

  private readonly typesIndexGenerator = new IndexFileGenerator();
  private readonly operationsIndexGenerator = new IndexFileGenerator();
  private readonly operationListGenerator = new OperationListFileGenerator();

  private constructor(
    private readonly contract: OpenApiContract,
    private readonly typeResolver: TypeResolver,
    private readonly typeDeterminantResolver: TypeDeterminantResolver,
    private readonly typeInfoResolver: TypeInfoResolver,
    private readonly writer: GeneratorWriter,
    private readonly configuration: GeneratorConfiguration,
  ) {}

  public generate() {
    const excludedRefs = new Set(this.configuration.mappings.refs.map((r) => r.refs).flat());

    this.writer.prepare();

    for (const operation of this.contract.operations) {
      this.generateOperation(operation);
    }
    for (const simpleType of this.contract.simpleTypes) {
      if (!excludedRefs.has(simpleType.descriptor.ref.toString())) {
        this.generateSimpleType(simpleType);
      }
    }
    for (const complexType of this.contract.complexTypes) {
      if (!excludedRefs.has(complexType.descriptor.ref.toString())) {
        this.generateComplexType(complexType);
      }
    }
    for (const unionType of this.contract.unionTypes) {
      if (!excludedRefs.has(unionType.descriptor.ref.toString())) {
        this.generateUnionType(unionType);
      }
    }

    const abstractClientFileGenerator = new AbstractClientFileGenerator(
      this.contract.operations,
      this.typeResolver,
      this.typeInfoResolver,
    );
    this.writer.writeAbstractClient(abstractClientFileGenerator.generate());

    this.operationsIndexGenerator.add('operations');

    this.writer.writeTypesIndex(this.typesIndexGenerator.generate());
    this.writer.writeOperationsIndex(this.operationsIndexGenerator.generate());
    this.writer.writeOperationList(this.operationListGenerator.generate());
  }

  private generateOperation(info: OperationInfo) {
    const generator = new OperationFileGenerator(info, this.typeResolver, this.configuration);
    const result = generator.generate();

    this.writer.writeOperation(result.className, result.output);

    this.operationsIndexGenerator.add(result.className);
    this.operationListGenerator.add(result.className);
  }

  private generateSimpleType(info: SimpleTypeInfo) {
    const generator = new SimpleTypeFileGenerator(info, this.typeResolver);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }

  private generateComplexType(info: ComplexTypeInfo) {
    const generator = new ComplexTypeFileGenerator(
      info,
      this.typeResolver,
      this.typeDeterminantResolver,
      this.typeInfoResolver,
    );
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }

  private generateUnionType(info: UnionTypeInfo) {
    const generator = new UnionTypeFileGenerator(info, this.typeResolver);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }
}
