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
        const connection = request.accept(null, request.origin)

        connection.on ('message', (data) => {
            console.log('start connection', data)
            const newData = data.utf8Data.split(',')
            console.log(newData)
             binance.websockets.chart(newData[0] === 'undefined' ? "BTCUSDT": newData[0], newData[1], (symbol, interval, chart) => {
                //console.log(chart)
                if(Object.entries(chart).length) {  
                let tick = binance.last(chart);
                //const last = chart[tick].close;
                const chartArr = Object.entries(chart).slice(400, 500)
                // let ohlc = binance.ohlc(chart);
                // console.info(symbol, ohlc);
                //console.info(chartArr.length)
                //console.info(symbol+" last price: "+last)
                connection.sendUTF(JSON.stringify({chartArr, symbol, interval}))         
                }
            })
        })
    }))
}