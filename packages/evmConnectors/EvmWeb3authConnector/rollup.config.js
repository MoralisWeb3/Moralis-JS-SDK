import packageJson from './package.json';
import { commonJs, esm } from '../../../rollup.config';

export default [commonJs(packageJson), esm(packageJson, '@toruslabs/eccrypto')];

// import packageJson from './package.json';
// import { commonJs, esm, umd } from '../../../rollup.config';

// const umdExternalMap = {
//   '@moralisweb3/core': 'Moralis.CoreLib',
//   '@moralisweb3/evm-connector-utils': 'Moralis.EvmConnectorUtilsLib',
//   '@toruslabs/eccrypto': 'Eccrypto'
// };

// export default [commonJs(packageJson), esm(packageJson), umd('EvmWeb3authConnector', packageJson, umdExternalMap)];
