import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';

/**
 * Valid EvmTransactionLog input.
 *
 * @example
 * ```ts
 * const input = {
 *  address: "0x3105d328c66d8d55092358cf595d54608178e9b5",
 *  data: "0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443",
 *  topics: ["0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a", "0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391", null, null],
 *  transactionHash: "0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5",
 *  logIndex: "273",
 *  transactionIndex: "204",\
 *  blockHash: "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171",
 *  blockNumber: "12386788",
 *  blockTimestamp: "2021-05-07T11:08:35.000Z",
 *  transactionIndex: "204",
 *  chain: "1"
 * }
 * ```
 */
export interface EvmTransactionLogInput {
  logIndex?: string | number;
  transactionHash: string;
  transactionIndex?: number;
  address: EvmAddressish;
  data: string;
  topics: string[];
  blockHash: string;
  blockNumber: number;
  blockTimestamp?: string;
  chain: EvmChainish;
}

/**
 * Represents a processed transaction log.
 */
export interface EvmTransactionLogData {
  logIndex?: number;
  transactionHash: string;
  transactionIndex?: number;
  address: EvmAddress;
  data: string;
  topics: string[];
  blockHash: string;
  blockNumber: number;
  blockTimestamp?: string;
  chain: EvmChain;
}
