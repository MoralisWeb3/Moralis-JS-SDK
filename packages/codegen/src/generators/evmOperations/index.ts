import { NodePlopAPI } from 'plop';
import { EvmOperations } from './EvmOperations';

export default function EvmOperationsGenerator(plop: NodePlopAPI) {
  plop.setGenerator('express_generator', {
    description: '@moralisweb3/express package generator',
    prompts: [],
    actions: new EvmOperations().getGenerator(),
  });
}
