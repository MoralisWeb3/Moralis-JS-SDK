export interface GeneratorConfiguration {
  outputDir: string;
  classNamePrefix: string;
  mappings: Mappings;
  typeDeterminants: TypeDeterminant[];

  /**
   * @deprecated Temporary solution. Will be removed in the future.
   */
  supportV2?: boolean;
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
  /**
   * Mapping by type name. The type name comes from the OpenAPI reader (not from the swagger file).
   *
   * @example ["BlockMetadataTransaction_changes_Item"]
   * @example ["WriteOrUpdateModuleChange"]
   */
  typeNames: string[];
}

export interface RefMapping extends MappingTarget {
  /**
   * Mapping by $ref.
   *
   * @example ["#/components/schemas/endpointWeights/properties/price"]
   */
  refs: string[];
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
