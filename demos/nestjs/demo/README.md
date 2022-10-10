## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app with proxy endpoints

1. run `yarn install` to install dependencies.
2. Run `npm link @moralis/nestjs` to link the package to the demo app
3. Run `yarn gen:proxy -n all -k MORALIS_API_KEY` to generate the proxy endpoints (-k accepts is your Moralis API key variable name in your .env file and -n accepts the name of the api you want to generate the proxy endpoints for (`evm`, `solana`, or `all`))
4. Run `yarn start:start` to start the demo app
5. Open `http://localhost:3000/swagger` to see the swagger docs

