import packageJson from './package.json';
import { commonJs, esm } from '../../../rollup.config';

export default [commonJs(packageJson), esm(packageJson)];
