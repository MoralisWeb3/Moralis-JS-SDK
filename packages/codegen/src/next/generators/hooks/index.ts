import { NodePlopAPI } from 'plop';
import { Module } from '../../types';
import { HooksGenerator } from './HooksGenerator';

export default function NextHooksGenerator(plop: NodePlopAPI) {
  plop.setGenerator('next-hooks', {
    description: 'hooks for @moralisweb3/next',
    prompts: [
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select modules for hooks generating',
        choices: ['evmApi', 'solApi', 'aptos'] as Module[],
      },
    ],
    actions: (answers) => {
      return answers?.modules.map((module: Module) => new HooksGenerator(module).actions);
    },
  });
}
