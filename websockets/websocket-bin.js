const websocketServer = require('websocket').server;
const Binance = require('node-binance-api')
const binance = new Binance().options({
    APIKEY: process.env.BIN_API_KEY,
    APISECRET: process.env.BIN_API_SECRET

})

module.exports = (server) => {
    const wsServer = new websocketServer({
        httpServer: server
    })
    //request.origin url front
    wsServer.on(('request'), (request => {
        console.log((new Date()) + 'Received a new connection from origin' + request.origin + '.')
        const connection = request.accept(null, request.origin)

        connection.on ('message', () => {
            console.log('start connection')
            binance.websockets.chart("BNBBTC", "1m", (symbol, interval, chart) => {
                let tick = binance.last(chart);
                const last = chart[tick].close;
                // console.info(chart);
                // Optionally convert 'chart' object to array:
                // let ohlc = binance.ohlc(chart);
                // console.info(symbol, ohlc);
                console.info(symbol+" last price: "+last)
                  connection.sendUTF(JSON.stringify(chart))
          
                console.log('sent Message to: ', connection);
        })
    })
    }))
}