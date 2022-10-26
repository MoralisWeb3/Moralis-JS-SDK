import { NodePlopAPI } from 'plop';
import EvmOperationsGenerator from './evmOperations';

export default function setGenerators(plop: NodePlopAPI) {
  EvmOperationsGenerator(plop);
}
