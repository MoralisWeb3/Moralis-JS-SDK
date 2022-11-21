import { ActionConfig } from 'node-plop';
import { getHookName } from '../../utils/names';
import { OperationFilesParser } from '../../../utils/OperationFilesParser';
import { paths } from './utils/constants';
import Handlebars from 'handlebars';
import path from 'node:path';
import { Module } from '../../types';

export class ReadmeGenerator {
  private operationFilesParser: OperationFilesParser;

  constructor(public module: Module, public blackListedOperations?: string[]) {
    this.operationFilesParser = new OperationFilesParser(module, blackListedOperations);
  }

  private get appendHookDescriptions() {
    let pattern: string;
    switch (this.module) {
      case 'evmApi':
        pattern = '# Evm Api Hooks';
        break;
      case 'solApi':
        pattern = '# Solana Api Hooks';
        break;
      default:
        throw new Error(`No Pattern for the ${this.module}`);
    }
    return this.operationFilesParser.parsedOperations.map((operation) => {
      const hookName = getHookName(operation.name, this.module);
      if (hookName === 'useEvmPairAddress') {
        console.warn('Please add Response for useEvmPairAddress in README manually');
        console.log(operation.response);
      }
      return {
        type: 'append',
        templateFile: path.join(paths.templates, 'hook_desc.hbs'),
        path: path.join(paths.packages, 'next/README.md'),
        pattern,
        data: {
          hookName,
          request: operation.request,
          response: operation.response,
          description: new Handlebars.SafeString(operation.description || 'Description will be added later 👀'),
        },
      };
    });
  }

  private get appendHookToTableOfContents() {
    let pattern: string;
    switch (this.module) {
      case 'evmApi':
        pattern = '- [Evm Api Hooks](#-evm-api-hooks)';
        break;
      case 'solApi':
        pattern = '- [Solana Api Hooks](#-solana-api-hooks)';
        break;
      default:
        throw new Error(`No Pattern for the ${this.module}`);
    }

    return this.operationFilesParser.parsedOperations.map((operation) => {
      return {
        type: 'append',
        template: '  - [{{ hookName }}](#️-{{ hookName }})',
        path: path.join(paths.packages, 'next/README.md'),
        pattern,
        data: {
          hookName: getHookName(operation.name, this.module),
        },
      };
    });
  }

  public get actions(): ActionConfig[] {
    return [...this.appendHookDescriptions, ...this.appendHookToTableOfContents];
  }
}
