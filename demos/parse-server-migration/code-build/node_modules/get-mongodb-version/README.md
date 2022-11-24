# get-mongodb-version [![][npm_img]][npm_url] [![][travis_img]][travis_url]

Lookup download URL's for MongoDB versions.

## Installation

```bash
# For general utility, install globally
npm install -g get-mongodb-version

# If including in another module, install locally
npm install get-mongodb-version
```

## Usage

```
Usage: get-mongodb-version

Get the MongoDB version for a path or uri.

Usage:
  get-mongodb-version
  # /usr/bin/env mongod --version

  get-mongodb-version /usr/local/bin/mongod
  # /usr/local/bin/mongod --version

  get-mongodb-version localhost:27017
  # Connects to mongodb://localhost:27017
  # and prints db.admin().serverInfo().version

  get-mongodb-version mongodb://my.mongodb.com:27017/mydb
  # Connects to mongodb://my.mongodb.com:27017/mydb
  # and prints db.admin().serverInfo().version

Options:
  -h --help            Show this screen.
  --version            Show version.
```

## API

```javascript
var getMongodbVersion = require('get-mongodb-version');
getMongodbVersion(opts, function done (err, version) { })
```

#### getMongodbVersion(opts, callback)

##### opts

`opts` - *mongodb.Db*
If `opts` is the result of `require('mongodb').connect(function(err, db){})`,
the version will be pulled from `db.admin().serverInfo().version`

`path` - *File Path to mongod*

`path` - *mongodb uri*

##### callback

`err` - *Error*
Contains errors if any.

`version` - *String*
The version discovered.

## License

Apache 2.0

[travis_img]: https://secure.travis-ci.org/mongodb-js/get-mongodb-version.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/get-mongodb-version
[npm_img]: https://img.shields.io/npm/v/get-mongodb-version.svg
[npm_url]: https://www.npmjs.org/package/get-mongodb-version
