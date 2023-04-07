import { PropertyInfo } from 'src/reader/OpenApiContract';
import { TypeResolver } from '../resolvers/TypeResolver';
import { PropertyNameModelBuilder, PropertyNameModel } from './PropertyNameModelBuilder';
import { TypeCodes, TypeCodesGenerator } from '../codeGenerators/TypeCodesGenerator';
import { ValueMappingCodeGenerator } from '../codeGenerators/ValueMappingCodeGenerator';
import { JSDocTypeResolver } from '../codeGenerators/JSDocTypeResolver';

export class ComplexTypePropertyModelBuilder {
  public constructor(private readonly typeResolver: TypeResolver) {}

  public build(properties: PropertyInfo[]): ComplexTypePropertyModel[] {
    return properties.map(this.buildProperty);
  }

  private readonly buildProperty = (property: PropertyInfo): ComplexTypePropertyModel => {
    const resolvedPropertyType = this.typeResolver.resolveForComplexTypeProperty(property.descriptor, property.name);
    const propertyNameCodes = PropertyNameModelBuilder.build(property.name);
    return {
      ref: property.descriptor.ref.toString(),
      description: property.description,
      isRequired: property.isRequired,
      name: propertyNameCodes,
      typeCodes: TypeCodesGenerator.generate(resolvedPropertyType, property.isRequired),
      json2typeCode: ValueMappingCodeGenerator.generateJSON2TypeCode(
        resolvedPropertyType,
        `json${propertyNameCodes.rawAccessCode}`,
        property.isRequired,
      ),
      type2jsonCode: ValueMappingCodeGenerator.generateType2JSONCode(
        resolvedPropertyType,
        `this${propertyNameCodes.normalizedAccessCode}`,
        property.isRequired,
      ),
      input2typeCode: ValueMappingCodeGenerator.generateInput2TypeCode(
        resolvedPropertyType,
        `input${propertyNameCodes.normalizedAccessCode}`,
        property.isRequired,
      ),
      jsdocType: JSDocTypeResolver.resolve(resolvedPropertyType),
    };
  };
}

export interface ComplexTypePropertyModel {
  ref: string;
  name: PropertyNameModel;
  description: string | undefined;
  isRequired: boolean;
  typeCodes: TypeCodes;
  json2typeCode: string;
  type2jsonCode: string;
  input2typeCode: string;
  jsdocType: string;
}
