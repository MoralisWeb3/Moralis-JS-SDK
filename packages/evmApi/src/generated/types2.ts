export interface GetBlockParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /** The block hash or block number */
    blockNumberOrHash: string;
}
export interface GetDateToBlockParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** web3 provider url to user when using local dev chain */
    providerUrl?: string;
    /** Unix date in miliseconds or a datestring (any format that is accepted by momentjs) */
    date: string;
}
export interface GetContractLogsParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /**
             * The block number
             * * Provide the param 'blockNumer' or ('fromBlock' and / or 'toBlock')
             * * If 'blockNumer' is provided in conbinaison with 'fromBlock' and / or 'toBlock', 'blockNumber' will will be used
             */
    blockNumber?: string;
    /**
             * The minimum block number from where to get the logs
             * * Provide the param 'blockNumer' or ('fromBlock' and / or 'toBlock')
             * * If 'blockNumer' is provided in conbinaison with 'fromBlock' and / or 'toBlock', 'blockNumber' will will be used
             */
    fromBlock?: string;
    /**
             * The maximum block number from where to get the logs
             * * Provide the param 'blockNumer' or ('fromBlock' and / or 'toBlock')
             * * If 'blockNumer' is provided in conbinaison with 'fromBlock' and / or 'toBlock', 'blockNumber' will will be used
             */
    toBlock?: string;
    /**
             * The date from where to get the logs (any format that is accepted by momentjs)
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             * * If 'fromDate' and the block params are provided, the block params will be used. Please refer to the blocks params sections (blockNumber,fromBlock and toBlock) on how to use them
             */
    fromDate?: string;
    /**
             * Get the logs to this date (any format that is accepted by momentjs)
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             * * If 'toDate' and the block params are provided, the block params will be used. Please refer to the blocks params sections (blockNumber,fromBlock and toBlock) on how to use them
             */
    toDate?: string;
    /** topic0 */
    topic0?: string;
    /** topic1 */
    topic1?: string;
    /** topic2 */
    topic2?: string;
    /** topic3 */
    topic3?: string;
    /** The desired page size of the result. */
    limit?: number;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** address */
    address: string;
}
export interface GetNFTTransfersByBlockParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /** The desired page size of the result. */
    limit?: number;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** The block hash or block number */
    blockNumberOrHash: string;
}
export interface GetTransactionParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /** The transaction hash */
    transactionHash: string;
}
export interface GetContractEventsParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /** web3 provider url to user when using local dev chain */
    providerUrl?: string;
    /**
             * The minimum block number from where to get the logs
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromBlock?: number;
    /**
             * The maximum block number from where to get the logs.
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toBlock?: number;
    /**
             * The date from where to get the logs (any format that is accepted by momentjs)
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromDate?: string;
    /**
             * Get the logs to this date (any format that is accepted by momentjs)
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toDate?: string;
    /** The topic of the event */
    topic: string;
    /** offset */
    offset?: number;
    /** The desired page size of the result. */
    limit?: number;
    /** address */
    address: string;
}
export interface RunContractFunctionParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /** web3 provider url to user when using local dev chain */
    providerUrl?: string;
    /** functionName */
    functionName: string;
    /** address */
    address: string;
}
export interface GetWalletTransactionsParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /**
             * The minimum block number from where to get the transactions
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromBlock?: number;
    /**
             * The maximum block number from where to get the transactions.
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toBlock?: number;
    /**
             * The date from where to get the transactions (any format that is accepted by momentjs)
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromDate?: string;
    /**
             * Get the transactions to this date (any format that is accepted by momentjs)
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toDate?: string;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** The desired page size of the result. */
    limit?: number;
    /** address */
    address: string;
}
export interface GetNativeBalanceParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** web3 provider url to user when using local dev chain */
    providerUrl?: string;
    /** The block number on which the balances should be checked */
    toBlock?: number;
    /** The address for which the native balance will be checked */
    address: string;
}
export interface GetWalletTokenBalancesParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /** The block number on which the balances should be checked */
    toBlock?: number;
    /** The addresses to get balances for (Optional) */
    tokenAddresses?: string[];
    /** The address for which token balances will be checked */
    address: string;
}
export interface GetWalletTokenTransfersParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /**
             * The minimum block number from where to get the transactions
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromBlock?: number;
    /**
             * The maximum block number from where to get the transactions.
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toBlock?: number;
    /**
             * The date from where to get the transactions (any format that is accepted by momentjs)
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromDate?: string;
    /**
             * Get the transactions to this date (any format that is accepted by momentjs)
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toDate?: string;
    /** The desired page size of the result. */
    limit?: number;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** address */
    address: string;
}
export interface GetWalletNFTsParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The format of the token id */
    format?: "decimal" | "hex";
    /** The desired page size of the result. */
    limit?: number;
    /** The addresses to get balances for (Optional) */
    tokenAddresses?: string[];
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** The owner of a given token */
    address: string;
}
export interface GetWalletNFTTransfersParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The format of the token id */
    format?: "decimal" | "hex";
    /** The transfer direction */
    direction?: "both" | "to" | "from";
    /**
             * The minimum block number from where to get the transfers
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromBlock?: number;
    /** To get the reserves at this block number */
    toBlock?: string;
    /** The desired page size of the result. */
    limit?: number;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** The sender or recepient of the transfer */
    address: string;
}
export interface GetWalletNFTCollectionsParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The desired page size of the result. */
    limit?: number;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** The owner wallet address of the NFT collections */
    address: string;
}
export interface GetTokenMetadataParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /** web3 provider url to user when using local dev chain */
    providerUrl?: string;
    /** The addresses to get metadata for */
    addresses: string[];
}
export interface GetNFTTradesParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /**
             * The minimum block number from where to get the transfers
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromBlock?: number;
    /** To get the reserves at this block number */
    toBlock?: string;
    /**
             * The date from where to get the transfers (any format that is accepted by momentjs)
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromDate?: string;
    /**
             * Get the reserves to this date (any format that is accepted by momentjs)
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toDate?: string;
    /** web3 provider url to user when using local dev chain */
    providerUrl?: string;
    /** marketplace from where to get the trades (only opensea is supported at the moment) */
    marketplace?: "opensea";
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** The desired page size of the result. */
    limit?: number;
    /** Address of the contract */
    address: string;
}
export interface GetNFTLowestPriceParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /**
             * The number of days to look back to find the lowest price
             * If not provided 7 days will be the default
             */
    days?: number;
    /** web3 provider url to user when using local dev chain */
    providerUrl?: string;
    /** marketplace from where to get the trades (only opensea is supported at the moment) */
    marketplace?: "opensea";
    /** Address of the contract */
    address: string;
}
export interface GetTokenMetadataBySymbolParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /** The symbols to get metadata for */
    symbols: string[];
}
export interface GetTokenPriceParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** web3 provider url to user when using local dev chain */
    providerUrl?: string;
    /** The factory name or address of the token exchange */
    exchange?: string;
    /** toBlock */
    toBlock?: number;
    /** The address of the token contract */
    address: string;
}
export interface GetTokenTransfersParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
    subdomain?: string;
    /**
             * The minimum block number from where to get the transfers
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromBlock?: number;
    /**
             * The maximum block number from where to get the transfers.
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toBlock?: number;
    /**
             * The date from where to get the transfers (any format that is accepted by momentjs)
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromDate?: string;
    /**
             * Get the transfers to this date (any format that is accepted by momentjs)
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toDate?: string;
    /** offset */
    offset?: number;
    /** The desired page size of the result. */
    limit?: number;
    /** The address of the token contract */
    address: string;
}
export interface GetTokenAllowanceParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** web3 provider url to user when using local dev chain */
    providerUrl?: string;
    /** The address of the token owner */
    ownerAddress: string;
    /** The address of the token spender */
    spenderAddress: string;
    /** The address of the token contract */
    address: string;
}
export interface SearchNFTsParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The format of the token id */
    format?: "decimal" | "hex";
    /** The search string */
    q: string;
    /** What fields the search should match on. To look into the entire metadata set the value to 'global'. To have a better response time you can look into a specific field like name */
    filter?:
    | "name"
    | "description"
    | "attributes"
    | "global"
    | "name,description"
    | "name,attributes"
    | "description,attributes"
    | "name,description,attributes";
    /**
             * The minimum block number from where to start the search
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromBlock?: number;
    /**
             * The maximum block number from where to end the search
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toBlock?: number;
    /**
             * The date from where to start the search (any format that is accepted by momentjs)
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromDate?: string;
    /**
             * Get search results up until this date (any format that is accepted by momentjs)
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toDate?: string;
    /** The addresses to get metadata for */
    addresses?: string[];
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** The desired page size of the result. */
    limit?: number;
}
export interface GetNFTTransfersFromToBlockParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /**
             * The minimum block number from where to get the transfers
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromBlock?: number;
    /**
             * The maximum block number from where to get the transfers.
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toBlock?: number;
    /**
             * The date from where to get the transfers (any format that is accepted by momentjs)
             * * Provide the param 'fromBlock' or 'fromDate'
             * * If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
             */
    fromDate?: string;
    /**
             * Get transfers up until this date (any format that is accepted by momentjs)
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toDate?: string;
    /** The format of the token id */
    format?: "decimal" | "hex";
    /** The desired page size of the result. */
    limit?: number;
    /** The cursor returned in the previous response (for getting the next page) */
    cursor?: string;
}
export interface GetContractNFTsParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The format of the token id */
    format?: "decimal" | "hex";
    /** The desired page size of the result. */
    limit?: number;
    /** The number of subranges to split the results into */
    totalRanges?: number;
    /** The desired subrange to query */
    range?: number;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** Address of the contract */
    address: string;
}
export interface GetNFTContractTransfersParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The format of the token id */
    format?: "decimal" | "hex";
    /** The desired page size of the result. */
    limit?: number;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** Address of the contract */
    address: string;
}
export interface GetNFTOwnersParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The format of the token id */
    format?: "decimal" | "hex";
    /** The desired page size of the result. */
    limit?: number;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** Address of the contract */
    address: string;
}
export interface GetNFTContractMetadataParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** Address of the contract */
    address: string;
}
export interface ReSyncMetadataParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The type of resync to operate */
    flag?: "uri" | "metadata";
    /** To define the behaviour of the endpoint */
    mode?: "async" | "sync";
    /** Address of the contract */
    address: string;
    /** The id of the token */
    tokenId: string;
}
export interface SyncNFTContractParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** Address of the contract */
    address: string;
}
export interface GetNFTMetadataParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The format of the token id */
    format?: "decimal" | "hex";
    /** Address of the contract */
    address: string;
    /** The id of the token */
    tokenId: string;
}
export interface GetNFTTokenIdOwnersParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The format of the token id */
    format?: "decimal" | "hex";
    /** The desired page size of the result. */
    limit?: number;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** Address of the contract */
    address: string;
    /** The id of the token */
    tokenId: string;
}
export interface GetNFTTransfersParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** The format of the token id */
    format?: "decimal" | "hex";
    /** The desired page size of the result. */
    limit?: number;
    /** The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: "blockNumber", "blockNumber.ASC", "blockNumber.DESC", Example 2: "blockNumber and contractType", "blockNumber.ASC,contractType.DESC" */
    order?: string;
    /** The cursor returned in the previous response (used to getting the next page). */
    cursor?: string;
    /** Address of the contract */
    address: string;
    /** The id of the token */
    tokenId: string;
}
export interface ResolveDomainParams {
    /** The currency to query */
    currency?: "eth" | "0x1";
    /** Domain to be resolved */
    domain: string;
}
export interface ResolveAddressParams {
    /** The address to be resolved */
    address: string;
}
export interface GetPairReservesParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** To get the reserves at this block number */
    toBlock?: string;
    /**
             * Get the reserves to this date (any format that is accepted by momentjs)
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toDate?: string;
    /** web3 provider url to user when using local dev chain */
    providerUrl?: string;
    /** Liquidity pair address */
    pairAddress: string;
}
export interface GetPairAddressParams {
    /** The chain to query */
    chain?: components["schemas"]["chainList"];
    /** To get the reserves at this block number */
    toBlock?: string;
    /**
             * Get the reserves to this date (any format that is accepted by momentjs)
             * * Provide the param 'toBlock' or 'toDate'
             * * If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
             */
    toDate?: string;
    /** The factory name or address of the token exchange */
    exchange:
    | "uniswapv2"
    | "uniswapv3"
    | "sushiswapv2"
    | "pancakeswapv2"
    | "pancakeswapv1"
    | "quickswap";
    /** Token0 address */
    token0Address: string;
    /** Token1 address */
    token1Address: string;
}
