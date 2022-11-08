# Call Moralis API from Firebase Front-End App Demo

This project contains a simple demo how to call the Moralis API from the Firebase front-end app. It uses the Moralis API extension for the Firebase.

Required Google Cloud services:

- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions) (only in the Blaze plan, check the [pricing](https://firebase.google.com/pricing)).
- [Secret Manager](https://cloud.google.com/secret-manager/) (check the [pricing](https://cloud.google.com/secret-manager/pricing))

## 🚀 How to Start

1. Clone this repo.
2. [Install Firebase CLI](https://firebase.google.com/docs/cli) globally: `yarn global add firebase-tools`
3. Login to your account: `firebase login`
4. Get list of your projects: `firebase projects:list`. If this list is empty you should add a new project. You can do it by the Firebase Console.
5. Set your project ID: `firebase use <PROJECT_ID>`
6. Install the Moralis API extension for the Firebase: `firebase ext:install moralis/moralis-api`.

### 🔌 Run Locally

1. [Install Java](https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html) on your computer. Functions Emulator requires Java.
2. Run emulators: `firebase emulators:start`
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
    match /moralisApiRateLimiter {
      allow read: if false;
      allow write: if false;
    }
  }
}
```
