import { NodePlopAPI } from 'plop';
import ExpressServerGenerator from './server';

export default function setExpressGenerators(plop: NodePlopAPI) {
  ExpressServerGenerator(plop);
}
