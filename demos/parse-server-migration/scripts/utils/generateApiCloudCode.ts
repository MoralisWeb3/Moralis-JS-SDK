import { Endpoint } from '../types/Endpoint';
import fs from 'fs';

type Module = 'EvmApi' | 'SolApi';

const getModulePrefix = (module: Module) => {
  switch (module) {
    case 'EvmApi':
      return '';
    case 'SolApi':
      return 'sol-';
    default:
      throw new Error(`Unsupported module ${module}`);
  }
};

const getModulePackageName = (module: Module) => {
  switch (module) {
    case 'EvmApi':
      return '@moralisweb3/common-evm-utils';
    case 'SolApi':
      return '@moralisweb3/common-sol-utils';
    default:
      throw new Error(`Unsupported module ${module}`);
  }
};

const generateCloudCode = (module: Module, endpoint: Endpoint) => {
  let code = '';
  const name = `${getModulePrefix(module)}${endpoint.name}`;
  const varName = `${endpoint.name}Operation`;
  code += `
const ${varName} = getOperation('${endpoint.methodName}');
Parse.Cloud.define("${name}", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, '${endpoint.name}');
    const request = upgradeRequest(params, ${varName});
    const result = await Moralis.${module}.${endpoint.group}.${endpoint.methodName}(${
    endpoint.noArgs ? '' : 'request'
  });
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, '${name}'));
  }
})`;

  return code;
};

const generateAllCloudCode = (module: Module, endpoints: Endpoint[]) => {
  const packageName = getModulePackageName(module);
  let output = `/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Moralis from 'moralis'
import { MoralisError, Operation } from '@moralisweb3/common-core';
import { handleRateLimit } from '../../rateLimit';
import { upgradeRequest } from '../upgradeRequest'
import { AxiosError } from 'axios';
import { operations } from '${packageName}';
declare const Parse: any;

function getErrorMessage(error: Error, name: string) {
  // Resolve Axios data inside the MoralisError
  if (
    error instanceof MoralisError &&
    error.cause &&
    error.cause instanceof AxiosError &&
    error.cause.response &&
    error.cause.response.data
  ) {
    return JSON.stringify(error.cause.response.data);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return \`API error while calling \${name}\`
}

function getOperation(operationName: string): Operation<unknown, unknown, unknown, unknown> {
  const operation = operations.find((o) => o.name === operationName);
  if (!operation) {
    throw new Error(\`Not supported operation \${operationName}\`);
  }
  return operation as Operation<unknown, unknown, unknown, unknown>;
}

async function beforeApiRequest(user: any, ip: any, name: string) {
  if (!(await handleRateLimit(user, ip))) {
    throw new Error(
      \`Too many requests to \${name} API from this particular client, the clients needs to wait before sending more requests.\`
    );
  }
}

`;

  endpoints.forEach((endpoint) => {
    output += generateCloudCode(module, endpoint);
    output += '\n\n';
  });

  return output;
};

export const createCloudFile = async (outPath: string, module: Module, endpoints: Endpoint[]) => {
  const code = generateAllCloudCode(module, endpoints);
  await fs.writeFileSync(outPath, code);
};
