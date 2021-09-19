<p align="center">
    <a href="https://moralis.io">
    <img width="132" height="101" src="https://moralis.io/wp-content/uploads/2021/01/logo.png" class="attachment-full size-full" alt="Moralis Build Serverless web3 apps" loading="lazy" /></a>
</p>

<h2 align="center">Moralis SDK for JavaScript</h2>

<p align="center">
    A library that gives you access to the powerful Moralis Server backend from your JavaScript app. <a href="https://poc.moralis.io">Create Server Here</a>
</p>

<!-- <p align="center">
    <a href="https://twitter.com/intent/follow?screen_name=parseplatform"><img alt="Follow on Twitter" src="https://img.shields.io/twitter/follow/parseplatform?style=social&label=Follow"></a>
    <a href="https://community.parseplatform.org/"><img alt="Join the conversation" src="https://img.shields.io/discourse/https/community.parseplatform.org/topics.svg"></a>
    <a href="https://github.com/parse-community/Parse-SDK-JS/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-BSD-lightgrey.svg"></a>
    <a href="https://github.com/parse-community/Parse-SDK-JS/actions?query=workflow%3Aci+branch%3Amaster"><img alt="Build status" src="https://github.com/parse-community/Parse-SDK-JS/workflows/ci/badge.svg?branch=master"></a>
    <a href="#backers"><img alt="Backers on Open Collective" src="https://opencollective.com/parse-server/backers/badge.svg" /></a>
  <a href="#sponsors"><img alt="Sponsors on Open Collective" src="https://opencollective.com/parse-server/sponsors/badge.svg" /></a>
</p>

<p align="center">
    <a href="http://codecov.io/github/parse-community/Parse-SDK-JS?branch=master"><img alt="Test coverage" src="http://codecov.io/github/parse-community/Parse-SDK-JS/coverage.svg?branch=master"></a>
    <a href="https://npmjs.org/parse"><img alt="npm version" src="https://badge.fury.io/js/parse.svg"></a>
    <a href="https://cdnjs.com/libraries/parse"><img alt="CDNJS version" src="https://img.shields.io/cdnjs/v/parse.svg"></a>
    <a href="https://greenkeeper.io/"><img alt="Greenkeeper badge" src="https://badges.greenkeeper.io/parse-community/Parse-SDK-JS.svg"></a>
</p> -->
<br>

For more information on Moralis and its features, see [the website](https://moralis.io), [the JavaScript guide](https://docs.moralis.io), [the Cloud Code guide](https://docs.moralis.io/cloudcode) or [Web3 Reference](https://docs.moralis.io/web3).

## Getting Started

The easiest way to integrate the Moralis SDK into your JavaScript project is through the [npm module](https://npmjs.org/moralis).
However, if you want to use a pre-compiled file, you can fetch it from [unpkg](https://unpkg.com). The development version is available at [https://unpkg.com/moralis/dist/moralis.js](https://unpkg.com/moralis/dist/moralis.js), and the minified production version is at [https://unpkg.com/moralis/dist/moralis.min.js](https://unpkg.com/moralis/dist/moralis.min.js).

### Using Moralis on Different Platforms

The JavaScript ecosystem is wide and incorporates a large number of platforms and execution environments. To handle this, the Moralis npm module contains special versions of the SDK tailored to use in Node.js and [React Native](https://facebook.github.io/react-native/) environments. Not all features make sense in all environments, so using the appropriate package will ensure that items like local storage, user sessions, and HTTP requests use appropriate dependencies. For server side rendered applications, you may set the `SERVER_RENDERING` variable to prevent warnings at runtime.

To use the npm modules for a browser based application, include it as you normally would:

```js
const Moralis = require('moralis');
// ES6 Minimized
import Moralis from 'moralis/dist/moralis.min.js';
```

For server-side applications or Node.js command line tools, include `'moralis/node'`:

```js
// In a node.js environment
const Moralis = require('moralis/node');
```

For React Native applications, include `'moralis/react-native.js'`:
```js
// In a React Native application
const Moralis = require('moralis/react-native.js');

// On React Native >= 0.50 and Moralis >= 1.11.0, set the Async
const AsyncStorage = require('react-native').AsyncStorage;
Moralis.setAsyncStorage(AsyncStorage);
```

For WeChat miniprogram, include `'moralis/weapp'`:
```js
// In a WeChat miniprogram
const Moralis = require('moralis/weapp');
```
If you want to use a pre-compiled file, you can fetch it from [unpkg](https://unpkg.com). The development version is available at [https://unpkg.com/moralis/dist/moralis.weapp.js](https://unpkg.com/moralis/dist/moralis.weapp.js), and the minified production version is at [https://unpkg.com/moralis/dist/moralis.weapp.min.js](https://unpkg.com/moralis/dist/moralis.weapp.min.js).

For TypeScript applications, install `'@types/moralis'`:
```
$ npm install @types/moralis
```

Types are updated manually after every release. If a definition doesn't exist, please submit a pull request to [@types/moralis][types-moralis]

## 3rd Party Authentications

Moralis Server supports many [3rd Party Authenications][3rd-party-auth]. It is possible to [linkWith][link-with] any 3rd Party Authentication by creating a [custom authentication module][custom-auth-module].

<!-- ### Experimenting

You can also use your own forks, and work in progress branches by specifying them:

```
npm install github:myUsername/Parse-SDK-JS#my-awesome-feature
```

And don't forget, if you plan to deploy it remotely, you should run `npm install` with the `--save` option.

## Contributing

We really want Parse to be yours, to see it grow and thrive in the open source community. Please see the [Contributing to Parse Javascript SDK guide][contributing].

## License

```
Copyright (c) 2015-present, Parse, LLC.
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree. An additional grant
of patent rights can be found in the PATENTS file in the same directory.
```

-----
As of April 5, 2017, Parse, LLC has transferred this code to the parse-community organization, and will no longer be contributing to or distributing this code.
 
[3rd-party-auth]: http://docs.parseplatform.org/parse-server/guide/#oauth-and-3rd-party-authentication
[contributing]: https://github.com/parse-community/Parse-SDK-JS/blob/master/CONTRIBUTING.md
[custom-auth-module]: https://docs.parseplatform.org/js/guide/#custom-authentication-module
[link-with]: https://docs.parseplatform.org/js/guide/#linking-users
[migration]: https://github.com/parse-community/Parse-SDK-JS/blob/master/2.0.0.md
[open-collective-link]: https://opencollective.com/parse-server
[types-parse]: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/parse  -->
