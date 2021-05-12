const mongoose = require('mongoose');

mongoose.connect(`${process.env.DBURL}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to Mongo!'))
.catch((error) => console.error(error))

module.exports = mongoose;