var request = require('request'),
	fs = require('graceful-fs'),
	path = require('path'),
	urlparse = require('url'),
	mkdirp = require('mkdirp'),
	log = require('npmlog'),
	extend = require("extend"),
	querystring = require("querystring");

var RateLimiter = require('limiter').RateLimiter;

/* OPTIONS */
/*
dir: directory where cache will be stored
path: path where cache is stored
force: Ignore presence of cache and call live
nocache: Don't cache the raw response. Then question why you are using this module.
*/

//log.level = "verbose";

// initial options, which we can overwrite any time
var global_options = {
	dir: "./cache",
	limit: 1000,
	log: "warn"	
}

var limiter = new RateLimiter(1, global_options.limit);

// downcache({ url: "http://whatever.com" })
// downcache("http://whatever.com", { opts: values }, function(err, resp, body) {} )
// downcache("http://whatever.com", function(err, resp, body) {} )

module.exports = function(url, my_opts, callback) {
	if (arguments.length === 2 && typeof my_opts === "function") {
		callback = my_opts;
	}

	var opts = extend(false, {}, global_options, my_opts || {});

	log.level = opts.log;

	if (!callback) {
		log.info("FYI, no callback provided to downcache.");
		callback = function() {};
	}

	log.verbose("directory for cache is", opts.dir);

	opts.url = url;

	// you can provide your own path for the cached file if you like
	// otherwise we will recreate the URL's path after the \.[a-z]+
	if (!opts.path) {
		opts.path = url_to_path(opts.url, opts);
	}

	opts.path = path.join(opts.dir, opts.path);

	log.verbose("The cache path for " + url + " is " + opts.path);

	retrieve(opts, callback);
}

var url_to_path = module.exports.url_to_path = function(url, opts) {
	var p = path.join(urlparse.parse(url).hostname, urlparse.parse(url).path);
	// exorcise any trailing "/"
	p = path.join(path.dirname(p), path.basename(p));

	if (!opts.noindex && path.extname(p) === "" && !urlparse.parse(url).query) {
		log.verbose("Resolving", p, "to", p + "/index.html.");
		p += "/index.html";
	} else if (opts.noindex) {
		log.verbose("Not resolving", p, "to", p + "/index.html since you told me not to.");		
	} else {
		//log.verbose("Not resolving", p, "to", p + "/index.html since you told me not to.");				
	}

	if (opts.post) {
		p += "?" + querystring.stringify(opts.post);
	}
	return p;
};

// check if the file is in cache
var retrieve = module.exports.retrieve = function(opts, callback) {
	if (opts.force) {
		download(opts, callback);
		return;
	}

	// look for the file in cache. Otherwise call live.
	fs.readFile(opts.path, { encoding: "utf-8" }, function(err, body) {
		if (err) {
			log.verbose("Couldn't find " + opts.url + " in cache. (Looked for it at " + opts.path + ".) Calling live.");
			download(opts, callback);
		} else if (body.length === 0) {
			log.verbose("Found an empty file in the cache for " + opts.url + ". Calling live.");
			download(opts, callback);
		} else {
			log.verbose("loaded " + opts.url + " from cache at " + opts.path);

			// we want to return an object as similar as possible to that which would have be retrieved live
			toCallback(opts, { status: "retrieved from cache", path: opts.path, url: opts.url }, body, callback);
		}
	});
};

var download = module.exports.download = function(opts, callback) {
	limiter.removeTokens(1, function(err, remainingRequests) {
		if (err) {
			log.warn("rate limited " + opts.url);
			return callback("rate limited");
		}
		downloadDirect(opts,callback);
	});
}

