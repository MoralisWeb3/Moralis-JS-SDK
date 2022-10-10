# Moralis Streams for Firebase Demo

This project contains a simple demo of the Listen Blockchain by Moralis Streams extension for the Firebase.

Required Google Cloud services:

- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions) (only in the Blaze plan, check the [pricing](https://firebase.google.com/pricing)).
- [Secret Manager](https://cloud.google.com/secret-manager/) (check the [pricing](https://cloud.google.com/secret-manager/pricing))

## 🚀 How to Start

1. Clone this repo.
2. [Install Firebase CLI](https://firebase.google.com/docs/cli) globally: `yarn global add firebase-tools`
3. Login to your account: `firebase login`
4. Get list of your projects: `firebase projects:list`. If this list is empty you should add a new project. You can do it by the Firebase Console.
5. Set your project ID: `firebase use <PROJECT_ID>`
6. Install the Listen Blockchain by Moralis Streams extension: `firebase ext:install moralis/moralis-streams`.
7. Build the functions project:
   * `cd functions`
   * `yarn install`
   * `yarn run build`

### 🔌 Run Locally

1. [Install Java](https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html) on your computer. Functions Emulator requires Java.
2. Run emulators: `firebase emulators:start`
3. Determine the **local webhook URL**. You can find the URL in logs of the Emulator. Open `http://localhost:4000/functions` in your browser. The URL should look like this: `http://localhost:5001/<project_id>/<location>/ext-moralis-streams-webhook`.
4. Run the ngrok to forward requests from an internet address to your localhost:
   * `cd functions`
   * `yarn run ngrok`
5. Determine the **public webook URL**. The URL has hostname and port from the ngrok, and the path from the local webhook URL. This URL will be needed in the next step.\
   For example: `https://baa0-89-151-39-84.ngrok.io/moralis-x6/us-central1/ext-moralis-streams-webhook`
6. We need to add some streams to see the demo in action. Open the Moralis admin panel and add below streams.
   * **ERC20 Transfers** stream:
     ```
     Address: 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
     Description: USDC Token
     Tag: ERC20 Transfer
     Topic: ✓ Transfer
     Chain: Ethereum Mainnet
     ```
   * **Wallet Transfers** stream:
     ```
     Address: 0xDFd5293D8e347dFe59E90eFd55b2956a1343963d
     Description: Binance 16 Transactions
     Tag: Transaction
     Chain: Ethereum Mainnet
     ```
3. Open `http://localhost:5555/` in your browser.

### 🔥 Deploy to Production

1. Deploy: `firebase deploy`
2. If you have any problem with the CORS on the production, probably you should allow unauthenticated HTTP function invocation. To allow unauthenticated invocation you must specify this at or after deployment. [Here](https://cloud.google.com/functions/docs/securing/managing-access-iam#allowing_unauthenticated_http_function_invocation) you can read more about it.

## 🚨 Firestore Rules

This demo has already set the below Firestore security rules, check the [firestore.rules](./firestore.rules) file. **Don't forget to set it to your own project**.

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /moralis/events/{name}/{id} {
      allow read;
      allow write: if false;
    }
    match /moralis/txs/{name}/{id} {
      allow read;
      allow write: if false;
    }
  }
}
```
