# Parse Server Push Adapter <!-- omit in toc -->

[![Build Status](https://github.com/parse-community/parse-server-push-adapter/workflows/ci/badge.svg?branch=master)](https://github.com/parse-community/parse-server-push-adapter/actions?query=workflow%3Aci+branch%3Amaster)
[![Snyk Badge](https://snyk.io/test/github/parse-community/parse-server-push-adapter/badge.svg)](https://snyk.io/test/github/parse-community/parse-server-push-adapter)
[![Coverage](https://img.shields.io/codecov/c/github/parse-community/parse-server-push-adapter/master.svg)](https://codecov.io/github/parse-community/parse-server-push-adapter?branch=master)
[![auto-release](https://img.shields.io/badge/%F0%9F%9A%80-auto--release-9e34eb.svg)](https://github.com/parse-community/parse-server-push-adapter/releases)

[![npm latest version](https://img.shields.io/npm/v/@parse/push-adapter.svg)](https://www.npmjs.com/package/@parse/push-adapter)

---

The official Push Notification adapter for Parse Server. See [Parse Server Push Configuration](http://docs.parseplatform.org/parse-server/guide/#push-notifications) for more details. 

---

- [Silent Notifications](#silent-notifications)
- [Logging](#logging)
- [Using a Custom Version on Parse Server](#using-a-custom-version-on-parse-server)
  - [Install Push Adapter](#install-push-adapter)
  - [Configure Parse Server](#configure-parse-server)



# Silent Notifications

If you have migrated from parse.com and you are seeing situations where silent (newsstand-like presentless) notifications are failing to deliver please ensure that your payload is setting the content-available attribute to Int(1) and not "1" This value will be explicitly checked.

# Logging

You can enable verbose logging with environment variables:

```
VERBOSE=1

or 

VERBOSE_PARSE_SERVER_PUSH_ADAPTER=1
```

This will produce a more verbose output for all the push sending attempts

# Using a Custom Version on Parse Server

## Install Push Adapter

```
npm install --save @parse/push-adapter@VERSION
```

Replace VERSION with the version you want to install.

## Configure Parse Server

```js
const PushAdapter = require('@parse/push-adapter').default;
const pushOptions = {
  ios: { /* iOS push options */ } ,
  android: { /* android push options */ }   
}
// starting 3.0.0
const options = {
  appId: "****",
  masterKey: "****",
  push: {
    adapter: new PushAdapter(pushOptions),
  },
  /* ... */ 
}

const server = new ParseServer(options);

/* continue with the initialization of parse-server */
```
