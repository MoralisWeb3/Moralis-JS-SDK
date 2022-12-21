# Moralis Streams Triggers Demo

This project is a Wallet ERC20 Monitor.
Using Moralis Streams it will be notified whenever you receive an ERC20 token in one of your wallets. Then it will notify you on Telegram about it.
Also, it will add Moralis Stream Triggers to enrich the data received with the full balance of both sender and receiver wallets.

Required services:

- [Firebase Cloud Functions](https://firebase.google.com/docs/functions). Only in the Blaze plan, check the [pricing](https://firebase.google.com/pricing), for personal usage will likely not exceed free tier quota.
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Moralis Streams](https://moralis.io/streams/). Free quota should be enough for personal usage, check the [pricing](https://moralis.io/pricing).
- [Telegram Bots](https://core.telegram.org/api#bot-api). You will need Telegram app in, at least, one device.

## 🚀 How to Start

1. Create your Moralis account
   1. Copy your Moralis API Key in `.env` file
2. Setup a firebase project with functions and firestore database
   1. [Install Firebase CLI](https://firebase.google.com/docs/cli) globally: `yarn global add firebase-tools`
   2. Login to your account: `firebase login`
   3. Get list of your projects: `firebase projects:list`. If this list is empty you should add a new project. You can do it by the Firebase Console.
   4. Set your project ID: `firebase use <PROJECT_ID>`
   5. Make sure to have a firestore database in your project
3. Create a telegram bot
   1. Using Telegram, write "/start" to @BotFather to start a conversation and see available commands
   2. Send "/newbot" to @BotFather
   3. Choose a name for your bot
   4. Choose a username for your bot
   5. Copy the token provided by @BotFather in `.env` file
4. Deploy the project by running `firebase deploy`. This will create your functions and give you the URL to access them.
5. Link your bot webhook in telegram, so it can receive messages with the following request
   1. POST https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=<FIREBASE_botWebhook_URL>
6. Add your wallets to the bot monitor list with the "/add WALLET" command. The first time doing this, it will create a stream automatically
7. Whenever any of those wallets is included in a transaction, bot will send you a message containing its info
8. You can remove an address with the "/remove WALLET" command

### 🔌 Run Locally

1. [Install Java](https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html) on your computer. Functions Emulator requires Java.
2. Run ngrok to forward requests from an internet address to your localhost:
    * `ngrok http 5001` (if you are using the default port)
3. Edit `index.ts` file and replace `<NGROK_URL>` in `STREAM_CONFIG` with the URL provided by ngrok
4. Run emulators: `firebase emulators:start`
5. Link bot webhook to your local URL with the following request
   1. POST https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=<FIREBASE_botWebhook_URL>
6. Follow from step 6 in the previous section
