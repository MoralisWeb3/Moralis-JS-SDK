import { NodePlopAPI } from 'plop';
import { ReadmeGenerator } from './ReadmeGenerator';

export default function NextReadmeGenerator(plop: NodePlopAPI) {
  plop.setGenerator('sdk-readme', {
    description: 'readme the whole SDK',
    prompts: [],
    actions: () => new ReadmeGenerator().actions,
  });
}
