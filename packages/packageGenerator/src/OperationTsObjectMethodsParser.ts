import { MethodDeclaration, ObjectLiteralExpression, Symbol, SyntaxKind, Type, ts } from 'ts-morph';
import { OperationObjectMethods } from './OperationV3FileReader';
import { TsSymbolReader } from './TsSymbolReader';

export type Parameter = {
  name: string;
  isArray: boolean;
  isOptional: boolean;
  isUnion: boolean;
  type: string[];
  properties: {
    byType?: {
      name: string;
      type: string;
      jsDoc: string;
      isOptional: boolean;
    }[];
    byUnionType?: {
      name: string;
      isArray: boolean;
      properties: Record<string, any>[];
    }[];
  };
};
export class OperationTsObjectMethodsParser {
  public static create(operationTsObject: ObjectLiteralExpression) {
    return new OperationTsObjectMethodsParser(operationTsObject);
  }

  private constructor(private readonly operationTsObject: ObjectLiteralExpression) {}

  private getTsPropertiesFromTsType(tsType: Type<ts.Type>): Symbol[] {
    const isArray = tsType.isArray();
    if (isArray) {
      return tsType.getArrayElementTypeOrThrow().getProperties();
    }
    return tsType.getProperties();
  }

  private getTsUnionTypeProperties(tsType: Type<ts.Type>, tsMethodDeclaration: MethodDeclaration) {
    const unionTsTypes = tsType.getUnionTypes();

    return unionTsTypes.map((param) => {
      const parameterProperties = this.getTsPropertiesFromTsType(param);

      return {
        name: param.getText(tsMethodDeclaration),
        isArray: param.isArray(),
        properties: parameterProperties.map((tsMethodDeclaration) => {
          const tsSymbolReader = TsSymbolReader.create(tsMethodDeclaration);
          return tsSymbolReader.read();
        }),
      };
    });
  }

  private getTsTypeProperties(tsType: Type<ts.Type>) {
    const parameterProperties = this.getTsPropertiesFromTsType(tsType);

    return parameterProperties.map((tsMethodDeclaration) => {
      const tsSymbolReader = TsSymbolReader.create(tsMethodDeclaration);
      return tsSymbolReader.read();
    });
  }

  private getTsTypeUnionTypes(tsType: Type<ts.Type>, tsMethodDeclaration: MethodDeclaration) {
    const unionTsTypes = tsType.getUnionTypes();
    return unionTsTypes.map((unionType) => unionType.getText(tsMethodDeclaration));
  }

  private getParameters(tsMethodDeclaration: MethodDeclaration): Parameter[] {
    const parameterTsDeclarations = tsMethodDeclaration.getParameters();

    return parameterTsDeclarations.map((parameterTsDeclaration) => {
      const parameterTsType = parameterTsDeclaration.getType();

      const isUnion = parameterTsType.isUnion();

      return {
        name: parameterTsDeclaration.getName(),
        isArray: parameterTsType.isArray(),
        isOptional: parameterTsDeclaration.isOptional(),
        isUnion,
        type: isUnion
          ? this.getTsTypeUnionTypes(parameterTsType, tsMethodDeclaration)
          : [parameterTsType.getText(tsMethodDeclaration)],
        properties: {
          byType: this.getTsTypeProperties(parameterTsType),
          byUnionType: isUnion ? this.getTsUnionTypeProperties(parameterTsType, tsMethodDeclaration) : undefined,
        },
      };
    });
  }

  private getReturnType(tsMethodDeclaration: MethodDeclaration) {
    const returnedTsType = tsMethodDeclaration.getReturnType();
    let typeReference: string;

    if (returnedTsType.isArray()) {
      const arrayElementType = returnedTsType.getArrayElementTypeOrThrow();
      typeReference = arrayElementType.getText(tsMethodDeclaration);
    } else {
      typeReference = returnedTsType.getText(tsMethodDeclaration);
    }

    return {
      type: returnedTsType.getText(tsMethodDeclaration),
      typeReference,
    };
  }

  public parse(): OperationObjectMethods {
    const tsMethodDeclarations = this.operationTsObject.getChildrenOfKind(SyntaxKind.MethodDeclaration);

    const operationMethods = {} as OperationObjectMethods;

    for (const tsMethodDeclaration of tsMethodDeclarations) {
      const name = tsMethodDeclaration.getNameNode().getText() as keyof OperationObjectMethods;
      operationMethods[name] = {
        returnType: this.getReturnType(tsMethodDeclaration),
        parameters: this.getParameters(tsMethodDeclaration),
      };
    }

    return operationMethods;
  }
}
