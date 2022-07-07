import { EvmAddress, EvmAddressish, EvmChainish } from '@moralisweb3/core';
import { BigNumberish, ethers } from 'ethers';
import { assertAddress } from '../assert/assertAddress';
import { assertChain, assertChainEquality } from '../assert/assertChain';
import { assertProvider } from '../assert/assertProvider';
import { Erc721__factory } from '../Contract';
import { wrapEthersTransactionResponse } from '../utils/wrapEthersTransactionResponse';

export interface TransferErc721Options {
  contractAddress: EvmAddressish;
  to: EvmAddressish;
  tokenId: BigNumberish;
  chain?: EvmChainish;
}

export const makeTransferErc721 =
  (_provider: null | ethers.providers.JsonRpcSigner, _account: EvmAddress | null, _chain: EvmChainish | null) =>
  async (options: TransferErc721Options) => {
    const provider = assertProvider(_provider);
    const fromAddress = assertAddress(_account, 'No account is connected');

    const chain = assertChain(_chain, 'Chain is not set on MoralisEvm. Make sure to be properly connected');
    if (options.chain) {
      assertChainEquality(options.chain, chain);
    }

    const contractAddress = EvmAddress.create(options.contractAddress);
    const toAddress = EvmAddress.create(options.to);
    const tokenId = options.tokenId;

    const token = Erc721__factory.connect(contractAddress.checksum, provider);

    const response = await token['safeTransferFrom(address,address,uint256)'](
      fromAddress.checksum,
      toAddress.checksum,
      tokenId,
    );

    return wrapEthersTransactionResponse(response, chain);
  };
