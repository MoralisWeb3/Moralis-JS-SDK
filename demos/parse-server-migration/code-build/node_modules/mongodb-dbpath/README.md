# mongodb-dbpath [![][npm_img]][npm_url] [![][travis_img]][travis_url] [![][appveyor_img]][appveyor_url] [![][gitter_img]][gitter_url]

> Get a path for `--dbpath` that's writeable for the current user and mkdirp it.

## Installation

```
# For use in other modules
npm install --save mongodb-dbpath

# For use from cli
npm install -g mongodb-dbpath
```

## Usage

```
Usage: mongodb-dbpath <name>

Get a path for --dbpath that's writeable for the current user and mkdirp it.

Usage:
  mongodb-dbpath my-db
  # On your laptop `~/.mongodb/data/my-db`

  mongodb-dbpath my-db
  # On travis `process.cwd() + /.mongodb/data/my-db`

  mongodb-dbpath my-db
  # On appveyor `process.env.LOCALAPPDATA + \.mongodb\data\my-db`

Options:
  --debug              Enable debug messages.
  -h --help            Show this screen.
  --version            Show version.
```

## API

```javascript
var dbpath = require('mongodb-dbpath');
dbpath(opts, function done (err, res) { })
```
#### dbpath(opts, callback)

##### opts

**Required**

`name` - *String*
Subdirectory name.

##### callback

`err` - *Error*
Contains errors if no search options are writeable which would be very strange.

`res` - *String*
Path you can pass to `--dbpath`.

## License

Apache 2.0

[travis_img]: https://secure.travis-ci.org/mongodb-js/mongodb-dbpath.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/mongodb-dbpath
[npm_img]: https://img.shields.io/npm/v/mongodb-dbpath.svg
[npm_url]: https://www.npmjs.org/package/mongodb-dbpath
[appveyor_img]: https://ci.appveyor.com/api/projects/status/voa841j5ke8jtpfh?svg=true
[appveyor_url]: https://ci.appveyor.com/project/imlucas/mongodb-dbpath
[gitter_img]: https://badges.gitter.im/Join%20Chat.svg
[gitter_url]: https://gitter.im/mongodb-js/mongodb-js
