# mongodb-version-manager [![travis][travis_img]][travis_url] [![npm][npm_img]][npm_url] [![appveyor][appveyor_img]][appveyor_url]

> Install and manage multiple versions of MongoDB.

## Install

```sh
npm install -g mongodb-version-manager
```

## Usage

```sh
$ m
Usage:
  m use <version> [--branch=<branch> --distro=<distro> --enterprise]
  m url <version> [--branch=<branch> --distro=<distro> --enterprise]
  m available [--stable --unstable --rc --pokemon]
  m path
```

Once you've installed your first version of mongo with the `m use` command, update your `~/.bashrc` file:

```sh
export PATH=~/.mongodb/versions/mongodb-current/bin:$PATH
```

When installed globally, each version of MongoDB you've installed are stored under `~/.mongodb/versions`:

```
├── mongodb-3.0.7-osx-64
├── mongodb-3.2.0-osx-64
├── mongodb-3.3.8-osx-64-enterprise
├── mongodb-3.4.0-rc2-osx-64
├── mongodb-3.4.4-osx-64
├── mongodb-3.4.5-osx-64-enterprise
├── mongodb-3.5.1-osx-64
├── mongodb-3.6.3-osx-64
├── mongodb-3.6.4-osx-64
├── mongodb-3.7.3-osx-64
└── mongodb-current -> ~/.mongodb/versions/mongodb-3.6.4-osx-64
```

The contents of each directory under `~/.mongodb/versions/mongodb-*` are:

```
├── GNU-AGPL-3.0
├── MPL-2
├── README
├── THIRD-PARTY-NOTICES
└── bin
    ├── bsondump
    ├── install_compass
    ├── mongo
    ├── mongod
    ├── mongodump
    ├── mongoexport
    ├── mongofiles
    ├── mongoimport
    ├── mongoperf
    ├── mongoreplay
    ├── mongorestore
    ├── mongos
    ├── mongostat
    └── mongotop
```

## Related

* [`mongodb-runner`](https://github.com/mongodb-js/runner) Easily control MongoDB for testing.

## License

Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/version-manager.svg
[travis_url]: https://secure.travis-ci.org/mongodb-js/version-manager
[appveyor_img]: https://ci.appveyor.com/api/projects/status/s3xm8f9eqiakqusn?svg=true
[appveyor_url]: https://ci.appveyor.com/project/imlucas/mongodb-version-manager
[npm_img]: https://img.shields.io/npm/v/mongodb-version-manager.svg
[npm_url]: https://npmjs.org/package/mongodb-version-manager
