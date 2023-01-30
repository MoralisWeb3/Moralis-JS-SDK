import { Mappings, RefMapping, TypeMapping } from '../GeneratorConfiguration';

export class MappingResolver {
  public constructor(private readonly mappings: Mappings) {}

  public tryResolveByTypeName(typeName: string): TypeMapping | undefined {
    return this.mappings.types.find((m) => m.typeName === typeName);
  }

  public tryResolveBy$ref($ref: string): RefMapping | undefined {
    return this.mappings.refs.find((r) => r.$ref === $ref);
  }
}
