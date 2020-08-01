const express = require('express');
const createError = require('http-errors');

const app = express();
app.use(express.static('../client/dist'))

// production setup
// const isProduction = app.get("env") === "production";

// if (isProduction) {
//   app.set("trust proxy", 1);
// }

// app.disable("x-powered-by");


// app.get('/', (req, res) => res.send("Hello World!"));

// error handler
app.use(function (err, req, res, next) {
  const error = err.status
  ? err
  : createError(500, 'Something went wrong!');
  
  res.status(error.status).json(error);
})

app.set("port", process.env.PORT || 3000);
module.exports = app;