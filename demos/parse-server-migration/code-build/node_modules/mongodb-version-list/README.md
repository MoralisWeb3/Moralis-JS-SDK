# mongodb-version-list [![][npm_img]][npm_url] [![][travis_img]][travis_url] [![][coverage_img]][coverage_url]

> Get a list of available MongoDB versions.

## Installation

```bash
npm install -g mongodb-version-list
```

## Usage

```
Usage: mongodb-version-list

Get a list of available MongoDB versions.

Usage:
  mongodb-version-list

Options:
  --debug              Enable debug messages.
  -h --help            Show this screen.
  --version            Show version.
```

Running `mongodb-version-list` outputs a JSON array of all available versions of MongoDB:

```json
["3.1.6","3.1.5","3.1.4","3.1.3","3.1.2","3.1.1","3.1.0","3.0.5-rc1","3.0.5-rc0","3.0.4","3.0.4-rc0","3.0.3","3.0.3-rc2","3.0.3-rc1","3.0.3-rc0","3.0.2","3.0.2-rc0","3.0.1","3.0.1-rc0","3.0.0","3.0.0-rc9","3.0.0-rc8","3.0.0-rc7","3.0.0-rc6","3.0.0-rc11","3.0.0-rc10","2.8.0-rc5","2.8.0-rc4","2.8.0-rc3","2.8.0-rc2","2.8.0-rc1","2.8.0-rc0","2.7.8","2.7.7","2.7.6","2.7.5","2.7.4","2.7.3","2.7.2","2.7.1","2.7.0","2.6.10","2.6.10-rc0","2.6.9","2.6.9-rc0","2.6.8","2.6.8-rc0","2.6.7","2.6.7-rc0","2.6.6","2.6.6-rc0","2.6.5","2.6.5-rc4","2.6.5-rc3","2.6.5-rc2","2.6.5-rc1","2.6.5-rc0","2.6.4","2.6.4-rc1","2.6.3","2.6.2","2.6.2-rc1","2.6.2-rc0","2.6.1","2.6.1-rc1","2.6.1-rc0","2.6.0","2.6.0-rc3","2.6.0-rc2","2.6.0-rc1","2.6.0-rc0","2.5.5","2.5.4","2.5.3","2.5.2","2.5.1","2.5.0","2.4.14","2.4.14-rc0","2.4.13","2.4.13-rc0","2.4.12","2.4.12-rc0","2.4.11","2.4.11-rc0","2.4.10","2.4.10-rc0","2.4.9","2.4.9-rc0","2.4.8","2.4.7","2.4.7-rc0","2.4.6","2.4.6-rc1","2.4.6-rc0","2.4.5","2.4.5-rc0","2.4.4","2.4.4-rc0","2.4.3","2.4.3-rc0","2.4.2","2.4.2-rc0","2.4.1","2.4.0","2.4.0-rc3","2.4.0-rc2","2.4.0-rc1","2.4.0-rc0","2.3.2","2.3.1","2.3.0","2.2.7","2.2.7-rc0","2.2.6","2.2.6-rc0","2.2.5","2.2.5-rc0","2.2.4","2.2.4-rc0","2.2.3","2.2.3-rc1","2.2.3-rc0","2.2.2","2.2.2-rc1","2.2.2-rc0","2.2.1","2.2.1-rc1","2.2.1-rc0"]
```

## License

Apache 2.0

[travis_img]: https://secure.travis-ci.org/mongodb-js/mongodb-version-list.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/mongodb-version-list
[npm_img]: https://img.shields.io/npm/v/mongodb-version-list.svg
[npm_url]: https://www.npmjs.org/package/mongodb-version-list
[coverage_img]: https://coveralls.io/repos/mongodb-js/mongodb-version-list/badge.svg?branch=master
[coverage_url]: https://coveralls.io/r/mongodb-js/mongodb-version-list
