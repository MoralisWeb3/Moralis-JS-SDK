import { EvmWalletConnectConnector } from './EvmWalletConnectConnector';

const create = EvmWalletConnectConnector.create;
export { create }; // For UMD builds.

export * from './EvmWalletConnectConnector';
export default EvmWalletConnectConnector;
