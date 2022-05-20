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

The Moralis JS SDK is built for three platforms:

- The browser
- nodejs
- react-native

When developing the SDK you can use `yarn dev` in order to rebuild your changes upon each save.

By default, the watch command will rebuild the SDK for the browser platform. The following commands will rebuild changes for a specific platform.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've changed APIs, update the documentation.
3. Make sure your code lints and is correctly formatted.
4. Make sure Typescript definitions are updated

### Known Issues

We use GitHub issues to track public bugs. We will keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new issue, try to make sure your problem doesn't already exist.

### Coding Style

Please follow the [Coding Style](https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/main/CODING_STYLE.md).

### Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/main/CODE_OF_CONDUCT.md). By participating, you are expected to honor this code.

## License

By contributing to the Moralis JavaScript SDK, you agree that your contributions will be licensed under its license.
