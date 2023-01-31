import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { applicationDefault } from 'firebase-admin/app';
import { Telegraf, Context } from 'telegraf';

import Moralis from 'moralis';
import { EvmAddress } from '@moralisweb3/common-evm-utils';
import { PaginatedResponseAdapter } from '@moralisweb3/common-core';
import { EvmStream, EvmStreamJSON, EvmStreamResult, StreamTriggerInput } from '@moralisweb3/common-streams-utils';

const erc20BalanceABI = (selectorName: string) => ({
  constant: true,
  inputs: [
    {
      name: 'owner',
      type: 'address',
    },
  ],
  name: 'balanceOf',
  outputs: [
    {
      name: `$${selectorName}Balance`,
      type: 'uint256',
    },
  ],
  payable: false,
  stateMutability: 'view',
  type: 'function',
});
const getBalanceTrigger: (selectorName: string) => StreamTriggerInput = (selectorName: string) => ({
  type: 'erc20transfer',
  contractAddress: '$contract',
  functionAbi: erc20BalanceABI,
  inputs: [`$${selectorName}`],
});
const TRIGGERS: StreamTriggerInput[] = [getBalanceTrigger('from'), getBalanceTrigger('to')];
const STREAM_CONFIG = {
  webhookUrl:
    process.env.NODE_ENV === 'production'
      ? `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/streamWebhook`
      : '<NGROK_URL>/streamWebhook',
  description: 'Wallet monitor stream',
  tag: 'wallet monitor',
  chains: ['0x1', '0x89', '0x38'],
  topic0: null,
  allAddresses: false,
  includeNativeTxs: true,
  includeContractLogs: true,
  includeInternalTxs: true,
  triggers: TRIGGERS,
  abi: null,
  advancedOptions: null,
};

