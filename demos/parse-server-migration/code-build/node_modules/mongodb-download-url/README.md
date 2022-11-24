# mongodb-download-url [![][npm_img]][npm_url] [![][travis_img]][travis_url] [![][coverage_img]][coverage_url] [![][gitter_img]][gitter_url]

Lookup download URL's for MongoDB versions.

## Installation

```bash
npm install -g mongodb-download-url
```

## Usage

```
Usage: mongodb-download-url

Get the URL to download a MongoDB tarball or zip.

Usage:
  mongodb-download-url <version>

Options:
  --version            A semver-ish version string [Default: `stable`].
  --platform           The operating system [Default: `process.platform`].
  --bits               CPU arch [Default: `process.arch`].
  --debug              Debug build [Default: `false`].
  -h --help            Show this screen.
  --version            Show version.
```

## License

Apache 2.0

[travis_img]: https://secure.travis-ci.org/mongodb-js/mongodb-download-url.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/download-url
[npm_img]: https://img.shields.io/npm/v/mongodb-download-url.svg
[npm_url]: https://www.npmjs.org/package/mongodb-download-url
[coverage_img]: https://coveralls.io/repos/mongodb-js/mongodb-download-url/badge.svg?branch=master
[coverage_url]: https://coveralls.io/r/mongodb-js/mongodb-download-url
[gitter_img]: https://badges.gitter.im/Join%20Chat.svg
[gitter_url]: https://gitter.im/mongodb-js/mongodb-js
