export const WalletConnectEvent: Readonly<{
    ACCOUNTS_CHANGED: string;
    CHAIN_CHANGED: string;
    DISCONNECT: string;
}>;
export default WalletConnectWeb3Connector;
/**
 * Connector to connect an WalletConenct provider to Moralis
 * Note: this assumes using WalletConnect v1
 * // TODO: support WalletConnect v2
 */
declare class WalletConnectWeb3Connector extends AbstractWeb3Connector {
    provider: any;
}
import AbstractWeb3Connector from "./AbstractWeb3Connector";
