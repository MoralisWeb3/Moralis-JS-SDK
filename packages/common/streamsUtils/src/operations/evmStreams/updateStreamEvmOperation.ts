import { Camelize, Core, Operation } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish } from '@moralisweb3/common-evm-utils';
import { EvmStream } from '../../dataTypes';
import { operations } from '../openapi';

type OperationId = 'UpdateStream';

type PathParams = operations[OperationId]['parameters']['path'];
type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = PathParams & BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface UpdateStreamEvmRequest extends Camelize<Omit<RequestParams, 'chainIds'>> {
  chains: EvmChainish[];
}

export type UpdateStreamEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type UpdateStreamEvmJSONResponse = SuccessResponse;

export type UpdateStreamEvmResponse = ReturnType<typeof deserializeResponse>;

export const updateStreamEvmOperation: Operation<
  UpdateStreamEvmRequest,
  UpdateStreamEvmJSONRequest,
  UpdateStreamEvmResponse,
  UpdateStreamEvmJSONResponse
> = {
  method: 'POST',
  name: 'updateStreamEvm',
  id: 'UpdateStream',
  groupName: 'evmStreams',
  urlPathParamNames: ['id'],
  urlPathPattern: '/streams/evm/{id}',
  bodyParamNames: [
    'webhookUrl',
    'description',
    'tag',
    'topic0',
    'allAddresses',
    'includeNativeTxs',
    'includeContractLogs',
    'includeInternalTxs',
    'chains',
    'abi',
    'advancedOptions',
  ],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: UpdateStreamEvmRequest) {
  return {
    id: request.id,
  };
}

function getRequestBody(request: UpdateStreamEvmRequest, core: Core) {
  return {
    webhookUrl: request.webhookUrl,
    description: request.description,
    tag: request.tag,
    topic0: request.topic0,
    allAddresses: request.allAddresses,
    includeNativeTxs: request.includeNativeTxs,
    includeContractLogs: request.includeContractLogs,
    includeInternalTxs: request.includeInternalTxs,
    chainIds: request.chains.map((chain) => EvmChain.create(chain, core).apiHex),
    abi: request.abi,
    advancedOptions: request.advancedOptions,
  };
}

function deserializeResponse(jsonResponse: UpdateStreamEvmJSONResponse, request: UpdateStreamEvmRequest, core: Core) {
  return EvmStream.create(jsonResponse, core);
}

function serializeRequest(request: UpdateStreamEvmRequest, core: Core) {
  return {
    id: request.id,
    webhookUrl: request.webhookUrl,
    description: request.description,
    tag: request.tag,
    topic0: request.topic0,
    allAddresses: request.allAddresses,
    includeNativeTxs: request.includeNativeTxs,
    includeContractLogs: request.includeContractLogs,
    includeInternalTxs: request.includeInternalTxs,
    chainIds: request.chains.map((chain) => EvmChain.create(chain, core).apiHex),
    abi: request.abi,
    advancedOptions: request.advancedOptions,
  };
}

function deserializeRequest(jsonRequest: UpdateStreamEvmJSONRequest, core: Core): UpdateStreamEvmRequest {
  return {
    id: jsonRequest.id,
    webhookUrl: jsonRequest.webhookUrl,
    description: jsonRequest.description,
    tag: jsonRequest.tag,
    topic0: jsonRequest.topic0,
    allAddresses: jsonRequest.allAddresses,
    includeNativeTxs: jsonRequest.includeNativeTxs,
    includeContractLogs: jsonRequest.includeContractLogs,
    includeInternalTxs: jsonRequest.includeInternalTxs,
    chains: jsonRequest.chainIds.map((chainId) => EvmChain.create(chainId, core)),
    abi: jsonRequest.abi,
    advancedOptions: jsonRequest.advancedOptions,
  };
}