admin.initializeApp({
  credential: applicationDefault(),
  databaseURL:
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
      : process.env.FIRESTORE_EMULATOR_HOST,
  projectId: process.env.GCLOUD_PROJECT,
});

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '');
bot.catch(async (err, ctx) => {
  functions.logger.error('[Bot] Error', err);
  // @ts-ignore
  await ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

// initialize the bot commands
const defaultHandler = (ctx: Context) =>
  ctx.reply(`
Hello! I am the Watchtower monitor bot.
I will send you a message when any of your registered wallets is involved in any transaction.

To register a wallet, send me a message with the following format:
"/add <wallet>"

And to remove a wallet, with this one:
"/remove <wallet>"

Examples:
"/add 0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
"/remove 0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
`);
bot.command('/start', defaultHandler);
bot.command('/help', defaultHandler);

async function getAllStreams() {
  const network = 'evm';
  const limit = 10;
  let cursor: string | undefined;
  const streams: EvmStream[] = [];
  do {
    // @ts-ignore
    const pageStreams: PaginatedResponseAdapter<EvmStream[], EvmStreamJSON[]> = await Moralis.Streams.getAll({
      networkType: network,
      limit,
      cursor,
    });

    streams.push(...pageStreams.result);
    cursor = pageStreams.pagination.cursor;
  } while (cursor);

  return streams;
}

bot.command('/add', async (ctx) => {
  const messageText = ctx.update.message.text;
  const addressString = messageText.replace('/add ', '');
  if (!addressString) {
    ctx.reply('Please provide a wallet address using this message format: "/add <wallet>"');
    return;
  }

  let address: EvmAddress;
  try {
    address = EvmAddress.create(addressString);
  } catch (err) {
    functions.logger.error('[Bot] Error', err);
    ctx.reply('Invalid address. Please, use this message format "/add <wallet>"');
    return;
  }

  let monitorStream: EvmStream;
  try {
    functions.logger.log(`Validating stream is already created`, { structuredData: true });

    const streams: EvmStream[] = await getAllStreams();
    const watchTowerStreamIndex = streams.findIndex((s) => s.description === STREAM_CONFIG.description);

    if (watchTowerStreamIndex < 0) {
      functions.logger.log('Creating monitor stream', { structuredData: true });
      const creation = await Moralis.Streams.add(STREAM_CONFIG);
      monitorStream = creation.result;
      functions.logger.log('Created monitor stream', { structuredData: true });
    } else {
      functions.logger.log('Monitor stream already in existence', { structuredData: true });
      monitorStream = streams[watchTowerStreamIndex];
    }
  } catch (err) {
    functions.logger.error('[Bot] Error', err);
    ctx.reply('Ups. Something went wrong while getting the stream. Check logs for any errors.');
    return;
  }

  try {
    functions.logger.log(`Adding address to the monitor stream`, { structuredData: true });
    await Moralis.Streams.addAddress({
      id: monitorStream.id,
      address: address.checksum,
    });

    functions.logger.log(`Adding chatId to notify user`, { structuredData: true });
    const addressDoc = await admin.firestore().collection('addresses').doc(address.checksum).get();
    const telegramIds = addressDoc.get('telegramIds') || [];
    telegramIds.push(ctx.update.message.chat.id);
    await admin.firestore().collection('addresses').doc(address.checksum).set({ telegramIds });

    ctx.reply(`Monitoring ${address.checksum}. Next time you receive a transaction involving it, I will notify you.`);
  } catch (err) {
    functions.logger.error('[Bot] Error', err);
    ctx.reply('Ups. Something went wrong while adding that address. Check logs for any errors.');
  }
});

bot.command('/remove', async (ctx) => {
  const messageText = ctx.update.message.text;
  const addressString = messageText.replace('/remove ', '');
  if (!addressString) {
    ctx.reply('Please provide a wallet address using this message format: "/remove <wallet>"');
    return;
  }

  let address: EvmAddress;
  try {
    address = EvmAddress.create(addressString);
  } catch (err) {
    functions.logger.error('[Bot] Error', err);
    ctx.reply('Invalid address. Please, use this message format "/remove <wallet>"');
    return;
  }

  let monitorStream: EvmStream;
  try {
    functions.logger.log(`Getting monitor stream`, { structuredData: true });
    const streams: EvmStream[] = await getAllStreams();
    const watchTowerStreamIndex = streams.findIndex((s) => s.description === STREAM_CONFIG.description);
    if (watchTowerStreamIndex < 0) {
      ctx.reply('Could not find the monitor stream. Please, try again later.');
      return;
    }

    monitorStream = streams[watchTowerStreamIndex];
  } catch (err) {
    functions.logger.error('[Bot] Error', err);
    ctx.reply('Ups. Something went wrong while getting the stream. Check logs for any errors.');
    return;
  }

  try {
    functions.logger.log(`Removing address to the monitor stream`, { structuredData: true });
    await Moralis.Streams.deleteAddress({
      id: monitorStream.id,
      address: address.checksum,
    });

    functions.logger.log(`Removing chatId to notify user`, { structuredData: true });
    const addressDoc = await admin.firestore().collection('addresses').doc(address.checksum).get();
    let telegramIds: number[] = addressDoc.get('telegramIds') || [];
    telegramIds = telegramIds.filter((id) => id !== ctx.from.id);
    await admin.firestore().collection('addresses').doc(address.checksum).set({ telegramIds });

    ctx.reply(
      `Address ${address.checksum} removed. I will not notify anymore about transactions involving that address.`,
    );
  } catch (err) {
    functions.logger.error('[Bot] Error', err);
    ctx.reply('Ups. Something went wrong while removing that address. Check logs for any errors.');
  }
});

// Telegrams forwards chat messages to our bot at this endpoint
export const botWebhook = functions.https.onRequest(async (request, response) => {
  functions.logger.log('Incoming message', request.body);
  await bot.handleUpdate(request.body, response);
});

export const streamWebhook = functions.https.onRequest(async (request, response) => {
  const { body } = request;
  // Moralis sends an empty result to verify the webhook. We need to confirm that
  // https://docs.moralis.io/docs/your-first-stream-using-js-sdk#mandatory-test-webhook-
  if (!body.chainId) {
    response.status(200).send('OK');
    return;
  }

  // Verify request is from Moralis
  const providedSignature = request.headers['x-signature'];
  if (!providedSignature) {
    throw new Error('No signature provided');
  }
  Moralis.Streams.verifySignature({
    body,
    signature: providedSignature as string,
  });

  const webHookData = EvmStreamResult.create(body);
  const { chain, confirmed, erc20Transfers } = webHookData;
  const timestamp = new Date(parseInt(`${body.block.timestamp}000`));

  if (!confirmed) {
    response.status(200).send('OK');
    return;
  }

  // Send a telegram message for any ERC20 transfer received
  for (const transfer of erc20Transfers) {
    const { to, tokenSymbol, valueWithDecimals, triggers = [] } = transfer;

    const receiver = await admin.firestore().collection('addresses').doc(to.checksum).get();
    const receiverTelegramIds = receiver.get('telegramIds') || [];

    for (const receiverTelegramId of receiverTelegramIds) {
      let message =
        `Date: ${timestamp.toLocaleString()}` +
        `\nChain: ${chain.name}` +
        `\nWallet: ${to.checksum}` +
        `\nReceived: ${valueWithDecimals}${tokenSymbol}`;

      for (const trigger of triggers) {
        message += `\n${trigger.name}: ${trigger.value}`;
      }

      await bot.telegram.sendMessage(receiverTelegramId, message);
    }
  }

  response.status(200).send('OK');
});
