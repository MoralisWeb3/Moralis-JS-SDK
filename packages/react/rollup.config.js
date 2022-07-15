import packageJson from './package.json';
import { commonJs } from '../../rollup.config';

export default [commonJs(packageJson)];
