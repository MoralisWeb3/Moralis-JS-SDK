#!/usr/bin/env node

var downcache = require("../index"),
	rimraf = require("rimraf");

downcache.set({
	log: "verbose",
	limit: 2000
});

// remove old cache from previous tests
rimraf("./cache", function(err) {
	// see what happens when we get a status code other than 200
	downcache("http://api.meetup.com/2/members?group_id=741891&key=dsafsadfsadfasf", function(err, resp, html) {
		console.log(err);
	});

	downcache("http://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=Jimmy%20Rollins&rvprop=content&format=json", function(err, resp, html) {
		//console.log(resp);
		//console.log(Object.keys(resp.response));
		console.log(resp.type, resp.sub_type);
	});

	downcache("http://www.imdb.com/title/tt0068646/", function(err, resp, html) {
		console.log("Downloaded", html.length, "characters from", resp.url);

		downcache("http://www.imdb.com/title/tt0068646/fullcredits", function(err, resp, html) {
			console.log("Downloaded", html.length, "characters from", resp.url);
		});
	});

	downcache("http://time.com/27821/us-college-rankings/", {
		path: "great-articles/rankings.html",
		log: "verbose" // will override just for this call
	}, function(err, resp, html) {
		if (resp.socket) {
			console.log(resp.socket.bytesRead);
		}
		
		// try again, see it load from cache
		downcache("http://time.com/27821/us-college-rankings/", {
			path: "great-articles/rankings.html",
			log: "verbose"
		}, function(err, resp, html) {
			//console.log(resp);
		});	
	});

	// testing POST 
	downcache("https://statements.mevaker.gov.il/Handler/GuarantyDonationPublisherHandler.ashx", {
		post: {
			action: "gcbp",
			p: 3
		}
	}, function(err, resp, html) {
		//console.log(resp);
	});
	/*
	// still working on this
	downcache("http://mlb.mlb.com/images/players/mugshot/ph_424324.jpg", function(err, resp, body) {
		console.log(resp.type, resp.sub_type);
	});
	*/
});
