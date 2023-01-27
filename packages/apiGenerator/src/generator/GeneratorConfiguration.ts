export interface GeneratorConfiguration {
  classNamePrefix: string;
  mappings: TypeMappings;
}

export interface TypeMappings {
  classMappings: ClassMapping[];
}

export interface ClassMapping {
  typeName: string;
  customClassName?: string;
}
