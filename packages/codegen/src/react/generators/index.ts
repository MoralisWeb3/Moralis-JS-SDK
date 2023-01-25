import { NodePlopAPI } from 'plop';
import ReactHooksGenerator from './hooks';
import ReactReadmeGenerator from './readme';

export default function setReactGenerators(plop: NodePlopAPI) {
  ReactHooksGenerator(plop);
  // ReactReadmeGenerator(plop);
}
