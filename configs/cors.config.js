const cors = require("cors");

module.exports = (app) => {
  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "http://feeling-crypto.herokuapp.com",
        "https://feeling-crypto.herokuapp.com",
      ],
    })
  );
};
