import { MappingResolver } from './MappingResolver';
import { TypeResolver } from './TypeResolver';

export class TypeResolverFactory {
  public constructor(private readonly classNamePrefix: string, private readonly mappingResolver: MappingResolver) {}

  public create(basePath: string) {
    return new TypeResolver(this.classNamePrefix, this.mappingResolver, basePath);
  }
}
