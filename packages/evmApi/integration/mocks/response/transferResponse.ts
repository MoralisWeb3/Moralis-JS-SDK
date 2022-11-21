export const createTransferResponse = (
  transaction_hash: string,
  address: string,
  blockTimestamp: string,
  blockNumber: string,
  blockHash: string,
  fromAddress: string,
  toAddress: string,
  value: string,
) => ({
  transaction_hash,
  address,
  block_timestamp: blockTimestamp,
  block_number: blockNumber,
  block_hash: blockHash,
  from_address: fromAddress,
  to_address: toAddress,
  value,
});
