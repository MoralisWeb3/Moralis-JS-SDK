import { OperationV3 } from '@moralisweb3/common-aptos-utils';
import { ObjectLiteralExpression, SourceFile, SyntaxKind } from 'ts-morph';
import { OperationTsObjectMethodsParser, Parameter } from './OperationTsObjectMethodsParser';
import { OperationTsObjectPropertiesParser } from './OperationTsObjectPropertiesParser';

export interface ParameterInfo {
  name: string;
  type: string;
  isOptional: boolean;
  jsDoc?: string;
}

export type OperationInfo = Record<keyof OperationV3<any, any, any, any, any, any>, any>;

export type Method = {
  returnType: {
    type: string;
    typeReference: string;
  };
  parameters: Parameter[];
};

export type OperationObjectMethods = {
  serializeRequest: Method;
  serializeBody?: Method;
  parseResponse: Method;
};
// export type OperationObjectMethods = Pick<OperationInfo, 'serializeRequest' | 'serializeBody' | 'parseResponse'>;
export type OperationObjectProperties = Omit<OperationInfo, keyof OperationObjectMethods>;

export class OperationV3FileReader {
  private operationTsObject: ObjectLiteralExpression;

  public static create = (sourceFile: SourceFile) => {
    return new OperationV3FileReader(sourceFile);
  };

  private constructor(sourceFile: SourceFile) {
    this.operationTsObject = this.findOperationTsObject(sourceFile);
  }

  public read() {
    return {
      ...this.getOperationTsObjectProperties(),
      ...this.getOperationTsObjectMethods(),
    };
  }

  private getOperationTsObjectMethods(): OperationObjectMethods {
    const operationMethodsParser = OperationTsObjectMethodsParser.create(this.operationTsObject);
    return operationMethodsParser.parse();
  }

  private getOperationTsObjectProperties(): OperationObjectProperties {
    const operationPropertiesParser = OperationTsObjectPropertiesParser.create(this.operationTsObject);
    return operationPropertiesParser.parse();
  }

  private findOperationTsObject(sourceFile: SourceFile): ObjectLiteralExpression {
    const operationTsVar = sourceFile.getVariableDeclarations().find((i) => /Operation$/.test(i.getName()));
    if (!operationTsVar) {
      throw new Error('No Operation variable found in file: ' + sourceFile.getFilePath());
    }

    const operationTsObject = operationTsVar.getFirstChildByKindOrThrow(SyntaxKind.ObjectLiteralExpression);

    return operationTsObject;
  }
}