var downloadDirect = module.exports.downloadDirect = function(opts, callback) {
	function request_response(err, resp, body) {
		if (err) {
			log.error("Error retrieving", opts.url, ":", err);
			log.error(err, resp, body);
			return callback(err, null, null);
		};

		// make sure it's a valid response
		if (resp.statusCode != 200) {
			log.info("Did not cache", opts.url, "because response code was", resp.statusCode);
			return callback("Bad response code", resp, body);
		}

		// we may want to change behavior based on the content type
		var content_type = resp.headers['content-type'].toLowerCase().split("; ")[0],
			type = content_type.split("/")[0],
			sub_type = content_type.split("/")[1];

		/*
		// not ready for this

		if (typeof opts.json === "undefined" && sub_type === "json") {
			log.verbose("Guessing that " + opts.url + " is a JSON document based on HTTP response. Override with { json: false }");
			opts.json = true;
		}

		if (typeof opts.image === "undefined" && type === "image") {
			log.verbose("Guessing that " + opts.url + " is an image based on HTTP response. Override with { image: false }")
			opts.image = true;
		}
		*/

		var response = {
			response: resp,
			url: opts.url,
			type: type,
			sub_type: sub_type
		}

		// store in local cache
		mkdirp(path.dirname(opts.path), function (err) {
		    if (err) {
		    	response.status = "error";
		    	log.warn("Downcache wasn't able to make a directory at", opts.path + ". This is probably because there's a file in the way. Try clearing the cache and setting 'index' to true in the downcache options.");
		    	return callback(err, response, body);
		    }

			fs.writeFile(opts.path, body, function(err) {
				if (err) {
			    	response.status = "error";
			    	return callback(err, response, body);
				}
				log.verbose("Cached " + opts.url + " at " + opts.path);
		    	response.status = "retrieved live and cached";
		    	response.path = opts.path;
				toCallback(opts, response, body, callback);
			});

		    /*
			if (opts.image) {
				var ws = fs.createWriteStream(opts.path);
				ws.on('finish', function() {
					console.log('image done');
					console.log(resp.socket.bytesRead);
					//ws.end();
				});
				//ws.write(new Buffer(body));
				ws.write(body);
				ws.end();

				console.log(Object.keys(resp));
				fs.writeFile(opts.path, body, "binary", function(err) {
					console.log("done");
				});
				/*

				//http://stackoverflow.com/a/20490629/1779735
				fs.writeFile(opts.path, body, 'binary', function(err) {
					if (err) {
				    	response.status = "error";
				    	return callback(err, response, body);
					}
					log.verbose("Cached image at " + opts.path);
			    	response.status = "retrieved image live and cached";
			    	response.path = opts.path;
					toCallback(opts, response, body, callback);
				}); 
			} else {
			*/
		});
	}

	if (opts.post) {
		log.info("POST");
		request.post({
			url: opts.url,
			form: opts.post,
			gzip: opts.gzip || false
		}, request_response);
	} else {
		request.get({
			url: opts.url,
			gzip: opts.gzip || false
		}, request_response);
	}
};

var download_image = function(uri, filename, callback){
	limiter.removeTokens(1, function() {
		request.head(uri, function(err, res, body){
	    	if (parseInt(res.headers['content-length'], 10) < 10) {
		    	log.error("Encountered too few bytes when attempting to download ", uri);
		    	callback(null);
	    	} else {
			    request({
			    	uri: uri,
			    	gzip: true
			    }).pipe(fs.createWriteStream(filename)).on('close', callback);
	    	}
	  });
	});
};

var toCallback = function(opts, resp, body, callback) {
	if (opts.json) {
		try {
			body = JSON.parse(body);
		} catch(e) {
			log.error("Couldn't parse response as JSON. Returning as string");
			callback(e, resp, body);
			return;
		}
	}
	callback(null, resp, body);
}

// update the global settings that get used in absense of a specification in the individual call
module.exports.set = function(property, value) {
	if (typeof property == "string" && typeof value == "string") {
		global_options[property] = value;
	} else if (typeof property == "object") {
		extend(false, global_options, property);
	}
	if (property == "limit" || property.limit) {
		limiter = new RateLimiter(1, global_options.limit);
	}
}
