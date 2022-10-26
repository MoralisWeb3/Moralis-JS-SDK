import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmTransaction, EvmTransactionish } from '../EvmTransaction';

/**
 * This can be any object with valid block data.
 * @example
 * ```
 * const input = {
 *    chain: 1,
 *    hash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171',
 *    number: '12386788',
 *    timestamp: '2021-05-07T11:08:35.000Z',
 *  }
 * ```
 */
export interface EvmSimpleBlockInput {
  timestamp: DateInput;
  number: BigNumberish;
  hash: string;
  chain: EvmChainish;
}

/**
 * This is the return type of the processed EVM Block
 */
export interface EvmSimpleBlockData {
  timestamp: Date;
  number: BigNumber;
  hash: string;
  chain: EvmChain;
}

/**
 * This can be any object with valid block data.
 * @example
 * ```
 * const input = {
 *    chain: 1,
 *    hash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171',
 *    difficulty: '7253857437305950',
 *    extraData: '0xd883010a01846765746888676f312e31352e31856c696e7578',
 *    gasLimit: '14977947',
 *    gasUsed: '14964688',
 *    logsBloom:
        '0xdde5fc46c5d8bcbd58207bc9f267bf43298e23791a326ff02661e99790da9996b3e0dd912c0b8202d389d282c56e4d11eb2dec4898a32b6b165f1f4cae6aa0079498eab50293f3b8defbf6af11bb75f0408a563ddfc26a3323d1ff5f9849e95d5f034d88a757ddea032c75c00708c9ff34d2207f997cc7d93fd1fa160a6bfaf62a54e31f9fe67ab95752106ba9d185bfdc9b6dc3e17427f844ee74e5c09b17b83ad6e8fc7360f5c7c3e4e1939e77a6374bee57d1fa6b2322b11ad56ad0398302de9b26d6fbfe414aa416bff141fad9d4af6aea19322e47595e342cd377403f417dfd396ab5f151095a5535f51cbc34a40ce9648927b7d1d72ab9daf253e31daf',
 *    miner: '0xea674fdde714fd979de3edf0f56aa9716b898ec8',
 *    nonce: '0xedeb2d8fd2b2bdec',
 *    number: '12386788',
 *    parentHash: '0x011d1fc45839de975cc55d758943f9f1d204f80a90eb631f3bf064b80d53e045',
 *    receiptsRoot: '0x7cf43d7e837284f036cf92c56973f5e27bdd253ca46168fa195a6b07fa719f23',
 *    sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
 *    size: '61271',
 *    stateRoot: '0x49e3bfe7b618e27fde8fa08884803a8458b502c6534af69873a3cc926a7c724b',
 *    timestamp: '2021-05-07T11:08:35.000Z',
 *    totalDifficulty: '7253857437305950',
 *    transactionsRoot: '0xe4c7bf3aff7ad07f9e80d57f7189f0252592fee6321c2a9bd9b09b6ce0690d27',
 *    transactionCount: '252',
 *    transactions: [],
 *  }
 * ```
 */
export interface EvmBlockInput extends EvmSimpleBlockInput {
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: EvmAddressish;
  difficulty: BigNumberish;
  totalDifficulty: BigNumberish;
  size: BigNumberish;
  extraData: string;
  gasLimit: BigNumberish;
  gasUsed: BigNumberish;
  transactionCount: number | string;
  transactions: EvmTransactionish[];
}

/**
 * This is the return type of the processed EVM transaction
 */
export interface EvmBlockData extends EvmSimpleBlockData {
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: EvmAddress;
  difficulty: BigNumber;
  totalDifficulty: BigNumber;
  size: BigNumber;
  extraData: string;
  gasLimit: BigNumber;
  gasUsed: BigNumber;
  transactionCount: number;
  transactions: EvmTransaction[];
}
