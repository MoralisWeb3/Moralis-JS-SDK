import { NodePlopAPI } from 'plop';
import NextHooksGenerator from './hooks';
import NextReadmeGenerator from './readme';

export default function setNextGenerators(plop: NodePlopAPI) {
  NextHooksGenerator(plop);
  NextReadmeGenerator(plop);
}
