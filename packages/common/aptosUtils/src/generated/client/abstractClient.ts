import { GetNFTsByIdsOperation, GetNFTsByIdsOperationRequest, GetNFTsByIdsOperationRequestJSON } from '../operations/GetNFTsByIdsOperation';
import { AptosNFTTokenResponse, AptosNFTTokenResponseJSON } from '../types/AptosNFTTokenResponse';
import { GetNFTsByCollectionOperation, GetNFTsByCollectionOperationRequest, GetNFTsByCollectionOperationRequestJSON } from '../operations/GetNFTsByCollectionOperation';
import { AptosNFTTokensByCollectionResponse, AptosNFTTokensByCollectionResponseJSON } from '../types/AptosNFTTokensByCollectionResponse';
import { GetNFTsByCreatorsOperation, GetNFTsByCreatorsOperationRequest, GetNFTsByCreatorsOperationRequestJSON } from '../operations/GetNFTsByCreatorsOperation';
import { AptosNFTTokensByCreatorsResponse, AptosNFTTokensByCreatorsResponseJSON } from '../types/AptosNFTTokensByCreatorsResponse';
import { GetNFTCollectionsOperation, GetNFTCollectionsOperationRequest, GetNFTCollectionsOperationRequestJSON } from '../operations/GetNFTCollectionsOperation';
import { AptosNFTCollectionsByNameRangeResponse, AptosNFTCollectionsByNameRangeResponseJSON } from '../types/AptosNFTCollectionsByNameRangeResponse';
import { GetNFTCollectionsByIdsOperation, GetNFTCollectionsByIdsOperationRequest, GetNFTCollectionsByIdsOperationRequestJSON } from '../operations/GetNFTCollectionsByIdsOperation';
import { AptosNFTCollectionItemResponse, AptosNFTCollectionItemResponseJSON } from '../types/AptosNFTCollectionItemResponse';
import { GetNFTCollectionsByCreatorOperation, GetNFTCollectionsByCreatorOperationRequest, GetNFTCollectionsByCreatorOperationRequestJSON } from '../operations/GetNFTCollectionsByCreatorOperation';
import { AptosNFTCollectionsByCreatorResponse, AptosNFTCollectionsByCreatorResponseJSON } from '../types/AptosNFTCollectionsByCreatorResponse';
import { GetNFTOwnersByTokensOperation, GetNFTOwnersByTokensOperationRequest, GetNFTOwnersByTokensOperationRequestJSON } from '../operations/GetNFTOwnersByTokensOperation';
import { AptosNFTOwnersByTokensResponse, AptosNFTOwnersByTokensResponseJSON } from '../types/AptosNFTOwnersByTokensResponse';
import { GetNFTOwnersByCollectionOperation, GetNFTOwnersByCollectionOperationRequest, GetNFTOwnersByCollectionOperationRequestJSON } from '../operations/GetNFTOwnersByCollectionOperation';
import { AptosNFTOwnersByCollectionResponse, AptosNFTOwnersByCollectionResponseJSON } from '../types/AptosNFTOwnersByCollectionResponse';
import { GetNFTOwnersOfCollectionOperation, GetNFTOwnersOfCollectionOperationRequest, GetNFTOwnersOfCollectionOperationRequestJSON } from '../operations/GetNFTOwnersOfCollectionOperation';
import { AptosNFTOwnersOfCollectionResponse, AptosNFTOwnersOfCollectionResponseJSON } from '../types/AptosNFTOwnersOfCollectionResponse';
import { GetNFTTransfersByIdsOperation, GetNFTTransfersByIdsOperationRequest, GetNFTTransfersByIdsOperationRequestJSON } from '../operations/GetNFTTransfersByIdsOperation';
import { AptosNFTTransfersByTokensResponse, AptosNFTTransfersByTokensResponseJSON } from '../types/AptosNFTTransfersByTokensResponse';
import { GetNFTTransfersByCollectionOperation, GetNFTTransfersByCollectionOperationRequest, GetNFTTransfersByCollectionOperationRequestJSON } from '../operations/GetNFTTransfersByCollectionOperation';
import { AptosGetNFTTransfersByCollectionResponse, AptosGetNFTTransfersByCollectionResponseJSON } from '../types/AptosGetNFTTransfersByCollectionResponse';
import { GetNFTTransfersByCreatorsOperation, GetNFTTransfersByCreatorsOperationRequest, GetNFTTransfersByCreatorsOperationRequestJSON } from '../operations/GetNFTTransfersByCreatorsOperation';
import { AptosGetNFTTransfersByCreatorsResponse, AptosGetNFTTransfersByCreatorsResponseJSON } from '../types/AptosGetNFTTransfersByCreatorsResponse';
import { GetNFTTransfersByWalletsOperation, GetNFTTransfersByWalletsOperationRequest, GetNFTTransfersByWalletsOperationRequestJSON } from '../operations/GetNFTTransfersByWalletsOperation';
import { AptosNFTTransfersByWalletsResponse, AptosNFTTransfersByWalletsResponseJSON } from '../types/AptosNFTTransfersByWalletsResponse';
import { GetCoinInfoByCoinTypeHashesOperation, GetCoinInfoByCoinTypeHashesOperationRequest, GetCoinInfoByCoinTypeHashesOperationRequestJSON } from '../operations/GetCoinInfoByCoinTypeHashesOperation';
import { AptosCoinInfoDto, AptosCoinInfoDtoJSON } from '../types/AptosCoinInfoDto';
import { GetLatestCoinsOperation, GetLatestCoinsOperationRequest, GetLatestCoinsOperationRequestJSON } from '../operations/GetLatestCoinsOperation';
import { AptosGetLatestCoinsResponse, AptosGetLatestCoinsResponseJSON } from '../types/AptosGetLatestCoinsResponse';
import { GetCoinsByNameRangeOperation, GetCoinsByNameRangeOperationRequest, GetCoinsByNameRangeOperationRequestJSON } from '../operations/GetCoinsByNameRangeOperation';
import { AptosGetCoinsByNameRangeResponse, AptosGetCoinsByNameRangeResponseJSON } from '../types/AptosGetCoinsByNameRangeResponse';
import { GetCoinsBySymbolRangeOperation, GetCoinsBySymbolRangeOperationRequest, GetCoinsBySymbolRangeOperationRequestJSON } from '../operations/GetCoinsBySymbolRangeOperation';
import { AptosGetCoinsBySymbolRangeResponse, AptosGetCoinsBySymbolRangeResponseJSON } from '../types/AptosGetCoinsBySymbolRangeResponse';
import { GetCoinsByCreatorsOperation, GetCoinsByCreatorsOperationRequest, GetCoinsByCreatorsOperationRequestJSON } from '../operations/GetCoinsByCreatorsOperation';
import { AptosGetCoinsByCreatorsResponse, AptosGetCoinsByCreatorsResponseJSON } from '../types/AptosGetCoinsByCreatorsResponse';
import { GetCoinTransfersByOwnerAddressesOperation, GetCoinTransfersByOwnerAddressesOperationRequest, GetCoinTransfersByOwnerAddressesOperationRequestJSON } from '../operations/GetCoinTransfersByOwnerAddressesOperation';
import { AptosGetCoinTransfersByOwnerAddressesResponse, AptosGetCoinTransfersByOwnerAddressesResponseJSON } from '../types/AptosGetCoinTransfersByOwnerAddressesResponse';
import { GetCoinTransfersByBlockHeightsOperation, GetCoinTransfersByBlockHeightsOperationRequest, GetCoinTransfersByBlockHeightsOperationRequestJSON } from '../operations/GetCoinTransfersByBlockHeightsOperation';
import { AptosGetCoinTransfersByBlockHeightsResponse, AptosGetCoinTransfersByBlockHeightsResponseJSON } from '../types/AptosGetCoinTransfersByBlockHeightsResponse';
import { GetCoinTransfersByCoinTypeOperation, GetCoinTransfersByCoinTypeOperationRequest, GetCoinTransfersByCoinTypeOperationRequestJSON } from '../operations/GetCoinTransfersByCoinTypeOperation';
import { AptosGetCoinTransfersByCoinTypeResponse, AptosGetCoinTransfersByCoinTypeResponseJSON } from '../types/AptosGetCoinTransfersByCoinTypeResponse';
import { GetTopHoldersByCoinOperation, GetTopHoldersByCoinOperationRequest, GetTopHoldersByCoinOperationRequestJSON } from '../operations/GetTopHoldersByCoinOperation';
import { AptosGetTopHoldersByCoinResponse, AptosGetTopHoldersByCoinResponseJSON } from '../types/AptosGetTopHoldersByCoinResponse';
import { GetCoinBalancesByWalletsOperation, GetCoinBalancesByWalletsOperationRequest, GetCoinBalancesByWalletsOperationRequestJSON } from '../operations/GetCoinBalancesByWalletsOperation';
import { AptosGetCoinBalancesByWalletsResponse, AptosGetCoinBalancesByWalletsResponseJSON } from '../types/AptosGetCoinBalancesByWalletsResponse';
import { GetHistoricalCoinBalancesByWalletsOperation, GetHistoricalCoinBalancesByWalletsOperationRequest, GetHistoricalCoinBalancesByWalletsOperationRequestJSON } from '../operations/GetHistoricalCoinBalancesByWalletsOperation';
import { AptosGetHistoricalCoinBalancesByWalletsResponse, AptosGetHistoricalCoinBalancesByWalletsResponseJSON } from '../types/AptosGetHistoricalCoinBalancesByWalletsResponse';
import { GetCoinTransfersByWalletAddressesOperation, GetCoinTransfersByWalletAddressesOperationRequest, GetCoinTransfersByWalletAddressesOperationRequestJSON } from '../operations/GetCoinTransfersByWalletAddressesOperation';
import { GetNFTByOwnersOperation, GetNFTByOwnersOperationRequest, GetNFTByOwnersOperationRequestJSON } from '../operations/GetNFTByOwnersOperation';
import { AptosNFTsByOwnersResponse, AptosNFTsByOwnersResponseJSON } from '../types/AptosNFTsByOwnersResponse';
import { GetWalletsNFTTransfersOperation, GetWalletsNFTTransfersOperationRequest, GetWalletsNFTTransfersOperationRequestJSON } from '../operations/GetWalletsNFTTransfersOperation';
import { GetAccountOperation, GetAccountOperationRequest, GetAccountOperationRequestJSON } from '../operations/GetAccountOperation';
import { AptosGetAccountResponse, AptosGetAccountResponseJSON } from '../types/AptosGetAccountResponse';
import { GetAccountResourcesOperation, GetAccountResourcesOperationRequest, GetAccountResourcesOperationRequestJSON } from '../operations/GetAccountResourcesOperation';
import { AptosGetAccountResourceResponse, AptosGetAccountResourceResponseJSON } from '../types/AptosGetAccountResourceResponse';
import { GetAccountModulesOperation, GetAccountModulesOperationRequest, GetAccountModulesOperationRequestJSON } from '../operations/GetAccountModulesOperation';
import { AptosGetAccountModuleResponse, AptosGetAccountModuleResponseJSON } from '../types/AptosGetAccountModuleResponse';
import { GetAccountResourceOperation, GetAccountResourceOperationRequest, GetAccountResourceOperationRequestJSON } from '../operations/GetAccountResourceOperation';
import { GetAccountModuleOperation, GetAccountModuleOperationRequest, GetAccountModuleOperationRequestJSON } from '../operations/GetAccountModuleOperation';
import { GetEventsByCreationNumberOperation, GetEventsByCreationNumberOperationRequest, GetEventsByCreationNumberOperationRequestJSON } from '../operations/GetEventsByCreationNumberOperation';
import { AptosGetEventsByCreationNumberResponse, AptosGetEventsByCreationNumberResponseJSON } from '../types/AptosGetEventsByCreationNumberResponse';
import { GetEventsByEventHandleOperation, GetEventsByEventHandleOperationRequest, GetEventsByEventHandleOperationRequestJSON } from '../operations/GetEventsByEventHandleOperation';
import { AptosGetEventsByEventHandleResponse, AptosGetEventsByEventHandleResponseJSON } from '../types/AptosGetEventsByEventHandleResponse';
import { GetTransactionsOperation, GetTransactionsOperationRequest, GetTransactionsOperationRequestJSON } from '../operations/GetTransactionsOperation';
import { AptosGetTransactionsItemValue, AptosGetTransactionsItemJSON } from '../types/AptosGetTransactionsItem';
import { SubmitTransactionOperation, SubmitTransactionOperationRequest, SubmitTransactionOperationRequestJSON } from '../operations/SubmitTransactionOperation';
import { AptosPendingTransaction, AptosPendingTransactionJSON } from '../types/AptosPendingTransaction';
import { AptosSubmitTransactionRequest, AptosSubmitTransactionRequestInput, AptosSubmitTransactionRequestJSON } from '../types/AptosSubmitTransactionRequest';
import { GetTransactionByHashOperation, GetTransactionByHashOperationRequest, GetTransactionByHashOperationRequestJSON } from '../operations/GetTransactionByHashOperation';
import { AptosGetTransactionByHashValue, AptosGetTransactionByHashJSON } from '../types/AptosGetTransactionByHash';
import { GetTransactionByVersionOperation, GetTransactionByVersionOperationRequest, GetTransactionByVersionOperationRequestJSON } from '../operations/GetTransactionByVersionOperation';
import { AptosGetTransactionByVersionValue, AptosGetTransactionByVersionJSON } from '../types/AptosGetTransactionByVersion';
import { GetAccountTransactionsOperation, GetAccountTransactionsOperationRequest, GetAccountTransactionsOperationRequestJSON } from '../operations/GetAccountTransactionsOperation';
import { AptosGetAccountTransactionsItemValue, AptosGetAccountTransactionsItemJSON } from '../types/AptosGetAccountTransactionsItem';
import { SubmitBatchTransactionsOperation, SubmitBatchTransactionsOperationRequest, SubmitBatchTransactionsOperationRequestJSON } from '../operations/SubmitBatchTransactionsOperation';
import { AptosSubmitBatchTransactionResult, AptosSubmitBatchTransactionResultJSON } from '../types/AptosSubmitBatchTransactionResult';
import { SimulateTransactionOperation, SimulateTransactionOperationRequest, SimulateTransactionOperationRequestJSON } from '../operations/SimulateTransactionOperation';
import { AptosSimulateTransactionValue, AptosSimulateTransactionJSON } from '../types/AptosSimulateTransaction';
import { EncodeSubmissionOperation, EncodeSubmissionOperationRequest, EncodeSubmissionOperationRequestJSON } from '../operations/EncodeSubmissionOperation';
import { AptosEncodeSubmissionRequest, AptosEncodeSubmissionRequestInput, AptosEncodeSubmissionRequestJSON } from '../types/AptosEncodeSubmissionRequest';
import { EstimateGasPriceOperation, EstimateGasPriceOperationRequest, EstimateGasPriceOperationRequestJSON } from '../operations/EstimateGasPriceOperation';
import { AptosEstimateGasPriceResult, AptosEstimateGasPriceResultJSON } from '../types/AptosEstimateGasPriceResult';
import { GetBlockByHeightOperation, GetBlockByHeightOperationRequest, GetBlockByHeightOperationRequestJSON } from '../operations/GetBlockByHeightOperation';
import { AptosBlock, AptosBlockJSON } from '../types/AptosBlock';
import { GetBlockByVersionOperation, GetBlockByVersionOperationRequest, GetBlockByVersionOperationRequestJSON } from '../operations/GetBlockByVersionOperation';

