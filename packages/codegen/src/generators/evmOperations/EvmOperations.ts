import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { OpenApiReader } from './OpenApiReader';
import { Operation } from './Operation';
import _ from 'lodash';

export class EvmOperations {
  private dirname = path.dirname(fileURLToPath(import.meta.url));
  private packagesFolder = path.join(this.dirname, '../../../..');
  private evmUtilsSrcDir = path.join(this.packagesFolder, 'common/evmUtils/src');
  private addOperation = (operation: Operation) => {
    const requestUrlParams = operation.getRequestUrlParams();
    const requestParamsToOverwrite = requestUrlParams.filter((param) => param.dataType.requestType);
    const utilsToImport = _.uniq(
      requestParamsToOverwrite
        .map((param) => {
          const { dataType } = param.dataType;

          if (dataType) {
            return [dataType, param.dataType.requestType];
          }
          return undefined;
        })
        .flat(1),
    );

    const response = operation.getResponse();

    return {
      type: 'add',
      templateFile: path.join(this.dirname, 'templates/Operation.ts.hbs'),
      path: path.join(this.evmUtilsSrcDir, `operations/auto/${operation.name}.ts`),
      force: true,
      data: {
        name: operation.name,
        method: operation.method,
        path: operation.path,
        test: true,
        urlPathParamNames: operation.getPathParamNames(),
        urlSearchParamNames: operation.getQueryParamNames(),
        bodyParamNames: operation.getRequestBodyParamNames(),
        hasBodyParams: Boolean(operation.getRequestBodyParams()),
        requestBodyParams: operation.getRequestBodyParams(),
        requestUrlParams,
        requestBodyAndParams: [...(operation.getRequestBodyParams() || []), ...requestUrlParams],
        requestParamsToOverwrite,
        utilsToImport,
        isEvmChainImported: utilsToImport.includes('EvmChain'),
        isMaybeImported: Boolean(requestUrlParams.find((param) => param.type === 'number')),
        isPaginated: response.isPaginated,
      },
    };
  };

  public getGenerator = () => {
    const op = new OpenApiReader('src/generators/evmOperations/openapi.ts');
    // op.
    return op.getOperations().map((operation) => {
      return this.addOperation(operation);
    });
    // console.log(op.getOperationParameters());
    // return [];
    // const { Streams, EvmApi, SolApi } = Moralis;
    // const mappedActions = [Streams, EvmApi, SolApi]
    //   .map(({ name, baseUrl, endpoints }) =>
    //     new RouterGenerator(name, baseUrl, endpoints.getDescriptors(), this.evmUtilsSrcDir).getGenerator(),
    //   )
    //   .flat(1);
    // return [this.addSrcIndex(), this.addRoutersIndex(), ...mappedActions] as Actions;
  };
}
