# Authenticate with Moralis Extension for Firebase Demo

This project contains a simple authentication demo for the Firebase by a Web3 wallet. It uses the Authenticate with Moralis Auth extension for the Firebase.

Required Google Cloud services:

- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions) (only in the Blaze plan, check the [pricing](https://firebase.google.com/pricing)).
- [Secret Manager](https://cloud.google.com/secret-manager/) (check the [pricing](https://cloud.google.com/secret-manager/pricing))

## 🚀 How to Start

1. Clone this repo.
2. [Install Firebase CLI](https://firebase.google.com/docs/cli) globally: `npm install -g firebase-tools`
3. Login to your account: `firebase login`
4. Get list of your projects: `firebase projects:list`. If this list is empty you should add a new project. You can do it by the Firebase Console.
5. Set your project ID: `firebase use <PROJECT_ID>`
6. Generate a certificate for the [Service Account](https://firebase.google.com/support/guides/service-accounts). You will need it in the next step.
7. Convert the certificate to extension variables by [this online converter](https://moralisweb3.github.io/firebase-extensions/service-account-converter/). You will use these variables in the next step.
8. Install the Authenticate with Moralis Web3 extension: `firebase ext:install moralis/moralis-auth`.
9. Copy `hosting/.env.example` to `hosting/.env` and set all variables.
10. Build the functions project:
   * `cd functions`
   * `npm install`
   * `npm run build`
11. Build the hosting project:
   * `cd hosting`
   * `npm install`
   * `npm run build`

### 🔌 Run Locally

1. [Install Java](https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html) on your computer. Functions Emulator requires Java.
2. Run emulators: `firebase emulators:start`
3. Open `http://localhost:5555/` in your browser.

### 🔥 Deploy to Production

1. Deploy: `firebase deploy`
2. If you have any problem with the CORS on the production, probably you should allow unauthenticated HTTP function invocation. To allow unauthenticated invocation you must specify this at or after deployment. [Here](https://cloud.google.com/functions/docs/securing/managing-access-iam#allowing_unauthenticated_http_function_invocation) you can read more about it.
