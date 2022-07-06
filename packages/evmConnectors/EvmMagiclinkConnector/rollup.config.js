import packageJson from './package.json';
import { commonJs, esm, umd } from '../../../rollup.config';

const umdExternalMap = {
  '@moralisweb3/core': 'Moralis.CoreLib',
  '@moralisweb3/evm-connector-utils': 'Moralis.EvmConnectorUtilsLib',
};

export default [commonJs(packageJson), esm(packageJson), umd('EvmMagiclinkConnector', packageJson, umdExternalMap)];
