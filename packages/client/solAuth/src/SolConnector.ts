import { Connection, Connector } from '@moralisweb3/client-auth-utils';
import { SolanaProvider } from './SolanaProvider';

export interface SolConnector extends Connector<SolanaProvider> {}

export interface SolConnection extends Connection<SolanaProvider> {}
