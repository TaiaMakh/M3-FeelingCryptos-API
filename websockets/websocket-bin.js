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
        console.log((new Date()) + 'Received a new connection from origin ' + process.env.PUBLIC_DOMAIN + '.')
        const connection = request.accept(null, process.env.PUBLIC_DOMAIN)

        connection.on ('message', (data) => {
            console.log('start connection', data)

            binance.websockets.chart(data.utf8Data === 'undefined' ? "BTCUSDT":`${data.utf8Data}`, "1h", (symbol, interval, chart) => {
                let tick = binance.last(chart);
                const last = chart[tick].close;
                const chartArr = Object.entries(chart).slice(400, 500)
                // let ohlc = binance.ohlc(chart);
                // console.info(symbol, ohlc);
                console.info(chartArr.length)
                console.info(symbol+" last price: "+last)
                connection.sendUTF(JSON.stringify(chartArr))        
                //console.log('sent Message to: ', connection);
        })
    })
    }))
}