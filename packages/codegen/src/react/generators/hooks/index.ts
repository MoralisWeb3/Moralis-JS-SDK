import { NodePlopAPI } from 'plop';
import { Module } from '../../types';
// import { HooksGenerator } from './HooksGenerator';

export default function ReactHooksGenerator(plop: NodePlopAPI) {
  plop.setGenerator('react-hooks', {
    description: 'hooks for @moralisweb3/react',
    prompts: [
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select modules for hooks generating',
        choices: ['evmApi', 'solApi'] as Module[],
      },
    ],
    actions: (_answers) => {
      throw new Error('No auto hook generation implemented');
      // return [
      //   ...(answers?.modules.includes('evmApi') ? new HooksGenerator('evmApi').actions : []),
      //   ...(answers?.modules.includes('solApi') ? new HooksGenerator('solApi').actions : []),
      // ];
    },
  });
}
