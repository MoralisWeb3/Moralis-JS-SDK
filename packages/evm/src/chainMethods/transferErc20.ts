import { Erc20Value, Erc20Valueish, EvmAddress, EvmAddressish, EvmChainish } from '@moralisweb3/core';
import { ethers } from 'ethers';
import { assertProvider } from '../assert/assertProvider';
import { Erc20__factory } from '../Contract';
import { wrapEthersTransactionResponse } from '../utils/wrapEthersTransactionResponse';

export interface TransferErc20Options {
  contract: EvmAddressish;
  to: EvmAddressish;
  value: Erc20Valueish;
  chain?: EvmChainish;
}

export const makeTransferErc20 =
  (_provider: null | ethers.providers.JsonRpcSigner, _chain: EvmChainish | null) =>
  async (options: TransferErc20Options) => {
    const provider = assertProvider(_provider);

    const contractAddress = EvmAddress.create(options.contract);
    const toAddress = EvmAddress.create(options.to);
    const value = Erc20Value.create(options.value).value;

    const token = Erc20__factory.connect(contractAddress.checksum, provider);

    const response = await token.transfer(toAddress.checksum, value);

    return wrapEthersTransactionResponse(response, _chain);
  };
