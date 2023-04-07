import _ from 'lodash';
import { ActionConfig } from 'node-plop';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ModuleGenerator } from '../../../utils/ModuleGenerator';
import { Module } from '../../types';
import { getHookName } from '../../utils/names';
import { OperationFilesParser } from '../../../utils/OperationFilesParser';

export class HooksGenerator {
  private moduleGenerator: ModuleGenerator;
  private opFilesParser: OperationFilesParser;

  constructor(public module: Module, public blackListedOperations?: string[]) {
    this.moduleGenerator = new ModuleGenerator(module, blackListedOperations);
    this.opFilesParser = new OperationFilesParser(module, blackListedOperations);
  }

  public dirname = path.dirname(fileURLToPath(import.meta.url));
  public packagesFolder = path.join(this.dirname, '../../../../..');

  private get addHooks() {
    const parsedRequests = this.opFilesParser.parsedOperations.map((op) => {
      return { name: op.name, request: op.request };
    });
    return this.moduleGenerator.operations.map((operation) => {
      const name = getHookName(operation.name, this.module);
      const isPaginated = operation.firstPageIndex === 0 || operation.firstPageIndex === 1;
      const isNullable = operation?.isNullable;

      let useResolver = 'useOperationResolver';
      if (isPaginated) {
        useResolver = 'usePaginatedOperationResolver';
      }
      if (isNullable) {
        useResolver = 'useNullableOperationResolver';
      }

      const { urlPathParamNames = [], bodyParamNames = [], urlSearchParamNames = [] } = operation;
      const parsedOp = parsedRequests.find((req) => req.name === operation.name);
      const requiredParams = parsedOp?.request?.filter((param) => !param.hasQuestionToken).map((param) => param.name);
      const allParams = [...urlPathParamNames, ...bodyParamNames, ...urlSearchParamNames];

      const templateData = {
        requestType: `${_.upperFirst(operation.name)}Request`,
        responseType: `${_.upperFirst(operation.name)}Response`,
        name,
        useResolver,
        module: _.upperFirst(this.module),
        operation: `${operation.name}Operation`,
        commonUtils: this.moduleGenerator.operationsPackageName,
        hookParamsType: `${_.upperFirst(name)}Params`,
        hookQueryOptionsType: `${_.upperFirst(name)}QueryOptions`,
        requiredParams,
        allParams,
        isNullable,
      };

      return {
        type: 'add',
        templateFile: path.join(this.dirname, 'templates/hook.ts.hbs'),
        path: path.join(this.packagesFolder, `react/src/hooks/${this.module}/generated/{{ name }}.ts`),
        data: templateData,
        force: true,
      };
    });
  }

  private get addHooksIndex() {
    const hookNames = this.moduleGenerator.operations.map((operation) => {
      return getHookName(operation.name, this.module);
    });

    return {
      type: 'add',
      templateFile: path.join(this.dirname, 'templates/index.ts.hbs'),
      path: path.join(this.packagesFolder, `react/src/hooks/${this.module}/generated/index.ts`),
      data: { hookNames },
      force: true,
    };
  }

  public get actions(): ActionConfig[] {
    return [...this.addHooks, this.addHooksIndex];
  }
}
