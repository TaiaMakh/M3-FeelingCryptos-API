const express = require("express");
const router = express.Router();
const client = require('../configs/twitter.config');

router.post("/recentTweets", async (req, res, next) => {
    const {data} = await client.get('tweets/search/recent', req.body);
    return res.status(200).json(data);
});

module.exports = router;
