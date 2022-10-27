import _ from 'lodash';
import { IndexedAccessTypeNode, PropertySignature, SyntaxKind } from 'ts-morph';
import { getPropertiesOfPropertySignature, getPropertyByName } from './utils';

// export interface Item {
//   name: string;
//   type: string;
//   hasQuestion?: boolean;
// }

const verify = (name: string, _type: string, _hasQuestion?: boolean) => {
  if (name.includes('address')) {
    return {
      requestType: 'EvmAddressish',
      serialize: (domain: string) => `${domain}.${name}.toString()`,
      deSerialize: (domain: string, core: string) => `EvmAddress.create(${domain}.${_.camelCase(name)}, ${core})`,
    };
  }
  if (name.includes('chain')) {
    return {
      requestType: 'EvmChainish',
      serialize: (domain: string) => `EvmChainResolver.resolve(${domain}.${_.camelCase(name)}, core).apiHex`,
      deSerialize: (domain: string, core: string) => `EvmChain.create(${domain}.${_.camelCase(name)}, ${core})`,
    };
  }
  if (name.includes('abi')) {
    return {
      requestType: 'unknown',
      serialize: (domain: string) => `${domain}.${_.camelCase(name)}`,
      deSerialize: (domain: string, _core: string) => `${domain}.${_.camelCase(name)}`,
    };
  }
  return {
    requestType: undefined,
    serialize: (domain: string) => `${domain}.${_.camelCase(name)}`,
    deSerialize: (domain: string, _core: string) => `${domain}.${_.camelCase(name)}`,
  };
};
export class TypeItem {
  public name;
  public type;
  public hasQuestion;
  public dataType;

  constructor(name: string, type: string, hasQuestion?: boolean) {
    this.name = name;
    this.type = type;
    this.hasQuestion = hasQuestion;
    this.dataType = verify(name, type, hasQuestion);
  }
}

export type Name = 'query' | 'path';
export class Operation {
  operation: PropertySignature;
  name: string;

  constructor(operation: PropertySignature) {
    this.operation = operation;
    this.name = operation.getName();
  }

  private readQueryAndPath = (parentProp: PropertySignature) => {
    return getPropertiesOfPropertySignature(parentProp)?.map(
      (prop) =>
        new TypeItem(prop.getName(), prop.getType()?.getText().replace(' | undefined', ''), prop.hasQuestionToken()),
    );
  };

  private getParams = () => {
    const parentProp = getPropertyByName(this.operation, 'parameters');
    if (!parentProp) {
      return null;
    }
    const result: Record<Name, TypeItem[] | undefined> = {
      query: undefined,
      path: undefined,
    };

    const props = getPropertiesOfPropertySignature(parentProp);

    if (!props) {
      return null;
    }

    for (const prop of props) {
      result[prop.getName() as Name] = this.readQueryAndPath(prop);
    }

    return result;
  };

  private parseIndexedAccessType = (indexAcctype: IndexedAccessTypeNode) => {
    return indexAcctype
      .getType()
      ?.getProperties()
      .map((symb) => new TypeItem(symb.getName(), symb.getDeclaredType().getText()));
  };

  public getRequestBodyParams = () => {
    const requestBodyProp = getPropertyByName(this.operation, 'requestBody');
    if (!requestBodyProp) {
      return undefined;
    }
    const contentProp = getPropertyByName(requestBodyProp, 'content');
    if (!contentProp) {
      return undefined;
    }

    const applicationJsonProp = getPropertyByName(contentProp, '"application/json"');

    if (!applicationJsonProp) {
      return undefined;
    }

    return applicationJsonProp.forEachChild((childNode) => {
      if (childNode.isKind(SyntaxKind.IndexedAccessType)) {
        return this.parseIndexedAccessType(childNode);
      }

      if (childNode.isKind(SyntaxKind.ArrayType)) {
        return [];
        // const xxx = childNode.getFirstChildIfKind(SyntaxKind.IndexedAccessType);
        // if (!xxx) {
        //   return undefined;
        // }
        // return this.parseIndexedAccessType(xxx);
      }

      if (childNode.isKind(SyntaxKind.TypeLiteral)) {
        const indexSig = childNode.getFirstChildByKind(SyntaxKind.IndexSignature);
        if (!indexSig) {
          return undefined;
        }
        return [new TypeItem(indexSig.getKeyName(), indexSig.getType().getText())];
      }

      return undefined;
    });
  };

  public getRequestBodyParamNames = () => this.getRequestBodyParams()?.map((param) => param.name);

  public getQueryParams = () => this.getParams()?.query;

  public getQueryParamNames = () => this.getQueryParams()?.map((param) => param.name);

  public getPathParams = () => this.getParams()?.path;

  public getPathParamNames = () => this.getPathParams()?.map((param) => param.name);

  public getRequestUrlParams = () => [
    ...(this.getQueryParams() || []),
    ...(this.getPathParams() || []),
    ...(this.getRequestBodyParams() || []),
  ];

  public read = () => {
    // console.log(this.getRequestBodyParams());
    return {
      name: this.operation.getName(),
      parameters: this.getParams(),
    };
  };
}
