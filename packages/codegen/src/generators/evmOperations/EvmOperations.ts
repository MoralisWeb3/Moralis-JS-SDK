import { AddActionConfig, Actions } from 'node-plop';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { OpenApiReader } from './OpenApiReader';
import { Operation } from './Operation';

export class EvmOperations {
  private dirname = path.dirname(fileURLToPath(import.meta.url));
  private packagesFolder = path.join(this.dirname, '../../../..');
  private evmUtilsSrcDir = path.join(this.packagesFolder, 'common/evmUtils/src');

  // private addSrcIndex = (): AddActionConfig => {
  //   return {
  //     type: 'add',
  //     templateFile: path.join(this.dirname, 'templates/endpoint/srcIndex.ts.hbs'),
  //     path: path.join(this.evmUtilsSrcDir, 'index.ts'),
  //     force: true,
  //   };
  // };

  // private addRoutersIndex = (): AddActionConfig => {
  //   return {
  //     type: 'add',
  //     template: '// Routers export',
  //     path: path.join(this.evmUtilsSrcDir, 'routers/index.ts'),
  //     force: true,
  //   };
  // };

  private addOperation = (operation: Operation) => {
    const requestUrlParams = operation.getRequestUrlParams();
    // console.log(requestUrlParams[0]?.dataType);
    if (operation.name === 'uploadFolder') {
      console.log('uploadFolder:', operation.getRequestBodyParams());
    }
    return {
      type: 'add',
      templateFile: path.join(this.dirname, 'templates/Operation.ts.hbs'),
      path: path.join(this.evmUtilsSrcDir, `operations/auto/${operation.name}.ts`),
      force: true,
      data: {
        name: operation.name,
        test: true,
        urlPathParamNames: operation.getPathParamNames(),
        urlSearchParamNames: operation.getQueryParamNames(),
        bodyParamNames: operation.getRequestBodyParamNames(),
        hasBodyParams: Boolean(operation.getRequestBodyParams()),
        requestBodyParams: operation.getRequestBodyParams(),
        requestUrlParams,
        requestParamsToOverwrite: requestUrlParams.filter((param) => param.dataType.requestType),
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
