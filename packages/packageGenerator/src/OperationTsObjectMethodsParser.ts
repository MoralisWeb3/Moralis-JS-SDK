import { MethodDeclaration, ObjectLiteralExpression, Symbol, SyntaxKind, Type, ts } from 'ts-morph';
import { OperationObjectMethods } from './OperationV3FileReader';
import { TsSymbolReader } from './TsSymbolReader';

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

  private getParameters(tsMethodDeclaration: MethodDeclaration) {
    const parameterTsDeclarations = tsMethodDeclaration.getParameters();

    return parameterTsDeclarations.map((parameterTsDeclaration) => {
      const parameterTsType = parameterTsDeclaration.getType();

      const isUnion = parameterTsType.isUnion();

      return {
        name: parameterTsDeclaration.getName(),
        isArray: parameterTsType.isArray(),
        isOptional: parameterTsDeclaration.isOptional(),
        isUnion,
        properties: {
          byType: this.getTsTypeProperties(parameterTsType),
          byUnionType: isUnion ? this.getTsUnionTypeProperties(parameterTsType, tsMethodDeclaration) : undefined,
        },
        type: parameterTsType.getText(tsMethodDeclaration),
      };
    });
  }

  private getReturnType(tsMethodDeclaration: MethodDeclaration) {
    const returnedTsType = tsMethodDeclaration.getReturnType();
    return returnedTsType.getText(tsMethodDeclaration);
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
