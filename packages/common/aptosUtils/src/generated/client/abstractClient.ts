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
import { EstimateGasPriceOperation, EstimateGasPriceOperationRequest, EstimateGasPriceOperationRequestJSON } from '../operations/EstimateGasPriceOperation';
import { AptosEstimateGasPriceResult, AptosEstimateGasPriceResultJSON } from '../types/AptosEstimateGasPriceResult';

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
    getAccount: this.createEndpoint<
      GetAccountOperationRequest
      , GetAccountOperationRequestJSON
      , AptosGetAccountResponse
      , AptosGetAccountResponseJSON
    >(GetAccountOperation),
    getAccountResources: this.createEndpoint<
      GetAccountResourcesOperationRequest
      , GetAccountResourcesOperationRequestJSON
      , AptosGetAccountResourceResponse[]
      , AptosGetAccountResourceResponseJSON[]
    >(GetAccountResourcesOperation),
    getAccountModules: this.createEndpoint<
      GetAccountModulesOperationRequest
      , GetAccountModulesOperationRequestJSON
      , AptosGetAccountModuleResponse[]
      , AptosGetAccountModuleResponseJSON[]
    >(GetAccountModulesOperation),
    getAccountResource: this.createEndpoint<
      GetAccountResourceOperationRequest
      , GetAccountResourceOperationRequestJSON
      , AptosGetAccountResourceResponse
      , AptosGetAccountResourceResponseJSON
    >(GetAccountResourceOperation),
    getAccountModule: this.createEndpoint<
      GetAccountModuleOperationRequest
      , GetAccountModuleOperationRequestJSON
      , AptosGetAccountModuleResponse
      , AptosGetAccountModuleResponseJSON
    >(GetAccountModuleOperation),
    getEventsByCreationNumber: this.createEndpoint<
      GetEventsByCreationNumberOperationRequest
      , GetEventsByCreationNumberOperationRequestJSON
      , AptosGetEventsByCreationNumberResponse[]
      , AptosGetEventsByCreationNumberResponseJSON[]
    >(GetEventsByCreationNumberOperation),
    getEventsByEventHandle: this.createEndpoint<
      GetEventsByEventHandleOperationRequest
      , GetEventsByEventHandleOperationRequestJSON
      , AptosGetEventsByEventHandleResponse[]
      , AptosGetEventsByEventHandleResponseJSON[]
    >(GetEventsByEventHandleOperation),
  };
  public readonly coins = {
    getCoinInfoByCoinTypeHashes: this.createEndpoint<
      GetCoinInfoByCoinTypeHashesOperationRequest
      , GetCoinInfoByCoinTypeHashesOperationRequestJSON
      , AptosCoinInfoDto[]
      , AptosCoinInfoDtoJSON[]
    >(GetCoinInfoByCoinTypeHashesOperation),
    getLatestCoins: this.createEndpoint<
      GetLatestCoinsOperationRequest
      , GetLatestCoinsOperationRequestJSON
      , AptosGetLatestCoinsResponse
      , AptosGetLatestCoinsResponseJSON
    >(GetLatestCoinsOperation),
    getCoinsByNameRange: this.createEndpoint<
      GetCoinsByNameRangeOperationRequest
      , GetCoinsByNameRangeOperationRequestJSON
      , AptosGetCoinsByNameRangeResponse
      , AptosGetCoinsByNameRangeResponseJSON
    >(GetCoinsByNameRangeOperation),
    getCoinsBySymbolRange: this.createEndpoint<
      GetCoinsBySymbolRangeOperationRequest
      , GetCoinsBySymbolRangeOperationRequestJSON
      , AptosGetCoinsBySymbolRangeResponse
      , AptosGetCoinsBySymbolRangeResponseJSON
    >(GetCoinsBySymbolRangeOperation),
    getCoinsByCreators: this.createEndpoint<
      GetCoinsByCreatorsOperationRequest
      , GetCoinsByCreatorsOperationRequestJSON
      , AptosGetCoinsByCreatorsResponse
      , AptosGetCoinsByCreatorsResponseJSON
    >(GetCoinsByCreatorsOperation),
    getCoinTransfersByOwnerAddresses: this.createEndpoint<
      GetCoinTransfersByOwnerAddressesOperationRequest
      , GetCoinTransfersByOwnerAddressesOperationRequestJSON
      , AptosGetCoinTransfersByOwnerAddressesResponse
      , AptosGetCoinTransfersByOwnerAddressesResponseJSON
    >(GetCoinTransfersByOwnerAddressesOperation),
    getCoinTransfersByBlockHeights: this.createEndpoint<
      GetCoinTransfersByBlockHeightsOperationRequest
      , GetCoinTransfersByBlockHeightsOperationRequestJSON
      , AptosGetCoinTransfersByBlockHeightsResponse
      , AptosGetCoinTransfersByBlockHeightsResponseJSON
    >(GetCoinTransfersByBlockHeightsOperation),
    getCoinTransfersByCoinType: this.createEndpoint<
      GetCoinTransfersByCoinTypeOperationRequest
      , GetCoinTransfersByCoinTypeOperationRequestJSON
      , AptosGetCoinTransfersByCoinTypeResponse
      , AptosGetCoinTransfersByCoinTypeResponseJSON
    >(GetCoinTransfersByCoinTypeOperation),
    getTopHoldersByCoin: this.createEndpoint<
      GetTopHoldersByCoinOperationRequest
      , GetTopHoldersByCoinOperationRequestJSON
      , AptosGetTopHoldersByCoinResponse
      , AptosGetTopHoldersByCoinResponseJSON
    >(GetTopHoldersByCoinOperation),
  };
  public readonly collections = {
    getNFTCollections: this.createEndpoint<
      GetNFTCollectionsOperationRequest
      , GetNFTCollectionsOperationRequestJSON
      , AptosNFTCollectionsByNameRangeResponse
      , AptosNFTCollectionsByNameRangeResponseJSON
    >(GetNFTCollectionsOperation),
    getNFTCollectionsByIds: this.createEndpoint<
      GetNFTCollectionsByIdsOperationRequest
      , GetNFTCollectionsByIdsOperationRequestJSON
      , AptosNFTCollectionItemResponse[]
      , AptosNFTCollectionItemResponseJSON[]
    >(GetNFTCollectionsByIdsOperation),
    getNFTCollectionsByCreator: this.createEndpoint<
      GetNFTCollectionsByCreatorOperationRequest
      , GetNFTCollectionsByCreatorOperationRequestJSON
      , AptosNFTCollectionsByCreatorResponse
      , AptosNFTCollectionsByCreatorResponseJSON
    >(GetNFTCollectionsByCreatorOperation),
  };
  public readonly nfts = {
    getNFTsByIds: this.createEndpoint<
      GetNFTsByIdsOperationRequest
      , GetNFTsByIdsOperationRequestJSON
      , AptosNFTTokenResponse[]
      , AptosNFTTokenResponseJSON[]
    >(GetNFTsByIdsOperation),
    getNFTsByCollection: this.createEndpoint<
      GetNFTsByCollectionOperationRequest
      , GetNFTsByCollectionOperationRequestJSON
      , AptosNFTTokensByCollectionResponse
      , AptosNFTTokensByCollectionResponseJSON
    >(GetNFTsByCollectionOperation),
    getNFTsByCreators: this.createEndpoint<
      GetNFTsByCreatorsOperationRequest
      , GetNFTsByCreatorsOperationRequestJSON
      , AptosNFTTokensByCreatorsResponse
      , AptosNFTTokensByCreatorsResponseJSON
    >(GetNFTsByCreatorsOperation),
    getNFTOwnersByTokens: this.createEndpoint<
      GetNFTOwnersByTokensOperationRequest
      , GetNFTOwnersByTokensOperationRequestJSON
      , AptosNFTOwnersByTokensResponse
      , AptosNFTOwnersByTokensResponseJSON
    >(GetNFTOwnersByTokensOperation),
    getNFTOwnersByCollection: this.createEndpoint<
      GetNFTOwnersByCollectionOperationRequest
      , GetNFTOwnersByCollectionOperationRequestJSON
      , AptosNFTOwnersByCollectionResponse
      , AptosNFTOwnersByCollectionResponseJSON
    >(GetNFTOwnersByCollectionOperation),
    getNFTOwnersOfCollection: this.createEndpoint<
      GetNFTOwnersOfCollectionOperationRequest
      , GetNFTOwnersOfCollectionOperationRequestJSON
      , AptosNFTOwnersOfCollectionResponse
      , AptosNFTOwnersOfCollectionResponseJSON
    >(GetNFTOwnersOfCollectionOperation),
    getNFTTransfersByIds: this.createEndpoint<
      GetNFTTransfersByIdsOperationRequest
      , GetNFTTransfersByIdsOperationRequestJSON
      , AptosNFTTransfersByTokensResponse[]
      , AptosNFTTransfersByTokensResponseJSON[]
    >(GetNFTTransfersByIdsOperation),
    getNFTTransfersByCollection: this.createEndpoint<
      GetNFTTransfersByCollectionOperationRequest
      , GetNFTTransfersByCollectionOperationRequestJSON
      , AptosGetNFTTransfersByCollectionResponse
      , AptosGetNFTTransfersByCollectionResponseJSON
    >(GetNFTTransfersByCollectionOperation),
    getNFTTransfersByCreators: this.createEndpoint<
      GetNFTTransfersByCreatorsOperationRequest
      , GetNFTTransfersByCreatorsOperationRequestJSON
      , AptosGetNFTTransfersByCreatorsResponse
      , AptosGetNFTTransfersByCreatorsResponseJSON
    >(GetNFTTransfersByCreatorsOperation),
    getNFTTransfersByWallets: this.createEndpoint<
      GetNFTTransfersByWalletsOperationRequest
      , GetNFTTransfersByWalletsOperationRequestJSON
      , AptosNFTTransfersByWalletsResponse
      , AptosNFTTransfersByWalletsResponseJSON
    >(GetNFTTransfersByWalletsOperation),
  };
  public readonly transactions = {
    estimateGasPrice: this.createEndpoint<
      EstimateGasPriceOperationRequest
      , EstimateGasPriceOperationRequestJSON
      , AptosEstimateGasPriceResult
      , AptosEstimateGasPriceResultJSON
    >(EstimateGasPriceOperation),
  };
  public readonly wallets = {
    getCoinBalancesByWallets: this.createEndpoint<
      GetCoinBalancesByWalletsOperationRequest
      , GetCoinBalancesByWalletsOperationRequestJSON
      , AptosGetCoinBalancesByWalletsResponse
      , AptosGetCoinBalancesByWalletsResponseJSON
    >(GetCoinBalancesByWalletsOperation),
    getHistoricalCoinBalancesByWallets: this.createEndpoint<
      GetHistoricalCoinBalancesByWalletsOperationRequest
      , GetHistoricalCoinBalancesByWalletsOperationRequestJSON
      , AptosGetHistoricalCoinBalancesByWalletsResponse
      , AptosGetHistoricalCoinBalancesByWalletsResponseJSON
    >(GetHistoricalCoinBalancesByWalletsOperation),
    getCoinTransfersByWalletAddresses: this.createEndpoint<
      GetCoinTransfersByWalletAddressesOperationRequest
      , GetCoinTransfersByWalletAddressesOperationRequestJSON
      , AptosGetCoinTransfersByOwnerAddressesResponse
      , AptosGetCoinTransfersByOwnerAddressesResponseJSON
    >(GetCoinTransfersByWalletAddressesOperation),
    getNFTByOwners: this.createEndpoint<
      GetNFTByOwnersOperationRequest
      , GetNFTByOwnersOperationRequestJSON
      , AptosNFTsByOwnersResponse
      , AptosNFTsByOwnersResponseJSON
    >(GetNFTByOwnersOperation),
    getWalletsNFTTransfers: this.createEndpoint<
      GetWalletsNFTTransfersOperationRequest
      , GetWalletsNFTTransfersOperationRequestJSON
      , AptosNFTTransfersByWalletsResponse
      , AptosNFTTransfersByWalletsResponseJSON
    >(GetWalletsNFTTransfersOperation),
  };
}
