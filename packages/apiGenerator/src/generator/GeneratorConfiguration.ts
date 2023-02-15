export interface GeneratorConfiguration {
  outputDir: string;
  classNamePrefix: string;
  mappings: Mappings;
  typeDeterminants: TypeDeterminant[];
}

export interface Mappings {
  types: TypeMapping[];
  refs: RefMapping[];
  complexTypeProperties: ComplexTypePropertyMapping[];
  operationParameters: OperationParameterMapping[];
}

export interface MappingTarget {
  className?: string;
  import?: string;
}

export interface TypeMapping extends MappingTarget {
  typeName: string;
}

export interface RefMapping extends MappingTarget {
  $ref: string;
}

export interface ComplexTypePropertyMapping extends MappingTarget {
  names: string[];
}

export interface OperationParameterMapping extends MappingTarget {
  names: string[];
}

export interface TypeDeterminant {
  typeName: string;
  isInputCode: string;
  isJSONCode: string;
}
