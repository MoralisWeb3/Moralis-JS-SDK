# Contributing to Moralis SDK for JavaScript

## Setting up the project for debugging and contributing

### Setting up you local machine:

- [Fork](https://github.com/MoralisWeb3/Moralis-JS-SDK) this project and clone the fork on your local machine:

```sh
git clone https://github.com/MoralisWeb3/Moralis-JS-SDK.git
cd Moralis-JS-SDK # go into the clone directory
yarn install # install all the node dependencies
```

Make sure to have a ESlint and Prettier plugin installed to check for code-smells and auto-formatting.

### Building the SDK

This repo is a monorepo and contains several packages. The most important one is the `moralis` package located at `packages/moralis`. This one serves as an umbrella packages and includes all the important functionalities of the other (sub)packages. Other packages are located in the `packages` folder.

Run `yarn build` to build all the packages.

### Testing

You can run all the tests via `yarn test` in the root. Alternatively you can run the tests for a specific package via `yarn test` in the specific package folder.

For manual local testing, you can also use any of the demos in the `demos` folder. You can run them via `yarn start`/`yarn dev` n the specific demo folder. (check the corresponding package.json for available commands, these differ per demo) i

### Pull Requests

First make sure that:
- All packages build successfully (`yarn build` in the root)
- All test pass (`yarn test` in the root)
- All code is correctly linted (`yarn lint` in the root)
- All code is correctly formatted (`yarn format` in the root)
- All code is following code-styling in line with the rest of the code-base
- All code have correct Typescript definitions

Then:
1. Fork the repo and create your branch from `main`.
2. Create a pull request and describe the changes + why the changes are needed.

### Known Issues

We use GitHub issues to track public bugs. We will keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new issue, try to make sure your problem doesn't already exist.

### Coding Style

Please follow the [Coding Style](https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/main/CODING_STYLE.md).

### Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/main/CODE_OF_CONDUCT.md). By participating, you are expected to honor this code.

## License

By contributing to the Moralis JavaScript SDK, you agree that your contributions will be licensed under its license.
