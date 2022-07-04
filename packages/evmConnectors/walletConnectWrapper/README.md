# @moralisweb3/wallet-connect-wrapper

Rollup cannot build an UMD bundle with `@walletconnect/web3-provider`, so this project is a workaround for this problem. It contains a wrapper of WalletConnectProvider. How it works? Webpack creates a single CommonJs bundle which Rollup can consume without any problem.

The idea is taken from [walletconnect-v1](https://github.com/DePayFi/walletconnect-v1).
