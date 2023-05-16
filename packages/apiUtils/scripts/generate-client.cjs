if (process.argv.length !== 4) {
  // eslint-disable-next-line no-console
  console.log('Use: node generate-client.js ../path/to/OutputFile.ts @moralisweb3/name-of-library');
  return;
}

function capitalizeFirst(value) {
  return value.charAt(0).toUpperCase() + value.substring(1);
}

const outputFilePath = process.argv[2];
const outputClassName = outputFilePath.split('/').pop().split('.')[0];
const sourcePackageName = process.argv[3];

/* eslint-disable @typescript-eslint/no-var-requires */
const sourcePackage = require(sourcePackageName);
const fs = require('fs');
const { determineOperationType } = require('@moralisweb3/common-core');

const { operationsV2 } = sourcePackage;
const operationsV3 = sourcePackage.operations || [];

const operations = [
  ...operationsV2.map((operation) => ({
    name: operation.name,
    groupName: operation.groupName,
    operationVarName: `${operation.name}Operation`,
    requestClassName: `${capitalizeFirst(operation.name)}Request`,
    responseClassName: `${capitalizeFirst(operation.name)}ResponseAdapter`,
    responseJSONClassName: null,
    bodyClassName: null,
    hasRequest: Boolean(operation.urlPathParamNames || operation.urlSearchParamNames || operation.bodyParamNames),
    hasBody: false,
    type: determineOperationType(operation),
  })),

  ...operationsV3.map((operation) => {
    const capitalizedName = capitalizeFirst(operation.operationId);
    const isPaginated = operation.parameterNames.includes('cursor');
    return {
      name: operation.operationId,
      groupName: operation.groupName,
      operationVarName: `${capitalizedName}Operation`,
      requestClassName: `${capitalizedName}OperationRequest`,
      responseClassName: `${capitalizedName}OperationResponse`,
      responseJSONClassName: `${capitalizedName}OperationResponseJSON`,
      bodyClassName: operation.hasBody ? `${capitalizedName}OperationBody` : null,
      hasRequest: operation.parameterNames.length > 0,
      hasBody: operation.hasBody,
      type: isPaginated ? 'paginatedV3' : 'V3',
    };
  }),
];

const uniqueGroupNames = new Set(operations.map((o) => o.groupName));
const sourcePackageImports = new Set();
const apiUtilsPackageImports = new Set();
const corePackageImports = new Set();
let bodyOutput = ``;

for (const groupName of uniqueGroupNames) {
  bodyOutput += `
  public readonly ${groupName} = {
`;

  for (const operation of operations.filter((o) => o.groupName === groupName)) {
    let resolverClassName;
    let returnType;
    let methodArgs;
    let fetchArgs;

    switch (operation.type) {
      case 'nonNullable':
        resolverClassName = 'OperationResolver';
        returnType = operation.responseClassName;
        break;
      case 'nullable':
        resolverClassName = 'NullableOperationResolver';
        returnType = `${operation.responseClassName} | null`;
        break;
      case 'paginated':
        resolverClassName = 'PaginatedOperationResolver';
        returnType = operation.responseClassName;
        break;
      case 'V3':
        resolverClassName = 'OperationV3Resolver';
        returnType = `ResponseAdapter<${operation.responseClassName}, ${operation.responseJSONClassName}>`;
        sourcePackageImports.add(operation.responseJSONClassName);
        corePackageImports.add('ResponseAdapter');
        break;
      case 'paginatedV3':
        resolverClassName = 'PaginatedOperationV3Resolver';
        returnType = `PaginatedResponseV3Adapter<${operation.responseClassName}, ${operation.responseJSONClassName}>`;
        sourcePackageImports.add(operation.responseJSONClassName);
        apiUtilsPackageImports.add('PaginatedResponseV3Adapter');
        break;
    }

    switch (operation.type) {
      case 'nonNullable':
      case 'nullable':
      case 'paginated':
        methodArgs = operation.hasRequest ? `request: ${operation.requestClassName}` : '';
        fetchArgs = operation.hasRequest ? 'request' : '';
        break;
      case 'V3':
      case 'paginatedV3':
        methodArgs = operation.hasRequest ? `request: ${operation.requestClassName}` : '';
        fetchArgs = operation.hasRequest ? 'request, ' : '{}, ';
        if (operation.hasBody) {
          methodArgs += `, body: ${operation.bodyClassName}`;
          fetchArgs += 'body';
        } else {
          fetchArgs += 'null';
        }
        break;
    }

    sourcePackageImports.add(operation.operationVarName);
    if (operation.hasRequest) {
      sourcePackageImports.add(operation.requestClassName);
    }
    if (operation.hasBody) {
      sourcePackageImports.add(operation.bodyClassName);
    }
    sourcePackageImports.add(operation.responseClassName);
    apiUtilsPackageImports.add(resolverClassName);

    bodyOutput += `   ${operation.name}: (${methodArgs}): Promise<${returnType}> => {
      return new ${resolverClassName}(${operation.operationVarName}, this.baseUrl, this.core).fetch(${fetchArgs});
    },
`;
  }

  bodyOutput += `
  };
`;
}

const output = `
// CAUTION: This file is automatically generated. Do not edit it manually!
import { ${[...sourcePackageImports].join(', ')} } from '${sourcePackageName}';
import { ${[...apiUtilsPackageImports].join(', ')} } from '@moralisweb3/api-utils';
import { ApiModule, ${[...corePackageImports].join(', ')} } from '@moralisweb3/common-core';
export abstract class ${outputClassName} extends ApiModule {
  ${bodyOutput}
}
`;

fs.writeFileSync(outputFilePath, output);
