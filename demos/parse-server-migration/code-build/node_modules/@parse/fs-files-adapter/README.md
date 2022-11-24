# Parse Server FS Adapter <!-- omit in toc -->

[![Build Status](https://github.com/parse-community/parse-server-fs-adapter/workflows/ci/badge.svg?branch=main)](https://github.com/parse-community/parse-server-fs-adapter/actions?query=workflow%3Aci+branch%3Amain)
[![Snyk Badge](https://snyk.io/test/github/parse-community/parse-server-fs-adapter/badge.svg)](https://snyk.io/test/github/parse-community/parse-server-fs-adapter)
[![Coverage](https://img.shields.io/codecov/c/github/parse-community/parse-server-fs-adapter/main.svg)](https://codecov.io/github/parse-community/parse-server-fs-adapter?branch=main)
[![auto-release](https://img.shields.io/badge/%F0%9F%9A%80-auto--release-9e34eb.svg)](https://github.com/parse-community/parse-server-fs-adapter/releases)

[![npm latest version](https://img.shields.io/npm/v/@parse/fs-files-adapter.svg)](https://www.npmjs.com/package/@parse/fs-files-adapter)

---

The Parse Server File System Storage Adapter.

---

- [Installation](#installation)
- [Configuration](#configuration)
  - [Parse Server Config](#parse-server-config)
  - [In-Code Instance](#in-code-instance)
  - [Rotating Encryption Key](#rotating-encryption-key)
    - [Encrypting Previously Unencrypted Files](#encrypting-previously-unencrypted-files)
    - [Encrypting Previously Encrypted Files](#encrypting-previously-encrypted-files)
- [Other Considerations](#other-considerations)

# Installation

`npm install --save @parse/fs-files-adapter`

# Configuration

## Parse Server Config

```javascript
{
  "appId": 'my_app_id',
  "masterKey": 'my_master_key',
  // other options
  // ...
  "filesAdapter": {
    "module": "@parse/fs-files-adapter",
    "options": {
      "filesSubDirectory": "my/files/folder", // Optional, defaults to `./files`
      "encryptionKey": "someKey" // Optional, but mandatory if you want to encrypt files
    } 
  }
}
```

## In-Code Instance

```javascript
var FSFilesAdapter = require('@parse/fs-files-adapter');

var fsAdapter = new FSFilesAdapter({
  "filesSubDirectory": "my/files/folder", // optional, defaults to ./files
  "encryptionKey": "someKey" //optional, but mandatory if you want to encrypt files
});

var api = new ParseServer({
	appId: 'my_app',
	masterKey: 'master_key',
	filesAdapter: fsAdapter
})
```

## Rotating Encryption Key

Periodically you may want to rotate your encryptionKey for security reasons. When this is the case, you can start up a development parse-server that has the same configuration as your production server. In the development server, initialize the file adapter with the new key and use the examples below.

Note that the examples below to rotate keys are are not optimized for performance. Is it therefore not recommended to rotate a large number of files using the code below in a production environment; instead use dedicated resources for that.

### Encrypting Previously Unencrypted Files

```javascript
var FSFilesAdapter = require('@parse/fs-files-adapter');

var fsAdapter = new FSFilesAdapter({
  "filesSubDirectory": "my/files/folder", // Optional, defaults to `./files`
  "encryptionKey": "newKey" // Use the new key
});

var api = new ParseServer({
	appId: 'my_app',
	masterKey: 'master_key',
	filesAdapter: fsAdapter
});

const { rotated, notRotated } =  await api.filesAdapter.rotateEncryptionKey();
console.log('Files rotated to newKey: ' + rotated);
console.log('Files that couldn\'t be rotated to newKey: ' + notRotated);
```

After successfully rotating your key, you should change the `encryptionKey` to `newKey` on your production server and then restart the server.


### Encrypting Previously Encrypted Files

To encrypt files with a new key that were previously encrypted with a different key, the same process applies as above, but you pass in your `oldKey` to `rotateEncryptionKey()`.

```javascript
const {rotated, notRotated} =  await api.filesAdapter.rotateEncryptionKey({oldKey: oldKey});
console.log('Files rotated to newKey: ' + rotated);
console.log('Files that couldn\'t be rotated to newKey: ' + notRotated);
```

You can also only rotate a select list of files that were previously encrypted with `oldKey` and you want to encrypt with `newKey`. This is useful if for some reason there errors and some of the files werent rotated and returned in `notRotated`. The same process as above, but pass in your `oldKey` along with the array of `fileNames` to `rotateEncryptionKey()`.

```javascript
const { rotated, notRotated } =  await api.filesAdapter.rotateEncryptionKey({ oldKey: oldKey, fileNames: ["fileName1.png","fileName2.png"] });
console.log('Files rotated to newKey: ' + rotated);
console.log('Files that couldn\'t be rotated to newKey: ' + notRotated);
```

# Other Considerations

- Multiple Instances of Parse Server

  When using the adapter across multiple Parse Server instances it's important to establish "centralization" of your file storage (this is the same premise as the other file adapters, you are sending/receiving files through a dedicated link). You can accomplish this at the file storage level by Samba mounting (or any other type of mounting) your storage to each of your parse-server instances, e.g if you are using parse-server via docker (volume mount your SMB drive to `- /Volumes/SMB-Drive/MyParseApp1/files:/parse-server/files`). All parse-server instances need to be able to read and write to the same storage in order for parse-server-fs-adapter to work properly with parse-server. If the file storage isn't centralized, parse-server will have trouble locating files and you will get random behavior on client-side.