# Demo Supabase Auth

## Run locally

1. Create a supabase account here https://app.supabase.com/
2. Copy `.env.example` to `.env` and fill in the values from your supabase dashboard and add the moralis api key
3. Open `public/script.js`, and fill in the values (located at the top of the file) from your supabase dashboard
4. Run `yarn dev` to run the server locally

Now your server is running locally with the following endpoints:

- Client: `localhost:3000` (or any other port you set in `.env`)
- API: `localhost:3000/api` (or any other port you set in `.env`)

Now you can authenticate via MetaMask as long as you have the MetaMask browser extention installed in the browser.
