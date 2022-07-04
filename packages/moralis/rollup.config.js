import packageJson from './package.json';
import { commonJs, esm, umd } from '../../rollup.config';

export default [commonJs(packageJson), esm(packageJson), umd('Moralis', packageJson, {})];
