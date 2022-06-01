import { EvmAddress, EvmAddressish, EvmChainish } from '@moralisweb3/core';
import { BigNumberish, ethers } from 'ethers';
import { assertAddress } from '../assert/assertAddress';
import { assertProvider } from '../assert/assertProvider';
import { Erc721__factory } from '../Contract';
import { wrapEthersTransactionResponse } from '../utils/wrapEthersTransactionResponse';

export interface TransferErc721Options {
  contract: EvmAddressish;
  to: EvmAddressish;
  tokenId: BigNumberish;
  chain?: EvmChainish;
}

export const makeTransferErc721 =
  (_provider: null | ethers.providers.JsonRpcSigner, _account: EvmAddress | null, _chain: EvmChainish | null) =>
  async (options: TransferErc721Options) => {
    const provider = assertProvider(_provider);
    const fromAddress = assertAddress(_account, 'No account is connected');

    // TODO: validate that provided chain is current chain

    const contractAddress = EvmAddress.create(options.contract);
    const toAddress = EvmAddress.create(options.to);
    const tokenId = options.tokenId;

    const token = Erc721__factory.connect(contractAddress.checksum, provider);

    const response = await token['safeTransferFrom(address,address,uint256)'](
      fromAddress.checksum,
      toAddress.checksum,
      tokenId,
    );

    return wrapEthersTransactionResponse(response, _chain);
  };
