import NextGenerator from './next';
import { NodePlopAPI } from 'plop';

export default function setGenerators(plop: NodePlopAPI) {
  NextGenerator(plop);
}
