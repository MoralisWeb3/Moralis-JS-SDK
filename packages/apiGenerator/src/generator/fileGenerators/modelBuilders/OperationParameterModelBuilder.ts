import { ParameterInfo } from 'src/reader/OpenApiContract';
import { NameFormatter } from '../codeGenerators/NameFormatter';
import { TypeResolver } from '../resolvers/TypeResolver';
import { TypeCodes, TypeCodesGenerator } from '../codeGenerators/TypeCodesGenerator';
import { ValueMappingCodeGenerator } from '../codeGenerators/ValueMappingCodeGenerator';
import { JSDocTypeResolver } from '../codeGenerators/JSDocTypeResolver';
import { PropertyNameModel, PropertyNameModelBuilder } from './PropertyNameModelBuilder';

export class OperationParameterModelBuilder {
  public constructor(private readonly typeResolver: TypeResolver) {}

  public build(parameters: ParameterInfo[]): OperationParameterModel[] {
    return parameters.map(this.buildParameter);
  }

  private readonly buildParameter = (parameter: ParameterInfo): OperationParameterModel => {
    const normalizedName = NameFormatter.getParameterName(parameter.name);
    const resolvedParamType = this.typeResolver.resolveForOperationParameter(parameter.descriptor, parameter.name);
    const types = TypeCodesGenerator.generate(resolvedParamType, parameter.isRequired);

    return {
      ref: parameter.descriptor.ref.toString(),
      name: PropertyNameModelBuilder.build(parameter.name),
      description: parameter.description,
      isRequired: parameter.isRequired,
      types,
      input2typeCode: ValueMappingCodeGenerator.generateInput2TypeCode(
        resolvedParamType,
        `request.${normalizedName}`,
        parameter.isRequired,
      ),
      type2jsonCode: ValueMappingCodeGenerator.generateType2JSONCode(
        resolvedParamType,
        normalizedName,
        parameter.isRequired,
      ),
      jsdocType: JSDocTypeResolver.resolve(resolvedParamType),
    };
  };
}

export interface OperationParameterModel {
  ref: string;
  name: PropertyNameModel;
  description: string | undefined;
  isRequired: boolean;
  types: TypeCodes;
  input2typeCode: string;
  type2jsonCode: string;
  jsdocType: string;
}
