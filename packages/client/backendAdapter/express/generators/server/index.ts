import { NodePlopAPI } from 'plop';
import { ServerGenerator } from './ServerGenerator';

export default function ExpressServerGenerator(plop: NodePlopAPI) {
  plop.setGenerator('express-server', {
    description: '@moralisweb3/express',
    prompts: [],
    actions: () => {
      return [...new ServerGenerator('evmApi').actions, ...new ServerGenerator('solApi').actions];
    },
  });
}
