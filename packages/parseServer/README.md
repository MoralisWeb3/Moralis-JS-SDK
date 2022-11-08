# @moralisweb3/parse-server

# Parse Server Moralis Streams

This Plugin adapts parse-server to support [streams](https://docs.moralis.io/docs/what-is-streams-api-1)

# Usage

Since parse server is runs on express, this plugin is a middleware that can be added to the express app.

## Installations

First add parse-server to your express app:

```bash
yarn add parse-server
```

Then add moralis parse server plugin:

```bash
yarn add @moralisweb3/parse-server
```

## Setup parse server

Initialize parse server in your express app:

```javascript
import ParseServer from 'parse-server';
import config from './config';

export const parseServer = new ParseServer({
  databaseURI: config.DATABASE_URI,
  cloud: config.CLOUD_PATH,
  appId: config.APPLICATION_ID,
  masterKey: config.MASTER_KEY,
  serverURL: config.SERVER_URL,
});
```

## Setup moralis parse server plugin

Then add the plugin to your express app:

```typescript
import { streamsSync } from '@moralisweb3/parse-server';

```

the initializeStreams function takes the following options:
- the parse server instance
- Other options

```typescript
interface StreamOptions {
  webhookUrl?: string;
  apiKey: string;
}
```

- `apiKey`: Your Moralis API key
- `webhookUrl` - the url of choice to receive the stream data (optional). default path is `/streams-webhook`


## Putting all together

```typescript
import Moralis from 'moralis';
import express from 'express';
import config from './config';
import { streamsSync } from '@moralisweb3/parse-server';

const expressApp = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());

expressApp.use(cors());

expressApp.use(
  streamsSync(parseServer, {
    apiKey: config.MORALIS_API_KEY,
    webhookUrl: '/streams-webhook',
  }),
);

expressApp.use(`/${config.SERVER_ENDPOINT}`, parseServer.app);
expressApp.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`${config.APP_NAME} is running on port ${config.PORT}`);
});
```

The endpoint to receive webhooks is `YOUR_EXPRESSAPP_URL/SET_WEBHOOKURL`. This is the URL that you should use when setting up a stream.

# Done!

After you have configured the plugin and created a stream you can see the data in the dashboard. Note that the stream tag will be concatenated with `Txs` and `Logs` meaning if you have a tag called "MyStream" you will have two collections in DB called "MyStreamTxs" and "MyStreamLogs", which will contain the transactions and logs respectively.

Full example can be found [here](https://github.com/MoralisWeb3/Moralis-JS-SDK/tree/main/demos/parse-server-migration)