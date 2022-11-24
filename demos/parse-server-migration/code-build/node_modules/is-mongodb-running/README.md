# is-mongodb-running [![travis][travis_img]][travis_url] [![npm][npm_img]][npm_url]

> Is MongoDB running?  What port is it using?

## Install

```bash
npm install -g is-mongodb-running;
```

## Example

```bash
is-mongodb-running;
>>> ✔  Yep! 1 MongoDB instance(s) running:
>>>   1. port 27017 with pid 22873
kill 22873;
is-mongodb-running;
>>> ☹ No MongoDB instances running
```

You also might enjoy [`kill-mongodb`](http://npm.im/kill-mongodb).

## Usage

```text
Usage: is-mongodb-running [--port=<n> --pid=<pid>]

Is MongoDB running?  What port is it using?

Usage:
  is-mongodb-running

  # I know the port but I don't know the pid...
  is-mongodb-running --port=27017

  # I know the pid but I don't know the port...
  is-mongodb-running --pid=987


Options:
  --port=<n>     Port you think MongoDB is running on.
  --pid=<pid>    Pid you think MongoDB is running on.
  --json         Ouput results as json [Default: `false`].
  --debug        Enable debug messages.
  -h --help      Show this screen.
  --version      Show version.
```

## Usage

```javascript
require('is-mongodb-running')(function(err, res){
  if(err) return console.error(err);
  console.log(res);
  // >>> [{pid: <12345>, port: 27017}]
});
```

or, with promises:

```javascript
require('is-mongodb-running/promise').then(function(res) {
  console.log(res);
  // >>> [{pid: <12345>, port: 27017}]
}).catch(function(err){
  return console.error(err);
});
```

## License

Apache 2

[travis_img]: https://img.shields.io/travis/mongodb-js/is-mongodb-running.svg
[travis_url]: https://travis-ci.org/mongodb-js/is-mongodb-running
[npm_img]: https://img.shields.io/npm/v/is-mongodb-running.svg
[npm_url]: https://npmjs.org/package/is-mongodb-running
