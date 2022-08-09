# Firebase Moralis API Proxy Demo

This project contains a simple demo of Moralis API Proxy with the rate-limiting per a user IP.

Required Firebase services:

- [Firestore](https://firebase.google.com/docs/firestore)
- [Cloud Functions](https://firebase.google.com/docs/functions) (only in the "Pay as you go" billing plan).

## 🚀 How to Start

1. Clone this repo.
2. [Install Firebase CLI](https://firebase.google.com/docs/cli) globally: `npm install -g firebase-tools`
3. Login to your account: `firebase login`
4. Get list of your projects: `firebase projects:list`. If this list is empty you should add a new project. You can do it by the Firebase Console.
5. Set your project ID: `firebase use <PROJECT_ID>`
6. Copy `functions/.env.example` to `functions/.env` and set your Moralis API key in the file.

### 🔌 Run Locally

1. [Install Java](https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html) on your computer. Functions Emulator requires Java.
2. Run emulators: `firebase emulators:start`
3. Open `http://localhost:4000/` in your browser.

### 🔥 Deploy to Production

1. Activate Firestore.
1. Deploy: `firebase deploy`
2. [Allow unauthenticated HTTP function invocation](https://cloud.google.com/functions/docs/securing/managing-access-iam#allowing_unauthenticated_http_function_invocation). If you don't do this step, you will see the `Error: Forbidden` response for all requests to your cloud functions.
