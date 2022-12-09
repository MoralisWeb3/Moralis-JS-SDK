import { NodePlopAPI } from 'plop';
import SdkReadmeGenerator from './readme';

export default function setNextGenerators(plop: NodePlopAPI) {
  SdkReadmeGenerator(plop);
}
