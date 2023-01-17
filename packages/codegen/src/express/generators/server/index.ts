import { NodePlopAPI } from 'plop';
import { GeneratedModule, GeneratedModule } from '../../utils/types';
import { ServerGenerator } from './ServerGenerator';

export default function ExpressServerGenerator(plop: NodePlopAPI) {
  plop.setGenerator('express-server', {
    description: 'Backend generator for @moralisweb3/express',
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
        .map((moduleName: GeneratedModule) => new ServerGenerator(moduleName).actions)
        .flat(1);
      return [...generateModules];
    },
  });
}
