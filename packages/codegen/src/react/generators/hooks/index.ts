import { NodePlopAPI } from 'plop';
import { Module } from '../../types';
import { HooksGenerator } from './HooksGenerator';

export default function ReactHooksGenerator(plop: NodePlopAPI) {
  plop.setGenerator('next-hooks', {
    description: 'hooks for @moralisweb3/next',
    prompts: [
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select modules for hooks generating',
        choices: ['evmApi', 'solApi'] as Module[],
      },
    ],
    actions: (answers) => {
      return [
        ...(answers?.modules.includes('evmApi') ? new HooksGenerator('evmApi').actions : []),
        ...(answers?.modules.includes('solApi') ? new HooksGenerator('solApi').actions : []),
      ];
    },
  });
}
