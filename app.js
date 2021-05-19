
require('dotenv').config();
const express = require('express');

// DB config
require('./configs/db.config');

const app = express();

// Middleware config
require('./configs/middleware.config')(app);
require('./configs/cors.config')(app);

// Session config + Passport
require('./configs/session.config')(app);
require('./configs/passport.config')(app);

// Twitter config
require('./configs/twitter.config');

const authRouter = require('./routes/auth.routes');
const twitterRouter = require('./routes/twitter.routes');
const privateRoutes = require('./routes/private.routes');
app.use('/api/auth', authRouter);
app.use('/api/twitter', twitterRouter);
app.use('/api/private', privateRoutes);

// ROUTE FOR SERVING REACT APP (index.html)
app.use((req, res, next) => {
  // If no previous routes match the request, send back the React app.
  res.sendFile(__dirname + "/public/index.html");
});


//  Catch 404 and respond with error message
app.use((req, res, next) => {
  return res.status(404).json({ message: "Not found"});
})

module.exports = app;