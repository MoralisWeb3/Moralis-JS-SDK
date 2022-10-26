import { PropertySignature } from 'ts-morph';
import { getPropertiesOfPropertySignature, getPropertyByName } from './Utils';

type Item = { name: string; type: string; hasQuestion: boolean };
type Name = 'query' | 'path';
export class Operation {
  operation: PropertySignature;

  constructor(operation: PropertySignature) {
    this.operation = operation;
  }

  private readQueryAndPath = (parentProp: PropertySignature) => {
    return getPropertiesOfPropertySignature(parentProp).map((prop) => {
      return {
        name: prop.getName(),
        type: prop.getType()?.getText().replace(' | undefined', ''),
        hasQuestion: prop.hasQuestionToken(),
      };
    });
  };

  private getParams = () => {
    const parentProp = getPropertyByName(this.operation, 'parameters');
    if (!parentProp) {
      return null;
    }
    const result: Record<Name, Item[] | undefined> = {
      query: undefined,
      path: undefined,
    };

    for (const prop of getPropertiesOfPropertySignature(parentProp)) {
      result[prop.getName() as Name] = this.readQueryAndPath(prop);
    }
    // console.log(result);
    return result;
  };

  public getQueryParams = () => this.getParams()?.query;

  public getQueryParamNames = () => this.getQueryParams()?.map((item) => item.name);

  public getPathParams = () => this.getParams()?.path;

  public read = () => {
    console.log(this.getQueryParamNames());
    return {
      name: this.operation.getName(),
      parameters: this.getParams(),
    };
  };
}
