// import { operations } from '../../generated/types';

// type operation = 'getLogsByAddress';

// type QueryParams = operations[operation]['parameters']['query'];
// type PathParams = operations[operation]['parameters']['path'];
// type ApiParams = QueryParams & PathParams;
// TODO: always extend ApiParams?
// interface Params extends ApiParams {}

export const getLogsByAddressResolver = null;
// type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

// export const getLogsByAddressResolver = new EvmResolver<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>({
//   getPath: (params: ApiParams) => `block/${params.block_number_or_hash}`,
//   apiToResult: (apiData: ApiResult) => {
//     const data = toCamelCase(apiData);

//     return {
//       ...data,
//       miner: new EvmAddress(data.miner),
//       transactions: data.transactions.map((transaction) => ({
//         ...transaction,
//         fromAddress: new EvmAddress(transaction.fromAddress),
//         toAddress: new EvmAddress(transaction.toAddress),
//         receiptContractAddress: transaction.receiptContractAddress
//           ? new EvmAddress(transaction.receiptContractAddress)
//           : null,
//         logs: transaction.logs.map((log) => ({
//           ...log,
//           address: new EvmAddress(log.address),
//         })),
//       })),
//     };
//   },
//   resultToJson: (data) => data,
//   parseParams: (params) => params,
// });
