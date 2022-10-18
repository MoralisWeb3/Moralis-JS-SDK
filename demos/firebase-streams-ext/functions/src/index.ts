import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

// Transactions

interface Transaction {
  fromAddress: string;
  toAddress: string;
  value: string;
  confirmed: boolean;
  // and more...
}

const transactionCollectionName = 'Transaction';

export const onTransactionWrite = functions.firestore
  .document(`moralis/txs/${transactionCollectionName}/{id}`)
  .onWrite(async (change) => {
    const transaction = change.after.data() as Transaction;

    if (transaction && transaction.confirmed) {
      functions.logger.log(
        `Transaction ${transaction.value} wei from ${transaction.fromAddress} to ${transaction.toAddress}`,
      );
    }
  });

// Erc20 Transfers

interface Erc20TransferEvent {
  from: string;
  to: string;
  value: string;
  confirmed: boolean;
  // and more...
}

const erc20TransferCollectionName = 'Erc20Transfer';

export const onErc20TransferWrite = functions.firestore
  .document(`moralis/events/${erc20TransferCollectionName}/{id}`)
  .onWrite(async (change) => {
    const transfer = change.after.data() as Erc20TransferEvent;

    if (transfer && transfer.confirmed) {
      functions.logger.log(`Erc20 transfer ${transfer.value} from ${transfer.from} to ${transfer.to}`);
    }
  });
