import { setupServer } from 'msw/node';
import { mockEndpointWeights } from './endpoints/endpointWeights';
import { mockGetBlock } from './endpoints/getBlock';
import { mockGetContractEvents } from './endpoints/getContractEvents';
import { mockGetDateToBlock } from './endpoints/getDateToBlock';
import { mockGetContractLogs } from './endpoints/getContractLogs';
import { mockGetNativeBalance } from './endpoints/getNativeBalance';
import { mockGetPairAddress } from './endpoints/getPairAddress';
import { mockGetPairReserves } from './endpoints/getPairReserves';
import { mockGetTokenAllowance } from './endpoints/getTokenAllowance';
import { mockGetTokenMetadata } from './endpoints/getTokenMetadata';
import { mockGetTokenMetadataBySymbol } from './endpoints/getTokenMetadataBySymbol';
import { mockGetTokenPrice } from './endpoints/getTokenPrice';
import { mockGetTokenTransfers } from './endpoints/getTokenTransfers';
import { mockGetTransaction } from './endpoints/getTransaction';
import { mockGetWalletTokenTransfers } from './endpoints/getWalletTokenTransfers';
import { mockGetWalletTransactions } from './endpoints/getWalletTransactions';
import { mockResolveAddress } from './endpoints/resolveAddress';
import { mockResolveDomain } from './endpoints/resolveDomain';
import { mockRunContractFunction } from './endpoints/runContractFunction';
import { mockUploadFolder } from './endpoints/uploadFolder';
import { mockWeb3ApiVersion } from './endpoints/web3ApiVersion';

const handlers = [
  mockEndpointWeights,
  mockGetBlock,
  mockGetContractEvents,
  mockGetDateToBlock,
  mockGetContractLogs,
  mockGetNativeBalance,
  mockGetPairAddress,
  mockGetPairReserves,
  mockGetTokenAllowance,
  mockGetTokenMetadata,
  mockGetTokenMetadataBySymbol,
  mockGetTokenPrice,
  mockGetTokenTransfers,
  mockGetTransaction,
  mockGetWalletTokenTransfers,
  mockGetWalletTransactions,
  mockResolveAddress,
  mockResolveDomain,
  mockRunContractFunction,
  mockUploadFolder,
  mockWeb3ApiVersion,
];

export const mockServer = setupServer(...handlers);
