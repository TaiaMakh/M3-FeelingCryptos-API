const express = require("express");
const router = express.Router();
const client = require("../configs/twitter.config");
const Tweet = require("../models/Tweet.model");
const params = require("../public/javascripts/twitter");

router.post("/recentTweets", async (req, res, next) => {
	const { data } = await client.get("tweets/search/recent", req.body);
	console.log(req.body);
	return res.status(200).json(data);
});

router.get("/streamTweets", async (req, res, next) => {
	const { data } = await client.get("tweets/search/recent", params);
    
	Tweet.create(data)
		.then((tweet) => {
			res.status(200).json(tweet);
		})
		.catch((err) => console.error(err));
});

module.exports = router;
