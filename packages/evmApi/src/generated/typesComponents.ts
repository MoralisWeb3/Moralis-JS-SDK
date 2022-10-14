export interface LogCollectionParams {
    /**
     * @description The total number of matches for this query
     * @example 100
     */
    total?: number;
    /**
     * @description The page of the current result
     * @example 1
     */
    page?: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    pageSize?: number;
    /** @description The cursor to get to the next page */
    cursor?: string;
    result?: components["schemas"]["logEventByAddress"][];
}
export interface LogEventByAddressParams {
    /**
     * @description The transaction hash
     * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
     */
    transactionHash: string;
    /**
     * @description The address of the contract
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    address: string;
    /**
     * @description The block timestamp
     * @example 2021-04-02T10:07:54.000Z
     */
    blockTimestamp: string;
    /**
     * @description The block number
     * @example 12526958
     */
    blockNumber: string;
    /**
     * @description The block hash
     * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
     */
    blockHash: string;
    /**
     * @description The data of the log
     * @example 0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443
     */
    data: string;
    /** @example 0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a */
    topic0: string;
    /** @example 0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391 */
    topic1: string;
    /** @example 0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9 */
    topic2: string;
    /** @example null */
    topic3: string;
}
export interface LogEventParams {
    /**
     * @description The transaction hash
     * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
     */
    transactionHash: string;
    /**
     * @description The address of the contract
     * @example 0x18F97EF6B2cbac5CA85b375b7093C4A207340d06
     */
    address: string;
    /**
     * @description The block timestamp
     * @example 2021-04-02T10:07:54.000Z
     */
    blockTimestamp: string;
    /**
     * @description The block number
     * @example 12526958
     */
    blockNumber: string;
    /**
     * @description The block hash
     * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
     */
    blockHash: string;
    /** @description The content of the event */
    data: {
        /** @example 0x54ff6974c715956a5049a123408bff91fbe29f01 */
        from?: string;
        /** @example 0x74de5d4fcbf63e00296fd95d33236b9794016631 */
        to?: string;
        /** @example 260103496340000000000 */
        value?: string;
    };
}
export interface LogParams {
    /** @example 273 */
    logIndex: string;
    /**
     * @description The hash of the transaction
     * @example 0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5
     */
    transactionHash: string;
    /** @example 204 */
    transactionIndex: string;
    /**
     * @description The address of the contract
     * @example 0x3105d328c66d8d55092358cf595d54608178e9b5
     */
    address: string;
    /**
     * @description The data of the log
     * @example 0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443
     */
    data: string;
    /** @example 0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a */
    topic0: string;
    /** @example 0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391 */
    topic1?: string;
    /** @example 0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9 */
    topic2?: string;
    /** @example null */
    topic3?: string;
    /**
     * @description The timestamp of the block
     * @example 2021-05-07T11:08:35.000Z
     */
    blockTimestamp: string;
    /**
     * @description The block number
     * @example 12386788
     */
    blockNumber: string;
    /**
     * @description The hash of the block
     * @example 0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171
     */
    blockHash: string;
}
export interface BlockTransactionParams {
    /**
     * @description The hash of the transaction
     * @example 0x1ed85b3757a6d31d01a4d6677fc52fd3911d649a0af21fe5ca3f886b153773ed
     */
    hash: string;
    /**
     * @description The nonce
     * @example 1848059
     */
    nonce: string;
    /** @example 108 */
    transactionIndex: string;
    /**
     * @description The from address
     * @example 0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0
     */
    fromAddress: string;
    /**
     * @description The to address
     * @example 0x003dde3494f30d861d063232c6a8c04394b686ff
     */
    toAddress: string;
    /**
     * @description The value sent
     * @example 115580000000000000
     */
    value: string;
    /** @example 30000 */
    gas?: string;
    /**
     * @description The gas price
     * @example 52500000000
     */
    gasPrice: string;
    /** @example 0x */
    input: string;
    /** @example 4923073 */
    receiptCumulativeGasUsed: string;
    /** @example 21000 */
    receiptGasUsed: string;
    /** @example null */
    receiptContractAddress?: string;
    /** @example null */
    receiptRoot?: string;
    /** @example 1 */
    receiptStatus: string;
    /**
     * @description The block timestamp
     * @example 2021-05-07T11:08:35.000Z
     */
    blockTimestamp: string;
    /**
     * @description The block number
     * @example 12386788
     */
    blockNumber: string;
    /**
     * @description The hash of the block
     * @example 0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171
     */
    blockHash: string;
    /** @description The logs of the transaction */
    logs: components["schemas"]["log"][];
}
export interface BlockParams {
    /**
     * @description The block timestamp
     * @example 2021-05-07T11:08:35.000Z
     */
    timestamp: string;
    /**
     * @description The block number
     * @example 12386788
     */
    number: string;
    /**
     * @description The block hash
     * @example 0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171
     */
    hash: string;
    /**
     * @description The block hash of the parent block
     * @example 0x011d1fc45839de975cc55d758943f9f1d204f80a90eb631f3bf064b80d53e045
     */
    parentHash: string;
    /**
     * @description The nonce
     * @example 0xedeb2d8fd2b2bdec
     */
    nonce: string;
    /** @example 0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347 */
    sha3Uncles: string;
    /** @example 0xdde5fc46c5d8bcbd58207bc9f267bf43298e23791a326ff02661e99790da9996b3e0dd912c0b8202d389d282c56e4d11eb2dec4898a32b6b165f1f4cae6aa0079498eab50293f3b8defbf6af11bb75f0408a563ddfc26a3323d1ff5f9849e95d5f034d88a757ddea032c75c00708c9ff34d2207f997cc7d93fd1fa160a6bfaf62a54e31f9fe67ab95752106ba9d185bfdc9b6dc3e17427f844ee74e5c09b17b83ad6e8fc7360f5c7c3e4e1939e77a6374bee57d1fa6b2322b11ad56ad0398302de9b26d6fbfe414aa416bff141fad9d4af6aea19322e47595e342cd377403f417dfd396ab5f151095a5535f51cbc34a40ce9648927b7d1d72ab9daf253e31daf */
    logsBloom: string;
    /** @example 0xe4c7bf3aff7ad07f9e80d57f7189f0252592fee6321c2a9bd9b09b6ce0690d27 */
    transactionsRoot: string;
    /** @example 0x49e3bfe7b618e27fde8fa08884803a8458b502c6534af69873a3cc926a7c724b */
    stateRoot: string;
    /** @example 0x7cf43d7e837284f036cf92c56973f5e27bdd253ca46168fa195a6b07fa719f23 */
    receiptsRoot: string;
    /**
     * @description The address of the miner
     * @example 0xea674fdde714fd979de3edf0f56aa9716b898ec8
     */
    miner: string;
    /**
     * @description The difficulty of the block
     * @example 7253857437305950
     */
    difficulty: string;
    /**
     * @description The total difficulty
     * @example 24325637817906576196890
     */
    totalDifficulty: string;
    /**
     * @description The block size
     * @example 61271
     */
    size: string;
    /** @example 0x65746865726d696e652d6575726f70652d7765737433 */
    extraData: string;
    /**
     * @description The gas limit
     * @example 14977947
     */
    gasLimit: string;
    /**
     * @description The gas used
     * @example 14964688
     */
    gasUsed: string;
    /**
     * @description The number of transactions in the block
     * @example 252
     */
    transactionCount: string;
    /** @description The transactions in the block */
    transactions: components["schemas"]["blockTransaction"][];
}
export interface BlockDateParams {
    /**
     * @description The date of the block
     * @example 2020-01-01T00:00:00+00:00
     */
    date: string;
    /**
     * @description The blocknumber
     * @example 9193266
     */
    block: number;
    /**
     * @description The timestamp of the block
     * @example 1577836811
     */
    timestamp: number;
}
export interface RunContractDtoParams {
    /**
     * @description The contract abi
     * @example []
     */
    abi: { [key: string]: unknown };
    /**
     * @description The params for the given function
     * @example {}
     */
    params?: { [key: string]: unknown };
}
export interface TransactionCollectionParams {
    /**
     * @description The total number of matches for this query
     * @example 2000
     */
    total?: number;
    /**
     * @description The page of the current result
     * @example 2
     */
    page?: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    pageSize?: number;
    result?: components["schemas"]["transaction"][];
}
export interface TransactionParams {
    /**
     * @description The hash of the transaction
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    hash: string;
    /**
     * @description The nonce of the transaction
     * @example 326595425
     */
    nonce: string;
    /**
     * @description The transaction index
     * @example 25
     */
    transactionIndex: string;
    /**
     * @description The sender
     * @example 0xd4a3BebD824189481FC45363602b83C9c7e9cbDf
     */
    fromAddress: string;
    /**
     * @description The recipient
     * @example 0xa71db868318f0a0bae9411347cd4a6fa23d8d4ef
     */
    toAddress: string;
    /**
     * @description The value that was transfered (in wei)
     * @example 650000000000000000
     */
    value: string;
    /**
     * @description The gas of the transaction
     * @example 6721975
     */
    gas: string;
    /**
     * @description The gas price
     * @example 20000000000
     */
    gasPrice: string;
    /** @description The input */
    input: string;
    /**
     * @description The receipt cumulative gas used
     * @example 1340925
     */
    receiptCumulativeGasUsed: string;
    /**
     * @description The receipt gas used
     * @example 1340925
     */
    receiptGasUsed: string;
    /**
     * @description The receipt contract address
     * @example 0x1d6a4cf64b52f6c73f201839aded7379ce58059c
     */
    receiptContractAddress: string;
    /** @description The receipt root */
    receiptRoot: string;
    /**
     * @description The receipt status
     * @example 1
     */
    receiptStatus: string;
    /**
     * @description The block timestamp
     * @example 2021-04-02T10:07:54.000Z
     */
    blockTimestamp: string;
    /**
     * @description The block number
     * @example 12526958
     */
    blockNumber: string;
    /**
     * @description The block hash
     * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
     */
    blockHash: string;
}
export interface Erc20AllowanceParams {
    /** @description The allowance */
    allowance: string;
}
export interface Erc20TokenBalanceParams {
    /**
     * @description The address of the token contract
     * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
     */
    tokenAddress: string;
    /**
     * @description The name of the token Contract
     * @example Kylin Network
     */
    name: string;
    /**
     * @description The symbol of the NFT contract
     * @example KYL
     */
    symbol: string;
    /**
     * @description The logo of the token
     * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png
     */
    logo?: string;
    /**
     * @description The thumbnail of the logo
     * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99cThumb.png
     */
    thumbnail?: string;
    /**
     * @description The number of decimals on of the token
     * @example 18
     */
    decimals: number;
    /**
     * @description Timestamp of when the contract was last synced with the node
     * @example 123456789
     */
    balance: string;
}
export interface NativeBalanceParams {
    /**
     * @description The balance
     * @example 1234567890
     */
    balance: string;
}
export interface TradeParams {
    /**
     * @description The transaction hash
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    transactionHash: string;
    /** @description The transaction index */
    transactionIndex: string;
    /**
     * @description The token id(s) traded
     * @example [
     *   "15",
     *   "54"
     * ]
     */
    tokenIds: unknown[];
    /**
     * @description The address that sold the NFT
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    sellerAddress: string;
    /**
     * @description The address that bought the NFT
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    buyerAddress: string;
    /**
     * @description The address of the contract that traded the NFT
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    marketplaceAddress: string;
    /**
     * @description The value that was sent in the transaction (ETH/BNB/etc..)
     * @example 1000000000000000
     */
    price: string;
    /**
     * @description The block timestamp
     * @example 2021-06-04T16:00:15
     */
    blockTimestamp: string;
    /**
     * @description The blocknumber of the transaction
     * @example 13680123
     */
    blockNumber: string;
    /**
     * @description The block hash
     * @example 0x4a7c916ca4a970358b9df90051008f729685ff05e9724a9dddba32630c37cb96
     */
    blockHash: string;
} & {
    tokenAddress: unknown;
}
export interface TradeCollectionParams {
    /**
     * @description The total number of matches for this query
     * @example 2000
     */
    total?: number;
    /**
     * @description The page of the current result
     * @example 2
     */
    page?: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    pageSize?: number;
    result?: components["schemas"]["trade"][];
}
export interface ChainListParams 
 | "eth"
    | "0x1"
    | "ropsten"
    | "0x3"
    | "rinkeby"
    | "0x4"
    | "goerli"
    | "0x5"
    | "kovan"
    | "0x2a"
    | "sepolia"
    | "0xaa36a7"
    | "polygon"
    | "0x89"
    | "mumbai"
    | "0x13881"
    | "bsc"
    | "0x38"
    | "bsc testnet"
    | "0x61"
    | "avalanche"
    | "0xa86a"
    | "avalanche testnet"
    | "0xa869"
    | "fantom"
    | "0xfa"
    | "cronos"
    | "0x19"
    | "cronos testnet"
    | "0x152"
