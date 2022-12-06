import { Camelize, Core, Operation } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish } from '@moralisweb3/common-evm-utils';
import { EvmStream, StreamTrigger, StreamTriggerish } from '../../dataTypes';
import { operations } from '../openapi';

type OperationId = 'CreateStream';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface CreateStreamEvmRequest extends Camelize<Omit<RequestParams, 'chainIds' | 'triggers'>> {
  chains: EvmChainish[];
  triggers?: StreamTriggerish[];
}

export type CreateStreamEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type CreateStreamEvmJSONResponse = SuccessResponse;

export type CreateStreamEvmResponse = ReturnType<typeof deserializeResponse>;

export const createStreamEvmOperation: Operation<
  CreateStreamEvmRequest,
  CreateStreamEvmJSONRequest,
  CreateStreamEvmResponse,
  CreateStreamEvmJSONResponse
> = {
  method: 'PUT',
  name: 'createStreamEvm',
  id: 'CreateStream',
  groupName: 'evmStreams',
  urlPathPattern: '/streams/evm',
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
    'demo',
    'triggers',
  ],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams() {
  return {};
}

function getRequestBody(request: CreateStreamEvmRequest, core: Core) {
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
    demo: request.demo,
    triggers: request.triggers?.map((trigger) => StreamTrigger.create(trigger, core).format()),
  };
}

function deserializeResponse(jsonResponse: CreateStreamEvmJSONResponse, request: CreateStreamEvmRequest, core: Core) {
  return EvmStream.create(jsonResponse, core);
}

function serializeRequest(request: CreateStreamEvmRequest, core: Core) {
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
    demo: request.demo,
    triggers: request.triggers?.map((trigger) => StreamTrigger.create(trigger, core).format()),
  };
}

function deserializeRequest(jsonRequest: CreateStreamEvmJSONRequest, core: Core): CreateStreamEvmRequest {
  return {
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
    demo: jsonRequest.demo,
    triggers: jsonRequest.triggers?.map((trigger) => StreamTrigger.create(trigger, core)),
  };
}
