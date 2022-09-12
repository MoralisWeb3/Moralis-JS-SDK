# Demo Moralis Streams

## Run locally

1. Copy `.env.example` to `.env` and fill in the values
2. Run `yarn install`
3. Run `yarn start` to run the server locally

Now your server is running locally and also an ngrok tunnel has been started and logged in your console with the following endpoints:

- Client: `localhost:3000` (or any other port you set in `.env`)
- API: `localhost:3000/stream` (or any other port you set in `.env`)
- Webhook: `{ngrokurl}/hooks/stream` Learn more about [ngrok](https://ngrok.com/) and [ngrok package](https://www.npmjs.com/package/ngrok)
