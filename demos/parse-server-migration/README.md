# parse-server demo (migrating from v1)

This demo project contains a parse-server backend to migrate from a hosted server on Moralis to a self-hosted server, using parse-server.

This also contains a frontend that is using v1 of the Moralis sdk with react-moralis.

Below is the list of supported features

- [x] Support for SDK v1 on the client (moralis-v1 package)
- [x] Self hosted server
- [x] Express Api

The following Moralis features are supported:
- [x] Authentication on Evm networks
- [ ] Authentication on Solana networks *(coming soon)*
- [x] Make Api requests on the client via parse-server cloud functions
- [x] Rate limit api requests 
- [ ] Sync real-time data/events to the database *(coming soon)*
- [ ] Syn historical data/events to the database *(coming soon)*
- [ ] ~~Plugins (deprecated, see below)~~


## Getting started locally

1. Copy/download this project
2. Make sure to have `yarn` or `npm` insalled
3. Setup mongo-db and redis locally (see below)

### Setup client

1. Install all dependencies via `yarn install` or `npm install` inside `/client`
2. Copy `client/.env.example` to `client/.env` and fill in the values 

### Setup server

1. Install all dependencies via `yarn install` or `npm install` inside `/server`
2. Copy `server/.env.example` to `server/.env` and fill in the values

### Run your dapp

- Run `yarn start` inside `/react-client` to run the client locally
- Run `yarn dev` inside `/server` to run the server locally

Now your app is running locally with the following endpoints:

- **Client**: `localhost:3000` (or `localhost:1337` or any other port you set in `.env`, which will serve the `client/build` folder)
- **Parse Server**: `localhost:1337/server` (or any other port/endpoint you set in `.env`)
- **Express API**: `localhost:1337/api` (or any other port you set in `.env`)

## Run mongo-db

In order to run a server instance of parse-server, you will need to setup a mongo-db instance. For more information you can see https://www.mongodb.com/docs/manual/installation/

For local development, you can use the mongo-db-runner (see https://github.com/mongodb-js/runner). **This should only be used for local development**. To start this run:
```
yarn dev:db-start
```
And to stop it, run
```
yarn dev:db-stop
```

Make sure to set the `DATABASE_URI` in your `.env` file

## Run redis

For rate-limiting, we are using a redis instance. In order for this to work, you will need to setup redis instance. For more information you can see https://redis.io/docs/getting-started/

For local development you will need to install redis on your local machine, and start the service. Make sure to set the `REDIS_CONNECTION_STRING` in your `.env` file

## Deploy




## Features

### Authentication
Authentication consists of 4 parts

1. (server) Get the message that needs to be signed
2. (client) Sign the message
3. (server) Verify the message
4. (server) Handle authentication logic

Step 1. is handled via the `/request-message` endpoint. The client provides the chain and address. Then the server will extend this with additional data (such as the expiration time, timout and message. See this in `/auth/authService.ts`). This endpoint is using the Moralis Auth Api (Moralis.Auth.requestMessage)

Step 2 is handled on the client side, by using the `authenticate` function in the `moralis-v1` SDK. This function will:
- Connect to a chain via metamask, walletconnect etc.
- Read the address and chain
- Retreive the message from step 1
- Sign the message
- Authenticate via to the server

Step 3 is handeld by the server via the `auth/MoralisEthAdapter.ts`. This adapter is using the Moralis Auth Api (Moralis.Auth.verify).

Step 4 is automatically handled by the parse-server. Upon succesful authentication it will create a user and a session.

*Authentication via Solana is coming soon*

### Sync real time data

*Coming soon*

### Sync historical data

*Coming soon*

### Rate limitig

Rate limiting is configured via the `.env` variables:
- `RATE_LIMIT_TTL`
- `RATE_LIMIT_AUTHENTICATED`
- `RATE_LIMIT_ANONYMOUS`

Change these values to modify the rate-limiting. Alternatively you can modify the logic in `cloud/utils/rateLimit.js`

### EvmApi (Web3Api) and SolApi

The EvmApi and SolApi methods are accessible via cloud functions. These functions are generated when running the funcion `yarn gen:cloud` (output in `/cloud`).

To access these functions in the client, you can use the `moralis-v1` sdk. (`Moralis.Web3.<domain>.<method>` and `Moralis.Sol.<domain>.<method>`).

### Plugins

All Moralis plugins on the hosted moralis servers are wrappers for external APIs. These could easily be replaced by yourself on this server. All you need is the endpoint/sdk of the plugin provider, and make requests via their api-keys (this is safe now as you have full control over your backend). See the documentation of these plugins for more information.

### Custom cloud functions

Your custom cloud functions can be listed in `/cloud/main.js`. Or you can define them in another file and import them in `/cloud/main.js`.

### Dashboard
TODO