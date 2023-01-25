import { NodePlopAPI } from 'plop';
import { ReadmeGenerator } from './ReadmeGenerator';
import path from 'node:path';
import { paths } from './utils/constants';

export default function ReactReadmeGenerator(plop: NodePlopAPI) {
  plop.setGenerator('next-readme', {
    description: 'readme for @moralisweb3/next',
    prompts: [],
    actions: () => {
      const addReadMe = {
        type: 'add',
        templateFile: path.join(paths.templates, 'README.md.hbs'),
        path: path.join(paths.packages, 'next/README.md'),
        force: true,
      };

      return [addReadMe, ...new ReadmeGenerator('evmApi').actions, ...new ReadmeGenerator('solApi').actions];
    },
  });
}
