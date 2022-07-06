// import packageJson from './package.json';
// import { commonJs, esm } from '../../../rollup.config';

// export default [commonJs(packageJson), esm(packageJson, '@toruslabs/eccrypto')];

import packageJson from './package.json';
import { commonJs, esm, umd } from '../../../rollup.config';

const umdExternalMap = {
  '@moralisweb3/core': 'Moralis.CoreLib',
  '@moralisweb3/evm-connector-utils': 'Moralis.EvmConnectorUtilsLib',
  '@toruslabs/eccrypto': 'eccrypto',
};

export default [
  commonJs(packageJson),
  esm(packageJson, null, ['@toruslabs/eccrypto']),
  umd('Web3AuthConnector', packageJson, umdExternalMap),
];
