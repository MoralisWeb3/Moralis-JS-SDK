# mongodb-runner [![][npm_img]][npm_url] [![][travis_img]][travis_url] [![][appveyor_img]][appveyor_url]

> Easily install and run MongoDB to test your code against it.

## Table of Contents

- [Introduction](#introduction)
- [How to play with MongoDB](#how-to-play-with-mongodb)
- [Debugging](#debugging)
- [Configuration](#configuration)
- [CLI Usage](#cli)
- [TravisCI Integration](#travisci)
- [Mocha Integration](#mocha)


## Introduction

This is a tool I wrote for a node app using MongoDB that I was working on. I wanted other contributors to have the database, MongoDB, just work without any extra steps once they cloned the repo and installed app dependencies.  

Then I wanted to be able to test using different versions and configurations of mongo. This tool allowed me to test new releases and configurations of mongo before changing anything in our app servers on AWS.

:warning: For experiments only: Please do not use this tool in production or for anything that considers data storage to be 100% emphemeral. 

## How to play with MongoDB

```javascript
npm install -g mongodb-runner;
mongodb-runner start; # downloads mongodb and starts locally
mongo; # Shell opens connected to mongodb://localhost:27017
```

## Debugging

`mongodb-runner` uses the [`debug`](https://npm.im/debug) module so if something isn't working correctly, set the `DEBUG` environment variable to `DEBUG=mongodb-*` for lots of helpful messages.

## Configuration

### version

The latest stable version of MongoDB will automatically be downloaded and installed by default when `start` is run. 
<!-- TODO: lucas: Merge version-manager info on stable|unstable|semver. --> 

[Default: `stable`]

### port

The port MongoDB will be accessible locally on. 

[Default: `27017`]

### dbpath

The base path for data storage. [Default: `~/.mongodb/data/standalone`]

### logpath

The base directory for data to be stored. [Default: `~/.mongodb/logs/standalone.log`]

### topology

One of standalone, replicaset, or cluster [Default: `standalone`].

### replicaset options

> only applicable when [`topology`](#topology) is `replicaset`

#### arbiters

The number of arbiter processes to start [Default: `0`].

#### passives

The number of passive processes to start [Default: `1`].

#### secondaries

How many secondary instances to start [Default: `2`].

### cluster options 

> only applicable when [`topology`](#topology) is `cluster`

#### shards

Number of shards in the cluster [Default: `2`].

#### routers

Number of router processes to start [Default: `2`].

#### configs

Number of config server processes to start [Default: `1`].

#### routerPort

Port number to start incrementing from when starting routers [Default `50000`].

#### shardPort

Port number to start incrementing from when starting shard members [Default `31000`].

#### configPort

Port number to start incrementing from when starting config servers [Default `35000`].

### Using Environment Variables

| Option | Environment Variable |
| :--- | :--- |
|[`version`](#version) | MONGODB_VERSION         |
|[`port`](#port) | MONGODB_PORT         |
|[`topology`](#topology) | MONGODB_TOPOLOGY     |
|[`arbiters`](#arbiters) | MONGODB_ARBITERS     |
|[`secondaries`](#secondaries) | MONGODB_SECONDARIES  |
|[`passives`](#passives) | MONGODB_PASSIVES     |
|[`shards`](#shards) | MONGODB_SHARDS       |
|[`routers`](#routers) | MONGODB_ROUTERS      |
|[`configs`](#configs) | MONGODB_CONFIGS      |
|[`shards_port`](#shards_port) | MONGODB_SHARDS_PORT  |
|[`configs_port`](#configs_port) | MONGODB_CONFIGS_PORT |
|[`arbiters`](#arbiters) | MONGODB_ARBITERS     |
|[`secondaries`](#secondaries) | MONGODB_SECONDARIES  |
|[`passives`](#passives) | MONGODB_PASSIVES     |

## CLI

```
Usage: mongodb-runner <start|stop> [options]

Start/stop mongodb for testing.

Options:
  --topology=<topology>         One of standalone, replicaset, or cluster [Default: `standalone`].
  --pidpath=<pidpath>           Where to put pid files [Default: `~/.mongodb/pids`].
  --bin=<path>                  Path to mongod|mongos binary [Default: `which mongod|mongos`].

Options depending on `--topology`:
  --topology=standalone
    --name=<name>                 The replSet name [Default: `my-standalone`].
    --port=<port>                 Port to start mongod on [Default: `27017`].
    --dbpath=<dbpath>             Where to put the data [Default: `~/.mongodb/data/[standalone]`]
    --logpath=<logpath>           [Default: `~/.mongodb/#{name}.log`]

  --topology=replicaset
    --name=<name>                 The replSet name [Default: `my-replicaset`].
    --port=<port>                 The starting port to use for mongod instances [Default: `31000`].
    --dbpath=<dbpath>             [Default: `~/.mongodb/data/#{name}-#{instance_id}`]
    --logpath=<logpath>           [Default: `~/.mongodb/#{name}.log/#{instance_id}.log`]
    --arbiters=<n>                How many arbiters to start [Default: `0`].
    --passives=<n>                How many passive instances to start [Default: `1`].
    --secondaries=<n>             How many secondary instances to start [Default: `2`]. Maps to `secondaries` option.

  --topology=cluster
    --shards=<n>                  Number of shards in the cluster [Default: `2`].
    --routers=<n>                 Number of router instances [Default: `2`].
    --configs=<n>                 Number of config servers [Default: `1`].
    --routerPort=<port>           Port number to start incrementing from when starting routers [Default `50000`].
    --port=<port>                 Port number to start incrementing from when starting shard members [Default `31000`].
    --configPort=<port>           Port number to start incrementing from when starting shard members [Default `35000`].

Environment Variables:
  MONGODB_VERSION      What version of MongoDB should be installed and available [Default: `stable`]
  MONGODB_TOPOLOGY     See `--topology`
  MONGODB_PORT         See `--port`
  MONGODB_TOPOLOGY     See `topology`
  MONGODB_ARBITERS     See `arbiters`
  MONGODB_SECONDARIES  See `secondaries`
  MONGODB_PASSIVES     See `passives`
  MONGODB_SHARDS       See `--shards`
  MONGODB_ROUTERS      See `--routers`
  MONGODB_CONFIGS      See `--configs`
  MONGODB_SHARDS_PORT  See `--shardPort`
  MONGODB_CONFIGS_PORT See `--configPort`
  MONGODB_ARBITERS     See `--arbiters`
  MONGODB_SECONDARIES  See `--secondaries`
  MONGODB_PASSIVES     See `--passives`
```

## TravisCI

Modify your `package.json` to start and stop MongoDB before and after your tests
automatically when you run `npm test`:

```json
{
  "scripts": {
    "pretest": "mongodb-runner start",
    "test": "mocha",
    "posttest": "mongodb-runner stop"
  }
}
```

Update your `.travis.yml` to run your tests against the full version + topology matrix:

```yaml
language: node_js
cache:
  directories:
    - node_modules
env:
  - MONGODB_VERSION=^3.6.0 MONGODB_TOPOLOGY=standalone
  - MONGODB_VERSION=stable MONGODB_TOPOLOGY=standalone
  - MONGODB_VERSION=unstable MONGODB_TOPOLOGY=standalone
  - MONGODB_VERSION=^3.6.0 MONGODB_TOPOLOGY=replicaset
  - MONGODB_VERSION=stable MONGODB_TOPOLOGY=replicaset
  - MONGODB_VERSION=unstable MONGODB_TOPOLOGY=replicaset
  - MONGODB_VERSION=^3.6.0 MONGODB_TOPOLOGY=cluster
  - MONGODB_VERSION=stable MONGODB_TOPOLOGY=cluster
  - MONGODB_VERSION=unstable MONGODB_TOPOLOGY=cluster
```

And :tada: Now you're fully covered for all of those all of those edge cases the full
version + topology matrix can present!

### Mocha

Mocha before/after hooks make writing tests for code that depends on MongoDB insanely simple:

```javascript
describe('my app', function() {
  before(require('mongodb-runner/mocha/before'));
  after(require('mongodb-runner/mocha/after'));
  it('should connect', function(done) {
    require('mongodb').connect('mongodb://localhost:27017/', done);
  });
});
```

Global hooks are also supported. Add the following to a new file called `test/mongodb.js`:

```javascript
before(require('mongodb-runner/mocha/before'));
after(require('mongodb-runner/mocha/after'));
```

And then just require it:

```
mocha --require test/mongodb.js test/*.test.js
```

## License

Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/runner.svg?style=flat-square
[travis_url]: https://travis-ci.org/mongodb-js/runner
[npm_img]: https://img.shields.io/npm/v/mongodb-runner.svg
[npm_url]: https://www.npmjs.org/package/mongodb-runner
[appveyor_img]: https://ci.appveyor.com/api/projects/status/w3guhkp628hwwpjg?svg=true
[appveyor_url]: https://ci.appveyor.com/project/imlucas/runner
