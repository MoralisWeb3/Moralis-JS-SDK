export interface GeneratorConfiguration {
  classNamePrefix: string;
  mappings: Mappings;
}

export interface Mappings {
  types: TypeMapping[];
  refs: RefMapping[];
}

export interface MappingTarget {
  customClassName?: string;
  customImport?: string;
}

export interface TypeMapping extends MappingTarget {
  typeName: string;
}

export interface RefMapping extends MappingTarget {
  $ref: string;
}
