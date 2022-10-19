import { EvmStreamResultData } from './types';

export class EvmStreamResultFormatter {
  static toJSON(data: EvmStreamResultData) {
    return {
      ...data,
      erc20Transfers: data.erc20Transfers.map((value) => value.toJSON()),
      erc20Approvals: data.erc20Approvals.map((value) => value.toJSON()),
      nftTransfers: data.nftTransfers.map((value) => value.toJSON()),
      nftApprovals: {
        ERC721: data.nftApprovals.ERC721.map((value) => value.toJSON()),
        ERC1155: data.nftApprovals.ERC1155.map((value) => value.toJSON()),
      },
      chain: data.chain.format(),
      block: data.block.toJSON(),
      logs: data.logs.map((value) => value.toJSON()),
      txs: data.txs.map((value) => value.toJSON()),
      txsInternal: data.txsInternal.map((value) => value.toJSON()),
      abi: data.abi,
    };
  }
}
