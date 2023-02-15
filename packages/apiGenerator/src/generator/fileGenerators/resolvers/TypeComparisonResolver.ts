import { TypeName } from '../../../reader/utils/TypeName';
import { TypeDeterminant } from '../../GeneratorConfiguration';

export class TypeDeterminantResolver {
  public constructor(private readonly typeDeterminants: TypeDeterminant[]) {}

  public tryResolve(typeName: TypeName): TypeDeterminant | null {
    const typeNameString = typeName.toString();
    const condition = this.typeDeterminants.find((c) => c.typeName === typeNameString);
    return condition ?? null;
  }
}
