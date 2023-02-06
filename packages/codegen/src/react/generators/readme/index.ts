import { NodePlopAPI } from 'plop';
import { ReadmeGenerator } from './ReadmeGenerator';

export enum GeneratedModule {
  EVM_API = 'evmApi',
  SOL_API = 'solApi',
}

export default function ReactReadmeGenerator(plop: NodePlopAPI) {
  plop.setGenerator('react-readme', {
    description: 'readme for @moralisweb3/react',
    prompts: [
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select modules for readme generating',
        choices: Object.values(GeneratedModule),
      },
    ],
    actions: (answers) => {
      return new ReadmeGenerator(answers?.modules).actions;
    },
  });
}
