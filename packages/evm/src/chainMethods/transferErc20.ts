import { Erc20Value, Erc20Valueish, EvmAddress, EvmAddressish, EvmChainish } from '@moralisweb3/core';
import { ethers } from 'ethers';
import { assertChain, assertChainEquality } from '../assert/assertChain';
import { assertProvider } from '../assert/assertProvider';
import { Erc20__factory } from '../Contract';
import { wrapEthersTransactionResponse } from '../utils/wrapEthersTransactionResponse';

export interface TransferErc20Options {
  contractAddress: EvmAddressish;
  to: EvmAddressish;
  value: Erc20Valueish;
  chain?: EvmChainish;
}

export const makeTransferErc20 =
  (_provider: null | ethers.providers.JsonRpcSigner, _chain: EvmChainish | null) =>
  async (options: TransferErc20Options) => {
    const provider = assertProvider(_provider);

    const chain = assertChain(_chain, 'Chain is not set on MoralisEvm. Make sure to be properly connected');
    if (options.chain) {
      assertChainEquality(options.chain, chain);
    }

    const contractAddress = EvmAddress.create(options.contractAddress);
    const toAddress = EvmAddress.create(options.to);
    const value = Erc20Value.create(options.value).value;

    const token = Erc20__factory.connect(contractAddress.checksum, provider);

    const response = await token.transfer(toAddress.checksum, value);

    return wrapEthersTransactionResponse(response, _chain);
  };
