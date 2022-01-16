/// <reference types="node" />
export default AbstractWeb3Connector;
/**
 * Abstract connector to connect EIP-1193 providers to Moralis
 *
 * It should implement at least:
 * - activate()
 * - Emit ConnectorEvent.CHAIN_CHANGED when the chain has changed (if possible)
 * - Emit ConnectorEvent.ACCOUNT_CHANGED when the account has changed (if possible)
 * - type: a name to identify
 * - network: the network type that is used (eg. 'evm')
 */
declare class AbstractWeb3Connector extends EventEmitter {
    constructor(options: any);
    type: string;
    network: string;
    account: any;
    chainId: any;
    /**
     * Updates account and emit event, on EIP-1193 accountsChanged events
     */
    handleAccountsChanged(accounts: any): void;
    /**
     * Updates chainId and emit event, on EIP-1193 accountsChanged events
     */
    handleChainChanged(chainId: any): void;
    handleConnect(connectInfo: any): void;
    handleDisconnect(error: any): void;
    subscribeToEvents(provider: any): void;
    unsubscribeToEvents(provider: any): void;
    /**
     * Activates the provider.
     * Should returns an object with:
     * - provider: A valid EIP-1193 provider
     * - chainId(optional): the chainId that has been connected to (in hex format)
     * - account(optional): the address that is connected to the provider
     */
    activate(): Promise<void>;
    /**
     * Cleans all active listners, connections and stale references
     */
    deactivate(): Promise<void>;
}
import EventEmitter from "events";
