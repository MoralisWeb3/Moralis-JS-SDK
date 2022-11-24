export interface RequestMessage {
    address: string;
    chain: string;
    networkType: string;
}
export declare function requestMessage({ address, chain, networkType, }: {
    address: string;
    chain: string;
    networkType: 'evm';
}): Promise<string>;
