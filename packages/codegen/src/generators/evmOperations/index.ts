import { NodePlopAPI } from 'plop';
import { EvmOperations } from './EvmOperations';

export default function EvmOperationsGenerator(plop: NodePlopAPI) {
  plop.setGenerator('express_generator', {
    description: '@moralisweb3/express package generator',
    prompts: [],
    actions: new EvmOperations().getGenerator(),
  });
  plop.setHelper('deserialize', (dataType, domain, core) => dataType.deSerialize(domain, core));
  plop.setHelper('serialize', (dataType, domain) => dataType.serialize(domain));
  plop.setHelper('getRequestUrlParams', (dataType) => dataType.getRequestUrlParams());
}
