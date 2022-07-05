import { EvmAddress, EvmAddressish, EvmChainish } from '@moralisweb3/core';
import { BigNumber, BigNumberish, BytesLike, ethers } from 'ethers';
import { assertAddress } from '../assert/assertAddress';
import { assertChain, assertChainEquality } from '../assert/assertChain';
import { assertProvider } from '../assert/assertProvider';
import { Erc1155__factory } from '../Contract';
import { wrapEthersTransactionResponse } from '../utils/wrapEthersTransactionResponse';

export interface TransferErc1155Options {
  contractAddress: EvmAddressish;
  to: EvmAddressish;
  tokenId: BigNumberish;
  value: BigNumberish;
  data?: BytesLike;
  chain?: EvmChainish;
}

export const makeTransferErc1155 =
  (_provider: null | ethers.providers.JsonRpcSigner, _account: EvmAddress | null, _chain: EvmChainish | null) =>
  async (options: TransferErc1155Options) => {
    const provider = assertProvider(_provider);
    const fromAddress = assertAddress(_account, 'No account is connected');
    const chain = assertChain(_chain, 'Chain is not set on MoralisEvm. Make sure to be properly connected');

    if (options.chain) {
      assertChainEquality(options.chain, chain);
    }

    const contractAddress = EvmAddress.create(options.contractAddress);
    const toAddress = EvmAddress.create(options.to);
    const { tokenId } = options;
    const value = BigNumber.from(options.value);
    const data = options.data ?? [];

    const token = Erc1155__factory.connect(contractAddress.checksum, provider);

    const response = await token.safeTransferFrom(fromAddress.checksum, toAddress.checksum, tokenId, value, data);

    return wrapEthersTransactionResponse(response, chain);
  };
