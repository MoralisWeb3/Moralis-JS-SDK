import { NodePlopAPI } from 'plop';
import { ExpressGeneratorCl } from './ExpressGenerator';

export default function ExpressGenerator(plop: NodePlopAPI) {
  plop.setGenerator('express_generator', {
    description: '@moralisweb3/express package generator',
    prompts: [],
    actions: new ExpressGeneratorCl().getGenerator(),
  });
}
