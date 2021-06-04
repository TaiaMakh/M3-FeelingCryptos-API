const markets = require("../../markets.json");

let params = {
    max_results: 100,
    "tweet.fields": "public_metrics,lang",
    query: `${getQueryCrypto()} is:verified -is:retweet`,
};

function getQueryCrypto() {
    let queryCrypto = "(";
    let uniqueCryptos = [];
	markets.forEach((el) => {
        if(!uniqueCryptos.includes(el.name)) uniqueCryptos.push(el.name);      
    })
    uniqueCryptos.forEach((el) => {
        el = el.toLowerCase();
        queryCrypto += `#${el} OR `;
    })
	return queryCrypto.slice(0, -4) + ")";
}


module.exports = params;