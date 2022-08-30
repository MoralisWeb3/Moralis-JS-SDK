# Demo parse-server Auth

## Run locally

1. Run a mongo-db via `yarn dev:db-start` (use this mongo-db ONLY in development, not in production, see https://github.com/mongodb-js/runner), or run your a mongo-db in any other way
2. Copy `.env.example` to `.env` and fill in the values
3. Change the `API_URL` in `public/script.js` to the url of the server api
4. Run `yarn dev` to run the server locally

Now your server is running locally with the following endpoints:

- Client: `localhost:1337` (or any other port you set in `.env`)
- Parse Server: `localhost:1337/server` (or any other port/endpoint you set in `.env`)
- Parse Dashboard: `localhost:1337/dashboard` (or any other port you set in `.env`)
- API: `localhost:1337/api` (or any other port you set in `.env`)

Now you can authenticate via MetaMask as long as you have the MetaMask browser extention installed in the browser.
