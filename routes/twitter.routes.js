const express = require("express");
const router = express.Router();
const client = require('../configs/twitter.config');

var params = {
	"query": "#doge",
    "max_results": 10,
    "tweet.fields": ["public_metrics","author_id"],
};

router.get("/tweets", async (req, res, next) => {
    //const { data } = await client.get('tweets', { ids: '1228393702244134912' });
    const {data} = await client.get('tweets/search/recent', params);
    return res.status(200).json(data);
});

module.exports = router;
