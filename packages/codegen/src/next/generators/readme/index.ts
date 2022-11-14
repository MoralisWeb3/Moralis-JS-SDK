import { NodePlopAPI } from 'plop';
import { ReadmeGenerator } from './ReadmeGenerator';

export default function NextReadmeGenerator(plop: NodePlopAPI) {
  plop.setGenerator('next-readme', {
    description: 'readme for @moralisweb3/next',
    prompts: [],
    actions: () => {
      return [...new ReadmeGenerator('evmApi').actions];
    },
  });
}
