## [2017-04-21](https://github.com/neekey/ps/pull/48)
- publish 0.1.6
- use `lx` as default options for `ps` command
- remove debugging console log for `kill()`
- add timeout for `kill()`, default to 30s

## [2017-03-26](https://github.com/neekey/ps/pull/35)
- publish 0.1.5
- Add parent process ID support for windows
- use `spawn` to replace `exec` for Linux/Unix system
- add appVeyor integration
- use Travis for npm publishing
- refactor the implementation of `kill()`, now just a wrapper of built-in `process.kill()`

## 2016-06-23
- Publish 0.1.2
- change `command` and `argument` matching to case insensitive.

## 2016-05-05
- Publish 0.1.1 update table-parser to 0.1.1
- Integrate with Travis-CI linux / mac is fully tested now
- Manually test on Win10 and Win7

## 2016-04-26
- Publish 0.1.0 update table-parser to 0.1.0

## 2015-09-20

- Publish 0.0.5.
- Merge [#5](https://github.com/neekey/ps/pull/5): Add license type MIT.
- Merge [#6](https://github.com/neekey/ps/pull/6): Allow for stdout to return the data in chunks.
