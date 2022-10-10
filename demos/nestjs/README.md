# Nestjs Utils

NestJs utility package, includes Moralis API proxy endpoints generator for nestjs apps.

## Run locally

1. Run `yarn install` to install dependencies
2. Run `npm link` to link the package for use in the demo app

3. Head to the demo app and run `yarn install` to install dependencies.
4. Run `npm run link @moralisweb3/nestjs` to link the package to the demo app
5. Run `yarn gen:proxy -n all -k MORALIS_API_KEY` to generate the proxy endpoints (-k accepts is your Moralis API key variable name in your .env file and -n accepts the name of the api you want to generate the proxy endpoints for (`evm`, `solana`, or `all`))
6. Run `yarn start:start` to start the demo app