export interface OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON> {
  operationId: string;
  groupName: string;
  httpMethod: string;
  routePattern: string;
  parameterNames: string[];
  hasResponse: boolean;
  hasBody: boolean;
  serializeRequest?: (request: Request) => RequestJSON;
  parseResponse?: (json: ResponseJSON) => Response;
  serializeBody?: (body: Body) => BodyJSON;
}

export abstract class AbstractClient {
  protected abstract createEndpoint<Request, RequestJSON, Response, ResponseJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, null, null>
  ): (request: Request) => Promise<Response>;
  protected abstract createEndpointWithBody<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>
  ): (request: Request, body: Body) => Promise<Response>;

  public readonly accounts = {
    /**
     * @description Get account
     * @param request Request with parameters.
     * @param {String} request.address Address of account with or without a 0x prefix
     * @param {String} [request.ledgerVersion] Ledger version to get state of account.
     * If not provided, it will be the latest version (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getAccount: this.createEndpoint<
      GetAccountOperationRequest,
      GetAccountOperationRequestJSON,
      AptosGetAccountResponse,
      AptosGetAccountResponseJSON
    >(GetAccountOperation),
    /**
     * @description Get account resources
     * @param request Request with parameters.
     * @param {String} request.address Address of account with or without a 0x prefix
     * @param {String} [request.ledgerVersion] Ledger version to get state of account.
     * If not provided, it will be the latest version (optional)
     * @param {Number} [request.limit] Max number of account resources to retrieve.
     * If not provided, defaults to default page size. (optional)
     * @param {String} [request.start] Cursor specifying where to start for pagination
     * This cursor cannot be derived manually client-side. Instead, you must call this endpoint once without this query parameter specified, and then use the cursor returned in the X-Aptos-Cursor header in the response. (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object[]} Response for the request.
     */
    getAccountResources: this.createEndpoint<
      GetAccountResourcesOperationRequest,
      GetAccountResourcesOperationRequestJSON,
      AptosGetAccountResourceResponse[],
      AptosGetAccountResourceResponseJSON[]
    >(GetAccountResourcesOperation),
    /**
     * @description Get account modules
     * @param request Request with parameters.
     * @param {String} request.address Address of account with or without a 0x prefix
     * @param {String} [request.ledgerVersion] Ledger version to get state of account.
     * If not provided, it will be the latest version (optional)
     * @param {Number} [request.limit] Max number of account resources to retrieve.
     * If not provided, defaults to default page size. (optional)
     * @param {String} [request.start] Cursor specifying where to start for pagination
     * This cursor cannot be derived manually client-side. Instead, you must call this endpoint once without this query parameter specified, and then use the cursor returned in the X-Aptos-Cursor header in the response. (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object[]} Response for the request.
     */
    getAccountModules: this.createEndpoint<
      GetAccountModulesOperationRequest,
      GetAccountModulesOperationRequestJSON,
      AptosGetAccountModuleResponse[],
      AptosGetAccountModuleResponseJSON[]
    >(GetAccountModulesOperation),
    /**
     * @description Get account resource
     * @param request Request with parameters.
     * @param {String} request.address Address of account with or without a 0x prefix
     * @param {String} request.resourceType Name of struct to retrieve e.g. 0x1::account::Account
     * @param {String} [request.ledgerVersion] Ledger version to get state of account.
     * If not provided, it will be the latest version (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getAccountResource: this.createEndpoint<
      GetAccountResourceOperationRequest,
      GetAccountResourceOperationRequestJSON,
      AptosGetAccountResourceResponse,
      AptosGetAccountResourceResponseJSON
    >(GetAccountResourceOperation),
    /**
     * @description Get account module
     * @param request Request with parameters.
     * @param {String} request.address Address of account with or without a 0x prefix
     * @param {String} request.moduleName Name of module to retrieve
     * @param {String} [request.ledgerVersion] Ledger version to get state of account.
     * If not provided, it will be the latest version (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getAccountModule: this.createEndpoint<
      GetAccountModuleOperationRequest,
      GetAccountModuleOperationRequestJSON,
      AptosGetAccountModuleResponse,
      AptosGetAccountModuleResponseJSON
    >(GetAccountModuleOperation),
    /**
     * @description Get events by creation number
     * @param request Request with parameters.
     * @param {String} request.address Address of account with or without a 0x prefix
     * @param {String} request.creationNumber Creation number corresponding to the event stream originating from the given account.
     * @param {Number} [request.limit] Max number of account resources to retrieve.
     * If not provided, defaults to default page size. (optional)
     * @param {String} [request.start] Starting sequence number of events.
     * If unspecified, by default will retrieve the most recent events (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object[]} Response for the request.
     */
    getEventsByCreationNumber: this.createEndpoint<
      GetEventsByCreationNumberOperationRequest,
      GetEventsByCreationNumberOperationRequestJSON,
      AptosGetEventsByCreationNumberResponse[],
      AptosGetEventsByCreationNumberResponseJSON[]
    >(GetEventsByCreationNumberOperation),
    /**
     * @description Get events by event handle
     * @param request Request with parameters.
     * @param {String} request.address Hex-encoded 32 byte Aptos account, with or without a 0x prefix, for which events are queried. This refers to the account that events were emitted to, not the account hosting the move module that emits that event type.
     * @param {String} request.eventHandle Name of struct to lookup event handle.
     * @param {String} request.fieldName Name of field to lookup event handle.
     * @param {Number} [request.limit] Max number of account resources to retrieve.
     * If not provided, defaults to default page size. (optional)
     * @param {String} [request.start] Starting sequence number of events.
     * If unspecified, by default will retrieve the most recent events (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object[]} Response for the request.
     */
    getEventsByEventHandle: this.createEndpoint<
      GetEventsByEventHandleOperationRequest,
      GetEventsByEventHandleOperationRequestJSON,
      AptosGetEventsByEventHandleResponse[],
      AptosGetEventsByEventHandleResponseJSON[]
    >(GetEventsByEventHandleOperation),
  };
  public readonly blocks = {
    /**
     * @description Get block by height
     * @param request Request with parameters.
     * @param {Number} request.blockHeight Block height to lookup. Starts at 0
     * @param {Boolean} [request.withTransactions] If set to true, include all transactions in the block (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getBlockByHeight: this.createEndpoint<
      GetBlockByHeightOperationRequest,
      GetBlockByHeightOperationRequestJSON,
      AptosBlock,
      AptosBlockJSON
    >(GetBlockByHeightOperation),
    /**
     * @description Get block by version
     * @param request Request with parameters.
     * @param {Number} request.version Ledger version to lookup block information for.
     * @param {Boolean} [request.withTransactions] If set to true, include all transactions in the block (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getBlockByVersion: this.createEndpoint<
      GetBlockByVersionOperationRequest,
      GetBlockByVersionOperationRequestJSON,
      AptosBlock,
      AptosBlockJSON
    >(GetBlockByVersionOperation),
  };
  public readonly coins = {
    /**
     * @description Get Coin Metadata by Coin Type Hashes
     * @param request Request with parameters.
     * @param {String[]} request.coinTypeHashes The coin type hashes to fetch info about
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object[]} Response for the request.
     */
    getCoinInfoByCoinTypeHashes: this.createEndpoint<
      GetCoinInfoByCoinTypeHashesOperationRequest,
      GetCoinInfoByCoinTypeHashesOperationRequestJSON,
      AptosCoinInfoDto[],
      AptosCoinInfoDtoJSON[]
    >(GetCoinInfoByCoinTypeHashesOperation),
    /**
     * @description Get latest deployed coins
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getLatestCoins: this.createEndpoint<
      GetLatestCoinsOperationRequest,
      GetLatestCoinsOperationRequestJSON,
      AptosGetLatestCoinsResponse,
      AptosGetLatestCoinsResponseJSON
    >(GetLatestCoinsOperation),
    /**
     * @description Get Coin Metadata by name range
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String} [request.fromName] The name of the coin to start from (inclusive and case sensitive) (optional)
     * @param {String} [request.toName] The name of the coin to end at (inclusive and case sensitive) (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getCoinsByNameRange: this.createEndpoint<
      GetCoinsByNameRangeOperationRequest,
      GetCoinsByNameRangeOperationRequestJSON,
      AptosGetCoinsByNameRangeResponse,
      AptosGetCoinsByNameRangeResponseJSON
    >(GetCoinsByNameRangeOperation),
    /**
     * @description Get Coin Metadata by symbol range
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String} [request.fromSymbol] The name of the coin to start from (inclusive and case sensitive) (optional)
     * @param {String} [request.toSymbol] The name of the coin to end at (inclusive and case sensitive) (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getCoinsBySymbolRange: this.createEndpoint<
      GetCoinsBySymbolRangeOperationRequest,
      GetCoinsBySymbolRangeOperationRequestJSON,
      AptosGetCoinsBySymbolRangeResponse,
      AptosGetCoinsBySymbolRangeResponseJSON
    >(GetCoinsBySymbolRangeOperation),
    /**
     * @description Get Coin Metadata by creator addresses
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Object[]} request.creatorAddresses The addresses of the creators
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getCoinsByCreators: this.createEndpoint<
      GetCoinsByCreatorsOperationRequest,
      GetCoinsByCreatorsOperationRequestJSON,
      AptosGetCoinsByCreatorsResponse,
      AptosGetCoinsByCreatorsResponseJSON
    >(GetCoinsByCreatorsOperation),
    /**
     * @description Get Coin Transfers by wallet addresses
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Object[]} request.ownerAddresses The addresses of the owners to get tokens for
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String} [request.fromDate] The date from which to fetch coin transfers (optional)
     * @param {String} [request.toDate] The date to which to fetch coin transfers (optional)
     * @param {String[]} [request.coinTypeBlacklist] The coin types of the coins to whitelist (optional)
     * @param {String[]} [request.coinTypeWhitelist] The coin types of the coins to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getCoinTransfersByOwnerAddresses: this.createEndpoint<
      GetCoinTransfersByOwnerAddressesOperationRequest,
      GetCoinTransfersByOwnerAddressesOperationRequestJSON,
      AptosGetCoinTransfersByOwnerAddressesResponse,
      AptosGetCoinTransfersByOwnerAddressesResponseJSON
    >(GetCoinTransfersByOwnerAddressesOperation),
    /**
     * @description Get Coin Transfers by block heights
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {String[]} request.blockHeights The coin types to fetch info about
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getCoinTransfersByBlockHeights: this.createEndpoint<
      GetCoinTransfersByBlockHeightsOperationRequest,
      GetCoinTransfersByBlockHeightsOperationRequestJSON,
      AptosGetCoinTransfersByBlockHeightsResponse,
      AptosGetCoinTransfersByBlockHeightsResponseJSON
    >(GetCoinTransfersByBlockHeightsOperation),
    /**
     * @description Get Coin Transfers by Coin Type
     * @param request Request with parameters.
     * @param {String} request.coinType The coin type to fetch info about
     * @param {Number} request.limit The number of results to return
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String} [request.fromDate] The date from which to fetch coin transfers (optional)
     * @param {String} [request.toDate] The date to which to fetch coin transfers (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getCoinTransfersByCoinType: this.createEndpoint<
      GetCoinTransfersByCoinTypeOperationRequest,
      GetCoinTransfersByCoinTypeOperationRequestJSON,
      AptosGetCoinTransfersByCoinTypeResponse,
      AptosGetCoinTransfersByCoinTypeResponseJSON
    >(GetCoinTransfersByCoinTypeOperation),
    /**
     * @description Get top Holders of Coin
     * @param request Request with parameters.
     * @param {String} request.coinTypeHash The coin type hash to fetch info about
     * @param {Number} request.limit The number of results to return
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {Object} [request.minAmount] The minimum amount of coins required for a wallet to be included in the results (optional)
     * @param {Number} [request.minVersion] The minimum version on when the balance was last updated (optional)
     * @param {String[]} [request.walletBlacklist] The addresses of the wallets to blacklist (optional)
     * @param {String[]} [request.walletWhitelist] The addresses of the wallets to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getTopHoldersByCoin: this.createEndpoint<
      GetTopHoldersByCoinOperationRequest,
      GetTopHoldersByCoinOperationRequestJSON,
      AptosGetTopHoldersByCoinResponse,
      AptosGetTopHoldersByCoinResponseJSON
    >(GetTopHoldersByCoinOperation),
  };
  public readonly collections = {
    /**
     * @description Get NFT Collections
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String} [request.fromName] The name of the collection to start from (inclusive and case sensitive) (optional)
     * @param {String} [request.toName] The name of the collection to end at (inclusive and case sensitive) (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTCollections: this.createEndpoint<
      GetNFTCollectionsOperationRequest,
      GetNFTCollectionsOperationRequestJSON,
      AptosNFTCollectionsByNameRangeResponse,
      AptosNFTCollectionsByNameRangeResponseJSON
    >(GetNFTCollectionsOperation),
    /**
     * @description Get NFT Collections by ids
     * @param request Request with parameters.
     * @param {String[]} request.ids The identifiers of the collections to get
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object[]} Response for the request.
     */
    getNFTCollectionsByIds: this.createEndpoint<
      GetNFTCollectionsByIdsOperationRequest,
      GetNFTCollectionsByIdsOperationRequestJSON,
      AptosNFTCollectionItemResponse[],
      AptosNFTCollectionItemResponseJSON[]
    >(GetNFTCollectionsByIdsOperation),
    /**
     * @description Get NFT Collections by creator
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Object} request.creatorAddress The address of the creator
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTCollectionsByCreator: this.createEndpoint<
      GetNFTCollectionsByCreatorOperationRequest,
      GetNFTCollectionsByCreatorOperationRequestJSON,
      AptosNFTCollectionsByCreatorResponse,
      AptosNFTCollectionsByCreatorResponseJSON
    >(GetNFTCollectionsByCreatorOperation),
  };
  public readonly nfts = {
    /**
     * @description Get NFTs by ids
     * @param request Request with parameters.
     * @param {String[]} request.tokenIds The identifiers of the tokens to get
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object[]} Response for the request.
     */
    getNFTsByIds: this.createEndpoint<
      GetNFTsByIdsOperationRequest,
      GetNFTsByIdsOperationRequestJSON,
      AptosNFTTokenResponse[],
      AptosNFTTokenResponseJSON[]
    >(GetNFTsByIdsOperation),
    /**
     * @description Get NFTs by Collection
     * @param request Request with parameters.
     * @param {String} request.collectionDataIdHash The collection data id hash of the collection
     * @param {Number} request.limit The number of results to return
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTsByCollection: this.createEndpoint<
      GetNFTsByCollectionOperationRequest,
      GetNFTsByCollectionOperationRequestJSON,
      AptosNFTTokensByCollectionResponse,
      AptosNFTTokensByCollectionResponseJSON
    >(GetNFTsByCollectionOperation),
    /**
     * @description Get NFTs by creators
     * @param request Request with parameters.
     * @param {Number} request.limit The number of tokens to return
     * @param {Object[]} request.creatorAddresses The addresses of the creators
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTsByCreators: this.createEndpoint<
      GetNFTsByCreatorsOperationRequest,
      GetNFTsByCreatorsOperationRequestJSON,
      AptosNFTTokensByCreatorsResponse,
      AptosNFTTokensByCreatorsResponseJSON
    >(GetNFTsByCreatorsOperation),
    /**
     * @description Get NFT Owners by tokens
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {String[]} request.tokenIds The identifiers of the tokens to get owners for
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTOwnersByTokens: this.createEndpoint<
      GetNFTOwnersByTokensOperationRequest,
      GetNFTOwnersByTokensOperationRequestJSON,
      AptosNFTOwnersByTokensResponse,
      AptosNFTOwnersByTokensResponseJSON
    >(GetNFTOwnersByTokensOperation),
    /**
     * @description Get NFT Owners by Collection
     * @param request Request with parameters.
     * @param {String} request.collectionDataIdHash The id of the token
     * @param {Number} request.limit The number of results to return
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String[]} [request.walletBlacklist] The addresses of the wallets to blacklist (optional)
     * @param {String[]} [request.walletWhitelist] The addresses of the wallets to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTOwnersByCollection: this.createEndpoint<
      GetNFTOwnersByCollectionOperationRequest,
      GetNFTOwnersByCollectionOperationRequestJSON,
      AptosNFTOwnersByCollectionResponse,
      AptosNFTOwnersByCollectionResponseJSON
    >(GetNFTOwnersByCollectionOperation),
    /**
     * @description Get NFT Owners of Collection
     * @param request Request with parameters.
     * @param {String} request.collectionDataIdHash The id of the token
     * @param {Number} request.limit The number of results to return
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTOwnersOfCollection: this.createEndpoint<
      GetNFTOwnersOfCollectionOperationRequest,
      GetNFTOwnersOfCollectionOperationRequestJSON,
      AptosNFTOwnersOfCollectionResponse,
      AptosNFTOwnersOfCollectionResponseJSON
    >(GetNFTOwnersOfCollectionOperation),
    /**
     * @description Get NFT Transfers by Token ids
     * @param request Request with parameters.
     * @param {Number} request.limit The number of tokens to return
     * @param {String[]} request.tokenIds The identifiers of the tokens to get
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String[]} [request.walletBlacklist] The addresses of the wallets to blacklist (optional)
     * @param {String[]} [request.walletWhitelist] The addresses of the wallets to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object[]} Response for the request.
     */
    getNFTTransfersByIds: this.createEndpoint<
      GetNFTTransfersByIdsOperationRequest,
      GetNFTTransfersByIdsOperationRequestJSON,
      AptosNFTTransfersByTokensResponse[],
      AptosNFTTransfersByTokensResponseJSON[]
    >(GetNFTTransfersByIdsOperation),
    /**
     * @description Get NFT Transfers by Collection
     * @param request Request with parameters.
     * @param {String} request.collectionDataIdHash The collection data id hash of the token
     * @param {Number} request.limit The number of results to return
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String[]} [request.walletWhitelist] The addresses of the wallets to whitelist (optional)
     * @param {String[]} [request.walletBlacklist] The addresses of the wallets to blacklist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTTransfersByCollection: this.createEndpoint<
      GetNFTTransfersByCollectionOperationRequest,
      GetNFTTransfersByCollectionOperationRequestJSON,
      AptosGetNFTTransfersByCollectionResponse,
      AptosGetNFTTransfersByCollectionResponseJSON
    >(GetNFTTransfersByCollectionOperation),
    /**
     * @description Get NFT Transfers by creators
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Object[]} request.creatorAddresses The addresses of the creators
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String[]} [request.collectionBlacklist] The ids of the collections to whitelist (optional)
     * @param {String[]} [request.collectionWhitelist] The ids of the collections to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTTransfersByCreators: this.createEndpoint<
      GetNFTTransfersByCreatorsOperationRequest,
      GetNFTTransfersByCreatorsOperationRequestJSON,
      AptosGetNFTTransfersByCreatorsResponse,
      AptosGetNFTTransfersByCreatorsResponseJSON
    >(GetNFTTransfersByCreatorsOperation),
    /**
     * @description Get NFT Transfers by wallets
     * @param request Request with parameters.
     * @param {Number} request.limit The number of tokens to return
     * @param {Object[]} request.walletAddresses The addresses of the wallets to get transfers for
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String[]} [request.collectionBlacklist] The ids of the collections to whitelist (optional)
     * @param {String[]} [request.collectionWhitelist] The ids of the collections to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTTransfersByWallets: this.createEndpoint<
      GetNFTTransfersByWalletsOperationRequest,
      GetNFTTransfersByWalletsOperationRequestJSON,
      AptosNFTTransfersByWalletsResponse,
      AptosNFTTransfersByWalletsResponseJSON
    >(GetNFTTransfersByWalletsOperation),
  };
  public readonly transactions = {
    /**
     * @description Get transactions
     * @param request Request with parameters.
     * @param {Number} [request.limit] Max number of transactions to retrieve.
     * If not provided, defaults to default page size (optional)
     * @param {String} [request.start] Account sequence number to start list of transactions.
     * If not provided, defaults to showing the latest transactions (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object[]} Response for the request.
     */
    getTransactions: this.createEndpoint<
      GetTransactionsOperationRequest,
      GetTransactionsOperationRequestJSON,
      AptosGetTransactionsItemValue[],
      AptosGetTransactionsItemJSON[]
    >(GetTransactionsOperation),
    /**
     * @description Submit transaction
     * @param request Request with parameters.
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @param body Request body.
     * @param {Object} body.sender A hex encoded 32 byte Aptos account address.
     * @param {String} body.sequenceNumber A string containing a 64-bit unsigned integer.
     * @param {String} body.maxGasAmount A string containing a 64-bit unsigned integer.
     * @param {String} body.gasUnitPrice A string containing a 64-bit unsigned integer.
     * @param {String} body.expirationTimestampSecs A string containing a 64-bit unsigned integer.
     * @param {Object} body.payload An enum of the possible transaction payloads
     * @param {Object} body.signature 
     * @returns {Object} Response for the request.
     */
    submitTransaction: this.createEndpointWithBody<
      SubmitTransactionOperationRequest,
      SubmitTransactionOperationRequestJSON,
      AptosPendingTransaction,
      AptosPendingTransactionJSON,
      AptosSubmitTransactionRequestInput | AptosSubmitTransactionRequest,
      AptosSubmitTransactionRequestJSON
    >(SubmitTransactionOperation),
    /**
     * @description Get transaction by hash
     * @param request Request with parameters.
     * @param {String} request.txnHash Hash of transaction to retrieve
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getTransactionByHash: this.createEndpoint<
      GetTransactionByHashOperationRequest,
      GetTransactionByHashOperationRequestJSON,
      AptosGetTransactionByHashValue,
      AptosGetTransactionByHashJSON
    >(GetTransactionByHashOperation),
    /**
     * @description Get transaction by version
     * @param request Request with parameters.
     * @param {String} request.txnVersion Version of transaction to retrieve
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getTransactionByVersion: this.createEndpoint<
      GetTransactionByVersionOperationRequest,
      GetTransactionByVersionOperationRequestJSON,
      AptosGetTransactionByVersionValue,
      AptosGetTransactionByVersionJSON
    >(GetTransactionByVersionOperation),
    /**
     * @description Get account transactions
     * @param request Request with parameters.
     * @param {String} request.address Address of account with or without a 0x prefix
     * @param {Number} [request.limit] Max number of transactions to retrieve.
     * If not provided, defaults to default page size (optional)
     * @param {String} [request.start] Account sequence number to start list of transactions.
     * If not provided, defaults to showing the latest transactions (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object[]} Response for the request.
     */
    getAccountTransactions: this.createEndpoint<
      GetAccountTransactionsOperationRequest,
      GetAccountTransactionsOperationRequestJSON,
      AptosGetAccountTransactionsItemValue[],
      AptosGetAccountTransactionsItemJSON[]
    >(GetAccountTransactionsOperation),
    /**
     * @description Submit batch transactions
     * @param request Request with parameters.
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @param body Request body.
     * @param {Object} body.sender A hex encoded 32 byte Aptos account address.
     * @param {String} body.sequenceNumber A string containing a 64-bit unsigned integer.
     * @param {String} body.maxGasAmount A string containing a 64-bit unsigned integer.
     * @param {String} body.gasUnitPrice A string containing a 64-bit unsigned integer.
     * @param {String} body.expirationTimestampSecs A string containing a 64-bit unsigned integer.
     * @param {Object} body.payload An enum of the possible transaction payloads
     * @param {Object} body.signature 
     * @returns {Object} Response for the request.
     */
    submitBatchTransactions: this.createEndpointWithBody<
      SubmitBatchTransactionsOperationRequest,
      SubmitBatchTransactionsOperationRequestJSON,
      AptosSubmitBatchTransactionResult,
      AptosSubmitBatchTransactionResultJSON,
      AptosSubmitTransactionRequestInput[] | AptosSubmitTransactionRequest[],
      AptosSubmitTransactionRequestJSON[]
    >(SubmitBatchTransactionsOperation),
    /**
     * @description Simulate transaction
     * @param request Request with parameters.
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @param body Request body.
     * @param {Object} body.sender A hex encoded 32 byte Aptos account address.
     * @param {String} body.sequenceNumber A string containing a 64-bit unsigned integer.
     * @param {String} body.maxGasAmount A string containing a 64-bit unsigned integer.
     * @param {String} body.gasUnitPrice A string containing a 64-bit unsigned integer.
     * @param {String} body.expirationTimestampSecs A string containing a 64-bit unsigned integer.
     * @param {Object} body.payload An enum of the possible transaction payloads
     * @param {Object} body.signature 
     * @returns {Object} Response for the request.
     */
    simulateTransaction: this.createEndpointWithBody<
      SimulateTransactionOperationRequest,
      SimulateTransactionOperationRequestJSON,
      AptosSimulateTransactionValue,
      AptosSimulateTransactionJSON,
      AptosSubmitTransactionRequestInput | AptosSubmitTransactionRequest,
      AptosSubmitTransactionRequestJSON
    >(SimulateTransactionOperation),
    /**
     * @description Encode submission
     * @param request Request with parameters.
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @param body Request body.
     * @param {Object} body.sender A hex encoded 32 byte Aptos account address.
     * @param {String} body.sequenceNumber A string containing a 64-bit unsigned integer.
     * @param {String} body.maxGasAmount A string containing a 64-bit unsigned integer.
     * @param {String} body.gasUnitPrice A string containing a 64-bit unsigned integer.
     * @param {String} body.expirationTimestampSecs A string containing a 64-bit unsigned integer.
     * @param {Object} body.payload An enum of the possible transaction payloads
     * @param {String[]} body.secondarySigners Secondary signer accounts of the request for Multi-agent
     * @returns {String} Response for the request.
     */
    encodeSubmission: this.createEndpointWithBody<
      EncodeSubmissionOperationRequest,
      EncodeSubmissionOperationRequestJSON,
      string,
      string,
      AptosEncodeSubmissionRequestInput | AptosEncodeSubmissionRequest,
      AptosEncodeSubmissionRequestJSON
    >(EncodeSubmissionOperation),
    /**
     * @description Estimate gas price
     * @param request Request with parameters.
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    estimateGasPrice: this.createEndpoint<
      EstimateGasPriceOperationRequest,
      EstimateGasPriceOperationRequestJSON,
      AptosEstimateGasPriceResult,
      AptosEstimateGasPriceResultJSON
    >(EstimateGasPriceOperation),
  };
  public readonly wallets = {
    /**
     * @description Get Coin Balances by wallet addresses
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Object[]} request.ownerAddresses The addresses of the owners to get coin balances for
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String[]} [request.coinTypeHashBlacklist] The coin type hashes of the coins to whitelist (optional)
     * @param {String[]} [request.coinTypeHashWhitelist] The coin type hashes of the coins to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getCoinBalancesByWallets: this.createEndpoint<
      GetCoinBalancesByWalletsOperationRequest,
      GetCoinBalancesByWalletsOperationRequestJSON,
      AptosGetCoinBalancesByWalletsResponse,
      AptosGetCoinBalancesByWalletsResponseJSON
    >(GetCoinBalancesByWalletsOperation),
    /**
     * @description Get Historical Coin Balances by wallet addresses
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Object[]} request.ownerAddresses The addresses of the owner addresses to get historical balances for
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String[]} [request.coinTypeHashBlacklist] The coin type hash of the coins to whitelist (optional)
     * @param {String[]} [request.coinTypeHashWhitelist] The coin type hash of the coins to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getHistoricalCoinBalancesByWallets: this.createEndpoint<
      GetHistoricalCoinBalancesByWalletsOperationRequest,
      GetHistoricalCoinBalancesByWalletsOperationRequestJSON,
      AptosGetHistoricalCoinBalancesByWalletsResponse,
      AptosGetHistoricalCoinBalancesByWalletsResponseJSON
    >(GetHistoricalCoinBalancesByWalletsOperation),
    /**
     * @description Get Coin Transfers by wallet addresses
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Object[]} request.ownerAddresses The addresses of the owners to get tokens for
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String} [request.fromDate] The date from which to fetch coin transfers (optional)
     * @param {String} [request.toDate] The date to which to fetch coin transfers (optional)
     * @param {String[]} [request.coinTypeBlacklist] The coin types of the coins to whitelist (optional)
     * @param {String[]} [request.coinTypeWhitelist] The coin types of the coins to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getCoinTransfersByWalletAddresses: this.createEndpoint<
      GetCoinTransfersByWalletAddressesOperationRequest,
      GetCoinTransfersByWalletAddressesOperationRequestJSON,
      AptosGetCoinTransfersByOwnerAddressesResponse,
      AptosGetCoinTransfersByOwnerAddressesResponseJSON
    >(GetCoinTransfersByWalletAddressesOperation),
    /**
     * @description Get NFTs by wallet addresses
     * @param request Request with parameters.
     * @param {Number} request.limit The number of results to return
     * @param {Object[]} request.ownerAddresses The addresses of the owners to get tokens for
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String[]} [request.collectionBlacklist] The collection data id hashes of the collections to whitelist (optional)
     * @param {String[]} [request.collectionWhitelist] The collection data id hashes of the collections to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTByOwners: this.createEndpoint<
      GetNFTByOwnersOperationRequest,
      GetNFTByOwnersOperationRequestJSON,
      AptosNFTsByOwnersResponse,
      AptosNFTsByOwnersResponseJSON
    >(GetNFTByOwnersOperation),
    /**
     * @description Get NFT Transfers by wallets
     * @param request Request with parameters.
     * @param {Number} request.limit The number of tokens to return
     * @param {Object[]} request.walletAddresses The addresses of the wallets to get transfers for
     * @param {Number} [request.offset] The number of results to skip (optional)
     * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
     * @param {String[]} [request.collectionBlacklist] The ids of the collections to whitelist (optional)
     * @param {String[]} [request.collectionWhitelist] The ids of the collections to whitelist (optional)
     * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
     * @returns {Object} Response for the request.
     */
    getWalletsNFTTransfers: this.createEndpoint<
      GetWalletsNFTTransfersOperationRequest,
      GetWalletsNFTTransfersOperationRequestJSON,
      AptosNFTTransfersByWalletsResponse,
      AptosNFTTransfersByWalletsResponseJSON
    >(GetWalletsNFTTransfersOperation),
  };
}
