import ExpressGenerator from './express';
import { NodePlopAPI } from 'plop';

export default function setGenerators(plop: NodePlopAPI) {
  ExpressGenerator(plop);
}