export interface NftParams {
    /**
     * @description The address of the contract of the NFT
     * @example 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB
     */
    tokenAddress: string;
    /**
     * @description The token id of the NFT
     * @example 15
     */
    tokenId: string;
    /**
     * @description The owner wallet address of the NFT
     * @example 0x9c83ff0f1c8924da96cb2fcb7e093f78eb2e316b
     */
    ownerOf?: string;
    /**
     * @description The token hash
     * @example 502cee781b0fb40ea02508b21d319ced
     */
    tokenHash?: string;
    /**
     * @description The block number when the amount or owner changed
     * @example 88256
     */
    blockNumber?: string;
    /**
     * @description The block number when the NFT was minted
     * @example 88256
     */
    blockNumberMinted?: string;
    /**
     * @description The type of NFT contract standard
     * @example ERC721
     */
    contractType: string;
    /** @description The uri to the metadata of the token */
    tokenUri?: string;
    /** @description The metadata of the token */
    metadata?: string;
    /** @description When the tokenUri was last updated */
    lastTokenUriSync?: string;
    /** @description When the metadata was last updated */
    lastMetadataSync?: string;
    /**
     * @description The number of this item the user owns (used by ERC1155)
     * @example 1
     */
    amount?: string;
    /**
     * @description The name of the Token contract
     * @example CryptoKitties
     */
    name: string;
    /**
     * @description The symbol of the NFT contract
     * @example RARI
     */
    symbol: string;
}
export interface NftMetadataParams {
    /**
     * @description The token id of the NFT
     * @example 889
     */
    tokenId: string;
    /**
     * @description The address of the contract of the NFT
     * @example 0x8ce66ff0865570d1ff0bb0098fa41b4dc61e02e6
     */
    tokenAddress: string;
    /**
     * @description The uri to the metadata of the token
     * @example https://ipfs.moralis.io:2053/ipfs/QmZZbo8u8zEWg7wtmZhJS2W718WL6FA95T4XdgmCcLp1SJ/889.json
     */
    tokenUri: string;
    /**
     * @description The metadata of the token
     * @example {"name":"Bape #889","description":"The #1 metavestor clan (NFT/DAO) by a team with multi billion dollar company experience.","image":"https://bapesclan.mypinata.cloud/ipfs/QmTSUD5JA6qHaC5t25mcXySfz19AV9u4Mb6Na7ntQ6tEwf/889.jpg","attributes":[{"traitType":"Background","value":"Black"},{"traitType":"Body","value":"Man"},{"traitType":"Dress","value":"Suit Tie Blue"},{"traitType":"Face","value":"Pipe"},{"traitType":"Eye","value":"Eye"}]}
     */
    metadata: string;
    /** @example 1 */
    isValid: number;
    /** @example 2 */
    syncing: number;
    /** @example 0 */
    frozen: number;
    /** @example 0 */
    resyncing: number;
    /**
     * @description The type of NFT contract standard
     * @example ERC721
     */
    contractType: string;
    /** @example fffa3102469ce77f569893d16d5884f9 */
    tokenHash: string;
    /** @example fd995c8aF8b2-40cbA407F43e552638b4 */
    batchId: string;
    /** @example Bape #889 */
    metadataName: string;
    /** @example The #1 metavestor clan (NFT/DAO) by a team with multi billion dollar company experience. */
    metadataDescription: string;
    /** @example [{"traitType":"Background","value":"Black"},{"traitType":"Body","value":"Man"},{"traitType":"Dress","value":"Suit Tie Blue"},{"traitType":"Face","value":"Pipe"},{"traitType":"Eye","value":"Eye"}] */
    metadataAttributes: string;
    /** @example 14265936 */
    blockNumberMinted: string;
    /** @example null */
    openseaLookup?: { [key: string]: unknown };
    /** @example 0xdcf086e3f7954b38180daae1405569da86588bfe */
    minterAddress: string;
    /** @example 0x2c8d7ec7a8439b0f67b50e93be63242de52e9b5cdfc7dc0aee80c6a2f104c41a */
    transactionMinted: string;
    /** @example null */
    frozenLogIndex?: { [key: string]: unknown };
    /** @example null */
    imported?: { [key: string]: unknown };
    /**
     * @description When the tokenUri was last updated
     * @example 2021-02-24T00:47:26.647Z
     */
    lastTokenUriSync: string;
    /**
     * @description When the metadata was last updated
     * @example 2021-02-24T00:47:26.647Z
     */
    lastMetadataSync: string;
    /**
     * Format: dateTime
     * @example 2022-02-24T00:47:26.647Z
     */
    createdAt: string;
    /**
     * Format: dateTime
     * @example 2022-04-09T23:56:44.807Z
     */
    updatedAt: string;
}
export interface NftWalletCollectionsParams {
    /**
     * @description The syncing status of the address [SYNCING/SYNCED]
     * @example SYNCING
     */
    status?: string;
    /**
     * @description The total number of matches for this query
     * @example 2000
     */
    total?: number;
    /**
     * @description The page of the current result
     * @example 2
     */
    page?: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    pageSize?: number;
    /** @description The cursor to get to the next page */
    cursor?: string;
    result?: components["schemas"]["nftCollections"][];
}
export interface NftCollectionParams {
    /**
     * @description The total number of matches for this query
     * @example 2000
     */
    total?: number;
    /**
     * @description The page of the current result
     * @example 2
     */
    page?: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    pageSize?: number;
    /** @description The cursor to get to the next page */
    cursor?: string;
    result?: components["schemas"]["nft"][];
}
export interface NftMetadataCollectionParams {
    /**
     * @description The total number of matches for this query
     * @example 2000
     */
    total?: number;
    /**
     * @description The page of the current result
     * @example 2
     */
    page?: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    pageSize?: number;
    result?: components["schemas"]["nftMetadata"][];
}
export interface NftCollectionsParams {
    /**
     * @description The address of the contract of the NFT
     * @example 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB
     */
    tokenAddress: string;
    /**
     * @description The type of NFT contract standard
     * @example ERC721
     */
    contractType: string;
    /**
     * @description The name of the Token contract
     * @example CryptoKitties
     */
    name: string;
    /**
     * @description The symbol of the NFT contract
     * @example RARI
     */
    symbol: string;
}
export interface NftOwnerParams {
    /**
     * @description The address of the contract of the NFT
     * @example 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB
     */
    tokenAddress: string;
    /**
     * @description The token id of the NFT
     * @example 15
     */
    tokenId: string;
    /**
     * @description The type of NFT contract standard
     * @example ERC721
     */
    contractType: string;
    /**
     * @description The address of the owner of the NFT
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    ownerOf: string;
    /**
     * @description The blocknumber when the amount or owner changed
     * @example 88256
     */
    blockNumber: string;
    /**
     * @description The blocknumber when the NFT was minted
     * @example 88256
     */
    blockNumberMinted: string;
    /** @description The uri to the metadata of the token */
    tokenUri?: string;
    /** @description The metadata of the token */
    metadata?: string;
    /**
     * @description The number of this item the user owns (used by ERC1155)
     * @example 1
     */
    amount?: string;
    /**
     * @description The name of the Token contract
     * @example CryptoKitties
     */
    name: string;
    /**
     * @description The symbol of the NFT contract
     * @example RARI
     */
    symbol: string;
    /**
     * @description The token hash
     * @example 502cee781b0fb40ea02508b21d319ced
     */
    tokenHash: string;
    /**
     * @description When the tokenUri was last updated
     * @example 2021-02-24T00:47:26.647Z
     */
    lastTokenUriSync: string;
    /**
     * @description When the metadata was last updated
     * @example 2021-02-24T00:47:26.647Z
     */
    lastMetadataSync: string;
}
export interface NftOwnerCollectionParams {
    /**
     * @description The syncing status of the address [SYNCING/SYNCED]
     * @example SYNCING
     */
    status?: string;
    /**
     * @description The total number of matches for this query
     * @example 2000
     */
    total?: number;
    /**
     * @description The page of the current result
     * @example 2
     */
    page?: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    pageSize?: number;
    /** @description The cursor to get to the next page */
    cursor?: string;
    result?: components["schemas"]["nftOwner"][];
}
export interface NftTransferParams {
    /**
     * @description The address of the contract of the NFT
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    tokenAddress: string;
    /**
     * @description The token id of the NFT
     * @example 15
     */
    tokenId: string;
    /**
     * @description The address that sent the NFT
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    fromAddress?: string;
    /**
     * @description The address that recieved the NFT
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    toAddress: string;
    /**
     * @description The value that was sent in the transaction (ETH/BNB/etc..)
     * @example 1000000000000000
     */
    value?: string;
    /**
     * @description The number of tokens transferred
     * @example 1
     */
    amount?: string;
    /**
     * @description The type of NFT contract standard
     * @example ERC721
     */
    contractType: string;
    /**
     * @description The blocknumber of the transaction
     * @example 88256
     */
    blockNumber: string;
    /**
     * @description The block timestamp
     * @example 2021-06-04T16:00:15
     */
    blockTimestamp: string;
    /** @description The block hash of the transaction */
    blockHash: string;
    /**
     * @description The transaction hash
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    transactionHash: string;
    /** @description The transaction type */
    transactionType?: string;
    /** @description The transaction index */
    transactionIndex?: number;
    /** @description The log index */
    logIndex: number;
    /**
     * @description The operator present only for ERC1155 Transfers
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    operator?: string;
}
export interface NftTransferCollectionParams {
    /**
     * @description The total number of matches for this query
     * @example 2000
     */
    total: number;
    /**
     * @description The page of the current result
     * @example 2
     */
    page: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    pageSize: number;
    /** @description The cursor to get to the next page */
    cursor: string;
    result: components["schemas"]["nftTransfer"][];
    /**
     * @description Indicator if the block exists
     * @example true
     */
    blockExists?: boolean;
    /**
     * @description Indicator if the block is fully indexed
     * @example true
     */
    indexComplete?: boolean;
}
export interface NftContractMetadataParams {
    /**
     * @description The address of the token contract
     * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
     */
    tokenAddress: string;
    /**
     * @description The name of the token Contract
     * @example KryptoKitties
     */
    name: string;
    /** @description Timestamp of when the contract was last synced with the node */
    syncedAt?: string;
    /**
     * @description The symbol of the NFT contract
     * @example RARI
     */
    symbol: string;
    /**
     * @description The type of NFT contract
     * @example ERC721
     */
    contractType: string;
}
export interface NftContractMetadataCollectionParams {
    /**
     * @description The total number of matches for this query
     * @example 2000
     */
    total: number;
    /**
     * @description The page of the current result
     * @example 2
     */
    page: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    pageSize: number;
    result: components["schemas"]["nftContractMetadata"][];
}
export interface Erc20TransactionParams {
    /**
     * @description The transaction hash
     * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
     */
    transactionHash: string;
    /**
     * @description The address of the token
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    address: string;
    /**
     * @description The block timestamp
     * @example 2021-04-02T10:07:54.000Z
     */
    blockTimestamp: string;
    /**
     * @description The block number
     * @example 12526958
     */
    blockNumber: string;
    /**
     * @description The block hash
     * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
     */
    blockHash: string;
    /**
     * @description The recipient
     * @example 0x62AED87d21Ad0F3cdE4D147Fdcc9245401Af0044
     */
    toAddress: string;
    /**
     * @description The sender
     * @example 0xd4a3BebD824189481FC45363602b83C9c7e9cbDf
     */
    fromAddress: string;
    /**
     * @description The value that was transfered (in wei)
     * @example 650000000000000000
     */
    value: string;
}
export interface HistoricalNftTransferParams {
    /**
     * @description The transaction hash
     * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
     */
    transactionHash: string;
    /**
     * @description The address of the token
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    address: string;
    /**
     * @description The block timestamp
     * @example 2021-04-02T10:07:54.000Z
     */
    blockTimestamp: string;
    /**
     * @description The block number
     * @example 12526958
     */
    blockNumber: string;
    /**
     * @description The block hash
     * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
     */
    blockHash: string;
    /**
     * @description The recipient
     * @example 0x62AED87d21Ad0F3cdE4D147Fdcc9245401Af0044
     */
    toAddress: string;
    /**
     * @description The sender
     * @example 0xd4a3BebD824189481FC45363602b83C9c7e9cbDf
     */
    fromAddress: string;
    /** @description The token ids of the tokens that were transfered */
    tokenIds: string[];
    /** @description The amounts that were transfered */
    amounts: string[];
    /**
     * @description They contract type of the transfer
     * @example ERC721
     */
    contractType: string;
}
export interface Erc20MetadataParams {
    /**
     * @description The address of the token contract
     * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
     */
    address: string;
    /**
     * @description The name of the token Contract
     * @example Kylin Network
     */
    name: string;
    /**
     * @description The symbol of the NFT contract
     * @example KYL
     */
    symbol: string;
    /**
     * @description The number of decimals on of the token
     * @example 18
     */
    decimals: string;
    /**
     * @description The logo of the token
     * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png
     */
    logo?: string;
    /**
     * @description The logo hash
     * @example ee7aa2cdf100649a3521a082116258e862e6971261a39b5cd4e4354fcccbc54d
     */
    logoHash?: string;
    /**
     * @description The thumbnail of the logo
     * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99cThumb.png
     */
    thumbnail?: string;
    blockNumber?: string;
    validated?: string;
}
export interface MetadataResyncParams {
    /** @description The status of resync request */
    status: string;
}
export interface Erc721MetadataParams {
    /**
     * @description The name of the token Contract
     * @example Kylin Network
     */
    name: string;
    /**
     * @description The symbol of the NFT contract
     * @example KYL
     */
    symbol: string;
    tokenUri?: string;
}
export interface Erc20PriceParams {
    nativePrice?: components["schemas"]["nativeErc20Price"];
    /**
     * Format: double
     * @description The price in USD for the token
     * @example 19.722370676
     */
    usdPrice: number;
    /**
     * @description The address of the exchange used to calculate the price
     * @example 0x1f98431c8ad98523631ae4a59f267346ea31f984
     */
    exchangeAddress?: string;
    /**
     * @description The name of the exchange used for calculating the price
     * @example Uniswap v3
     */
    exchangeName?: string;
} & {
    symbol: unknown;
}
export interface NativeErc20PriceParams {
    /**
     * @description The native price of the token
     * @example 8409770570506626
     */
    value: string;
    /**
     * @description The number of decimals of the token
     * @example 18
     */
    decimals: number;
    /**
     * @description The Name of the token
     * @example Ether
     */
    name: string;
    /**
     * @description The Symbol of the token
     * @example ETH
     */
    symbol: string;
}
export interface Erc20TransactionCollectionParams {
    /**
     * @description The total number of matches for this query
     * @example 2000
     */
    total?: number;
    /**
     * @description The page of the current result
     * @example 2
     */
    page?: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    pageSize?: number;
    result?: components["schemas"]["erc20Transaction"][];
}
export interface EnsParams {
    /**
     * @description Resolved ENS address
     * @example Vitalik.eth
     */
    name: string;
}
export interface ResolveParams {
    /**
     * @description Resolved domain address
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    address: string;
}
export interface ReservesCollectionParams {
    token0?: {
        /** @example 0x2b591e99afe9f32eaa6214f7b7629768c40eeb39 */
        address?: string;
        /** @example HEX */
        name?: string;
        /** @example HEX */
        symbol?: string;
        /** @example 9 */
        decimals?: string;
        /** @example https://cdn.moralis.io/eth/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39.png */
        logo?: string;
        /** @example b3bd1b5512965d7b6aeee903dcc6d28b116d58c788eb41e9c1690baed878beaa */
        logoHash?: string;
        /** @example https://cdn.moralis.io/eth/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39Thumb.png */
        thumbnail?: string;
        /** @example 14836562 */
        blockNumber?: string;
        /** @example 0 */
        validated?: number;
        /** @example 2022-01-20T09:39:55.818Z */
        createdAt?: string;
    };
    token1?: {
        /** @example 0xdac17f958d2ee523a2206206994597c13d831ec7 */
        address?: string;
        /** @example Tether USD */
        name?: string;
        /** @example USDT */
        symbol?: string;
        /** @example 6 */
        decimals?: string;
        /** @example https://cdn.moralis.io/eth/0xdac17f958d2ee523a2206206994597c13d831ec7.png */
        logo?: string;
        /** @example ee7aa2cdf100649a3521a082116258e862e6971261a39b5cd4e4354fcccbc54d */
        logoHash?: string;
        /** @example https://cdn.moralis.io/eth/0xdac17f958d2ee523a2206206994597c13d831ec7Thumb.png */
        thumbnail?: string;
        /** @example 4638568 */
        blockNumber?: string;
        /** @example 1 */
        validated?: number;
        /** @example 2022-01-20T09:39:55.818Z */
        createdAt?: string;
    };
    /** @example 0xbbb9bf440d0f686487925fef3b0a0f9aa67753f6 */
    pairAddress?: string;
}
export interface IpfsFileRequestParams {
    /**
     * @description Path to file
     * @example moralis/logo.jpg
     */
    path: string;
    /**
     * @description base64 or JSON
     * @example iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3
     */
    content: string;
}
export interface IpfsFileParams {
    /**
     * @description Path to file
     * @example https://ipfs.moralis.io/QmPQ3YJ3hgfsBzJ1U4MGyV2C1GhDy6MWCENr1qMdMpKVnY/moralis/logo.jpg
     */
    path: string;
}
export interface Web3versionParams {
    /**
     * @description version of the api
     * @example 1.0.0
     */
    version: string;
}
export interface EndpointWeightsParams {
    /**
     * @description endpoint
     * @example endpointWeights
     */
    endpoint: string;
    /**
     * @description The path to the endpoint
     * @example /info/endpointWeights
     */
    path: string;
    /**
     * @description The number of hits the requests counts for ratelimiting
     * @example 1
     */
    rateLimitWeight: string;
    /**
     * @description The number of hits the requests counts for billing
     * @example 0
     */
    price: string;
}
