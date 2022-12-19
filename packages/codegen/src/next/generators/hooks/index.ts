import { NodePlopAPI } from 'plop';
import { GeneratedModule } from '../../utils/types';
import { HooksGenerator } from './HooksGenerator';

export default function NextHooksGenerator(plop: NodePlopAPI) {
  plop.setGenerator('next-hooks', {
    description: 'hooks for @moralisweb3/next',
    prompts: [
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select modules for hooks generating',
        choices: Object.values(GeneratedModule),
      },
    ],
    actions: (answers) => {
      const generateModules = answers?.modules
        .map((moduleName: GeneratedModule) => new HooksGenerator(moduleName).actions)
        .flat(1);
      return [...generateModules];
    },
  });
}
