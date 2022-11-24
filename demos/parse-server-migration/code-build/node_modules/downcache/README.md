downcache
=========
Version 0.0.9
[![Build Status](https://travis-ci.org/wilson428/downcache.png)](https://travis-ci.org/wilson428/downcache)
[![Dependency Status](https://david-dm.org/wilson428/downcache.svg)](https://david-dm.org/wilson428/downcache)
[![devDependencies](https://david-dm.org/wilson428/downcache/dev-status.svg)](https://david-dm.org/wilson428/downcache#info=devDependencies)

Downcache is a Node.js module for downloading and caching webpages for fast future retrieval. It is modeled on the [download function](https://github.com/unitedstates/congress/blob/master/tasks/utils.py) we use at the [UnitedStates](https://github.com/unitedstates) project.

Any sort of scraping project often ends up hitting pages far more often than is reasonably necessary. This module functions like @mikeal's [request](https://github.com/mikeal/request) -- in fact, it uses it as a dependency -- but stores a copy of the HTML on your local machine. The next time you make a request to that page using downcache, it checks for that local copy before making another call to the live page.

#Installation

`npm install downcache`

#Usage

	var downcache = require("downcache");

	downcache("http://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=Jimmy%20Rollins&rvprop=content&format=json", function(err, resp, body) {
		// do something with the HTML body response
	});

If you request this page sometime later, you will see that the response returns MUCH faster. That's because the response is loading from your hard drive, not the Internet.

#Callbacks

The only required input to `downcache` is a url. Most of the time, you'll want to pass a callback function as well. This receives three variables: An error (hopefully null), a response object that is either the response provided by `request` or an object indicating that the page was loaded from cache, and the body of the page requested. Do with them what you will (or not).

	downcache("http://time.com/7612/americas-mood-map-an-interactive-guide-to-the-united-states-of-attitude/", function(err, resp, body) {
		if (err) throw err;
		if (resp.socket) {
			console.log(resp.socket.bytesRead);
		} else {
			console.log(resp);
		}
	});

Any error from the request, file retrieval or file writing is elevated to the callback.

#Caching

By default, this module creates a `cache` directory in the current directory. The path to the cached file is created from the url so that the local file structure resembles the website being crawled. 

#Options

There are a variety of options for you to specify and two ways to specify them.

| option | default | description |
| -------| ------- | ----------- |
| dir    | './cache' | The directory where pages will be cached. Will be created if not present. | 
| path   | url      | The file path to write the url response to inside the cache directory. Default is the url itself as a file structure. |
| force  | false   | If true, don't bother looking for the file in cache and call it live. |
| nocache | false  | Don't write the response to cache. Then question why you are using this module. |
| json   | false | Run `JSON.parse` on the response. |
| log    | 'warn' | Log level for module, using [npmlog](https://www.npmjs.com/package/npmlog) values: `verbose`, `info`, `warn`, `error`. |
| limit  | 100  | How long to wait in milliseconds between each http call. |
| noindex | false | Don't tack on an `/index.html` to the cache path where appropriate |
| post   | null | an object to send as POST parameters. |

To specify options for a _single URL call_, you can pass a third argument to `downcache` between the url and the callback, like so:

	downcache("http://example.com/article.html", { 
		dir: '/Users/jsmith/Desktop/cache/', 
		log: 'verbose'
	}, function(err, resp, body) {
		//callback
	});

But if you want to store the cache somewhere else, like in the above example, it would be a hassle to specify this every time. So you can also set pseudo-global options that apply to all future `downcache` calls using the `set` method:

	downcache.set("dir", "/Users/jsmith/Desktop/cache/");
	// or 
	downcache.set({
		log: "info",
		json: true
	});

If you specify these universal options, you can still override them with options passed to the main `downcache()` function call, but doing so with not overwrite the options specified by `.set()` for future calls.

#Note on downcache and wget

The default behavior for "path" is similar to the structure created by `wget`, in which the directory structure of the website is replicated on disk. At some future point, I may make this identical so that one can "precache" a site by mirroring it and then use this module to make requests to it, falling back on the live site.

The most common case for specifying your own path is if the site that you're requesting attaches session keys to the links in the source code, as many government database search results have the awful habit of doing. If you don't specify a path without these keys, they will fool the module into requesting a new URL each time.

Downcache will also append `/index.html` to URLs that end without an extensions. For example, the IMDB page for "The Godfather" resolves thus:

	http://www.imdb.com/title/tt0068646 -> http://www.imdb.com/title/tt0068646/index.html

The reason is so that, when you later make a call to `http://www.imdb.com/title/tt0068646/fullcredits`, `tt0068646` is a directory instead of a file in the cache system. Otherwise, the caching won't work. You can override this behavior by setting `noindex` to true in the options.

#Rate limiting
If you invoke this module many times in a row, there is built-in rate limiting to prevent bad behavior. The default is not more than one call per 100 milliseconds, which you can adjust with the `limit` option. (Feel free to call `downcache()` as you would normally, and the rate limiter will store the calls until their turn comes up.) I recommend you set the rate limiting interval using `.set()` at the beginning of the program and leave it at that value for the duration of the execution. Changing it midstream should not cause an interruption, but it can create some confusing race conditions.

#To Do
	-Allow for optional "should I cache?" logic so as to ignore certain types of responses you don't want (say, those that are under 1KB, indicating an error)
	-Allow for cache expiration
	-Return a better response when called from cache

#Changes

**v0.0.9**
Updated dependencies and added badges 

**v0.0.8**
Support gzip requests. [Thx, @LynxyssCZ](https://github.com/wilson428/downcache/issues/1)!

**v0.0.7**
Support POST requests

**v0.0.6a**
Cleaned up tests and fixed the damn markdown list.

**v0.0.6**
Rate limiting implemented. Can now set "global" options for all downcache calls in a session.

**v0.0.5b**
Try out rate limiting 

**v0.0.5a**
Does not cache responses that have a status code other than 200.

**v0.0.4**
Checks to see if cached version is empty, and calls live if so.

**v0.0.3**
+Changed order of arguments passed to callback from `(err, body, resp)` to `(err, resp, body)` to match the [request module](https://github.com/mikeal/request).

#Compatibility

Downcache is [tested](https://travis-ci.org/wilson428/downcache) on Node v0.10 and v0.11. It breaks on v0.8 due to a [problem with an npmlog dependency](https://travis-ci.org/wilson428/downcache).

#License
[MIT](/LICENSE.md)