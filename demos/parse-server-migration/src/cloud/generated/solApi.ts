/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Moralis from 'moralis'
import { MoralisError, Operation } from '@moralisweb3/common-core';
import { handleRateLimit } from '../../rateLimit';
import { upgradeRequest } from '../upgradeRequest'
import { AxiosError } from 'axios';
import { operations } from '@moralisweb3/common-sol-utils';
declare const Parse: any;

function getErrorMessage(error: Error, name: string) {
  // Resolve Axios data inside the MoralisError
  if (
    error instanceof MoralisError &&
    error.cause &&
    error.cause instanceof AxiosError &&
    error.cause.response &&
    error.cause.response.data
  ) {
    return JSON.stringify(error.cause.response.data);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return `API error while calling ${name}`
}

function getOperation(operationName: string): Operation<unknown, unknown, unknown, unknown> {
  const operation = operations.find((o) => o.name === operationName);
  if (!operation) {
    throw new Error(`Not supported operation ${operationName}`);
  }
  return operation as Operation<unknown, unknown, unknown, unknown>;
}

async function beforeApiRequest(user: any, ip: any, name: string) {
  if (!(await handleRateLimit(user, ip))) {
    throw new Error(
      `Too many requests to ${name} API from this particular client, the clients needs to wait before sending more requests.`
    );
  }
}


const balanceOperation = getOperation('getBalance');
Parse.Cloud.define("sol-balance", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'balance');
    const request = upgradeRequest(params, balanceOperation);
    const result = await Moralis.SolApi.account.getBalance(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-balance'));
  }
})


const getSPLOperation = getOperation('getSPL');
Parse.Cloud.define("sol-getSPL", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getSPL');
    const request = upgradeRequest(params, getSPLOperation);
    const result = await Moralis.SolApi.account.getSPL(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-getSPL'));
  }
})


const getNFTsOperation = getOperation('getNFTs');
Parse.Cloud.define("sol-getNFTs", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTs');
    const request = upgradeRequest(params, getNFTsOperation);
    const result = await Moralis.SolApi.account.getNFTs(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-getNFTs'));
  }
})


const getPortfolioOperation = getOperation('getPortfolio');
Parse.Cloud.define("sol-getPortfolio", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getPortfolio');
    const request = upgradeRequest(params, getPortfolioOperation);
    const result = await Moralis.SolApi.account.getPortfolio(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-getPortfolio'));
  }
})


const getNFTMetadataOperation = getOperation('getNFTMetadata');
Parse.Cloud.define("sol-getNFTMetadata", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTMetadata');
    const request = upgradeRequest(params, getNFTMetadataOperation);
    const result = await Moralis.SolApi.nft.getNFTMetadata(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-getNFTMetadata'));
  }
})


const getTokenPriceOperation = getOperation('getTokenPrice');
Parse.Cloud.define("sol-getTokenPrice", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenPrice');
    const request = upgradeRequest(params, getTokenPriceOperation);
    const result = await Moralis.SolApi.token.getTokenPrice(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-getTokenPrice'));
  }
})

