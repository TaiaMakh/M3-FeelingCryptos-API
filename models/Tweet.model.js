const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
	id: { type: String },
	text: { type: String },
	lang: { type: String },
	public_metrics: { type: Object },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 120
      },
});

const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;
