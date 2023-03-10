import _ from 'lodash';
import ts from 'ts-morph';

interface Parameter {
  name: string;
  isRequired: boolean;
}

interface Operation {
  name: string;
  requiredParams: string[];
}

function getParametersFromProperty(parameterProperty: ts.Symbol): Parameter[] {
  const parameters: Parameter[] = [];
  parameterProperty
    .getTypeAtLocation(parameterProperty.getDeclarations()[0])
    .getProperties()
    .forEach((paramProperty) => {
      const name = paramProperty.getName();
      parameters.push({
        name: _.camelCase(name),
        isRequired: !paramProperty.getDeclarations()[0].getText().includes('?:'),
      });
    });
  return parameters;
}

export const getAllOperationProperties = (sourceFilePath: string) => {
  const project = new ts.Project();
  const sourceFile = project.addSourceFileAtPath(sourceFilePath);

  const operations: Operation[] = [];

  const operationsInterface = sourceFile.getInterfaceOrThrow('operations');
  operationsInterface.getProperties().forEach((property) => {
    const name = property.getName();
    let queryParameters: Parameter[] = [];
    let pathParameters: Parameter[] = [];
    let requestBodyParameters: Parameter[] = [];

    const propertyType = property.getType();
    const parametersSymbol = propertyType.getProperty('parameters');
    const parametersType = parametersSymbol?.getTypeAtLocation(parametersSymbol.getDeclarations()[0]);
    const queryProperty = parametersType?.getProperty('query');
    if (queryProperty) {
      queryParameters = getParametersFromProperty(queryProperty);
    }

    const pathProperty = parametersType?.getProperty('path');
    if (pathProperty) {
      pathParameters = getParametersFromProperty(pathProperty);
    }

    const requestBodyProperty = propertyType.getProperty('requestBody');
    const requestBodyPropertyType = requestBodyProperty?.getTypeAtLocation(requestBodyProperty.getDeclarations()[0]);
    const contentSymbol = requestBodyPropertyType?.getProperty('content');
    const contentType = contentSymbol?.getTypeAtLocation(contentSymbol.getDeclarations()[0]);
    const applicationJson = contentType?.getProperty('application/json');
    if (applicationJson) {
      requestBodyParameters = getParametersFromProperty(applicationJson);
    }

    const requiredQueryParameters = queryParameters.filter((p) => p.isRequired).map((p) => p.name);
    const requiredPathParameters = pathParameters.filter((p) => p.isRequired).map((p) => p.name);
    const requiredRequestBodyParameters = requestBodyParameters.filter((p) => p.isRequired).map((p) => p.name);

    operations.push({
      name,
      requiredParams: [...requiredQueryParameters, ...requiredPathParameters, ...requiredRequestBodyParameters],
    });
  });

  return operations;
};
