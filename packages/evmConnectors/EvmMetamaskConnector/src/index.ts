import { EvmMetamaskConnector } from './EvmMetamaskConnector';

const create = EvmMetamaskConnector.create;
export { create }; // For UMD builds.

export * from './EvmMetamaskConnector';
export default EvmMetamaskConnector;
