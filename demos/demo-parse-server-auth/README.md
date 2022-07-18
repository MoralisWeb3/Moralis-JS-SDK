# Demo parse-server Auth

## Run locally

### Run the server

Go to the server directory: `cd server`

1. Run a mongo-db via `yarn dev:db-start` or run your a mongo-db in any other way
2. Copy `.env.exampl` to `.env` and fill in the values
3. Run `yarn dev` to run the server locally

Now your server is running locally with the following endpoints:

- Parse Server: `localhost:1337/server` (or any other port/endpoint you set in `.env`)
- Parse Dashboard: `localhost:1337/dashboard` (or any other port you set in `.env`)
- API: `localhost:1337/api` (or any other port you set in `.env`)

### Run the client

Go to the client directory: `cd client/public`

1. Change the `API_URL` in `script.js` to the url of the server api
2. Change the moralis import path in `index.html` to a correct Moralis import from a CDN
3. Open `index.html` in your browser via a live server (ex. the LiveServer plugin in VsCode)

Now you can authenticate via MetaMask as long as you have the MetaMask browser extention installed in the browser.
