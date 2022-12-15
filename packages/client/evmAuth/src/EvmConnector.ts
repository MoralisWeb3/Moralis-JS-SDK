import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { Connection, Connector } from '@moralisweb3/client-auth-utils';

export interface EvmConnector extends Connector<JsonRpcProvider | Web3Provider> {}

export interface EvmConnection extends Connection<Web3Provider> {}
